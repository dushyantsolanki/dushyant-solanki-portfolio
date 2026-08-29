import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";

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
         * 12. Save to MongoDB
         * ----------------------------------------
         */

        await connectToDatabase();

        const newContact = new Contact({
            name: cleanName,
            email: cleanEmail,
            projectType,
            budget,
            message: cleanMessage,
            website,
        });

        await newContact.save();

        /*
         * ----------------------------------------
         * 13. Success
         * ----------------------------------------
         */

        console.log(
            "Contact form saved successfully to database:",
            newContact._id
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