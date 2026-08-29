import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_PROJECT_TYPES = [
    "web-design",
    "web-development",
    "ui-ux",
    "branding",
    "other",
];

const ALLOWED_BUDGETS = [
    "5k-10k",
    "10k-25k",
    "25k-50k",
    "50k+",
];

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        /*
         * ----------------------------------------
         * 1. Parse request
         * ----------------------------------------
         */

        const body = await request.json();

        const {
            name,
            email,
            projectType,
            budget,
            message,
            website,
            turnstileToken,
        } = body;

        /*
         * ----------------------------------------
         * 2. Honeypot protection
         * ----------------------------------------
         */

        if (website) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Message received.",
                },
                { status: 200 }
            );
        }

        /*
         * ----------------------------------------
         * 3. Validate required fields
         * ----------------------------------------
         */

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof projectType !== "string" ||
            typeof budget !== "string" ||
            typeof message !== "string"
        ) {
            return NextResponse.json(
                {
                    error: "Invalid request data.",
                },
                { status: 400 }
            );
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanMessage = message.trim();

        /*
         * ----------------------------------------
         * 4. Validate name
         * ----------------------------------------
         */

        if (
            cleanName.length < 2 ||
            cleanName.length > 100
        ) {
            return NextResponse.json(
                {
                    error: "Please enter a valid name.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 5. Validate email
         * ----------------------------------------
         */

        if (
            cleanEmail.length > 254 ||
            !isValidEmail(cleanEmail)
        ) {
            return NextResponse.json(
                {
                    error: "Please enter a valid email address.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 6. Validate project type
         * ----------------------------------------
         */

        if (!ALLOWED_PROJECT_TYPES.includes(projectType)) {
            return NextResponse.json(
                {
                    error: "Invalid project type.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 7. Validate budget
         * ----------------------------------------
         */

        if (!ALLOWED_BUDGETS.includes(budget)) {
            return NextResponse.json(
                {
                    error: "Invalid budget range.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 8. Validate message
         * ----------------------------------------
         */

        if (
            cleanMessage.length < 10 ||
            cleanMessage.length > 5000
        ) {
            return NextResponse.json(
                {
                    error:
                        "Message must be between 10 and 5000 characters.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 9. Validate Turnstile token
         * ----------------------------------------
         */

        if (
            typeof turnstileToken !== "string" ||
            !turnstileToken
        ) {
            return NextResponse.json(
                {
                    error: "CAPTCHA verification is required.",
                },
                { status: 400 }
            );
        }

        /*
         * ----------------------------------------
         * 10. Verify Turnstile with Cloudflare
         * ----------------------------------------
         */

        const turnstileResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secret:
                        process.env.TURNSTILE_SECRET_KEY,
                    response: turnstileToken,

                    // Optional but recommended:
                    // Cloudflare can validate the visitor IP.
                    remoteip:
                        request.headers.get("x-forwarded-for") ||
                        undefined,
                }),
                cache: "no-store",
            }
        );

        if (!turnstileResponse.ok) {
            console.error(
                "Turnstile API request failed:",
                turnstileResponse.status
            );

            return NextResponse.json(
                {
                    error:
                        "CAPTCHA service is temporarily unavailable.",
                },
                { status: 503 }
            );
        }

        const turnstileResult =
            await turnstileResponse.json();

        /*
         * ----------------------------------------
         * 11. Reject invalid CAPTCHA
         * ----------------------------------------
         */

        if (!turnstileResult.success) {
            console.error(
                "Turnstile verification failed:",
                turnstileResult["error-codes"]
            );

            return NextResponse.json(
                {
                    error:
                        "CAPTCHA verification failed. Please try again.",
                },
                { status: 403 }
            );
        }

        /*
         * ----------------------------------------
         * 12. Send email using Resend
         * ----------------------------------------
         */

        const contactEmail =
            process.env.CONTACT_EMAIL;

        if (!contactEmail) {
            console.error(
                "CONTACT_EMAIL is not configured."
            );

            return NextResponse.json(
                {
                    error:
                        "Email service is not configured.",
                },
                { status: 500 }
            );
        }

        const { data, error } =
            await resend.emails.send({
                from:
                    "Portfolio Contact <onboarding@resend.dev>",

                to: [contactEmail],

                replyTo: cleanEmail,

                subject: `New Portfolio Inquiry — ${cleanName}`,

                text: `
New contact form submission

Name:
${cleanName}

Email:
${cleanEmail}

Project Type:
${projectType}

Budget:
${budget}

Message:
${cleanMessage}
        `.trim(),

                html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Portfolio Inquiry</h2>

            <p>
              You received a new message from your portfolio.
            </p>

            <hr />

            <p>
              <strong>Name:</strong><br />
              ${escapeHtml(cleanName)}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${escapeHtml(cleanEmail)}
            </p>

            <p>
              <strong>Project Type:</strong><br />
              ${escapeHtml(projectType)}
            </p>

            <p>
              <strong>Budget:</strong><br />
              ${escapeHtml(budget)}
            </p>

            <p>
              <strong>Message:</strong><br />
              ${escapeHtml(cleanMessage).replace(
                    /\n/g,
                    "<br />"
                )}
            </p>

            <hr />

            <p>
              You can reply directly to this email to
              contact the client.
            </p>
          </div>
        `,
            });

        /*
         * ----------------------------------------
         * 13. Handle Resend error
         * ----------------------------------------
         */

        if (error) {
            console.error(
                "Resend error:",
                error
            );

            return NextResponse.json(
                {
                    error:
                        "Unable to send your message right now.",
                },
                { status: 500 }
            );
        }

        /*
         * ----------------------------------------
         * 14. Success
         * ----------------------------------------
         */

        console.log(
            "Contact email sent successfully:",
            data?.id
        );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Your message has been sent successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Contact API error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}

/*
 * Escape user input before putting it into HTML.
 */
function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}