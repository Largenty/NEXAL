"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transporter } from "@/lib/nodemailer";

export async function sendContactEmail(formData: FormData) {
    "use server";

    const fromEmail = String(formData.get("email") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!fromEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
        redirect("/contact?status=error&reason=invalid_email");
    }
    if (!title) {
        redirect("/contact?status=error&reason=missing_title");
    }
    if (!message) {
        redirect("/contact?status=error&reason=missing_message");
    }

    try {
        await transporter.sendMail({
            from: `SIGMA Contact <${process.env.NODEMAILER_EMAIL}>`,
            to: "largenty@gmail.com",
            replyTo: fromEmail,
            subject: `[Contact] ${title}`,
            text: message,
            html: `<p style="white-space:pre-wrap;">${message.replace(
                /</g,
                "&lt;"
            )}</p>`,
        });
    } catch (e) {
        redirect("/contact?status=error&reason=send_failed");
    }

    revalidatePath("/contact");
    redirect("/contact?status=success");
}
