"use client";
import React from "react";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/actions/contact.actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        defaultValues: {
            email: "",
            title: "",
            message: "",
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<ContactFormData> = async (
        data: ContactFormData
    ) => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("title", data.title);
            formData.append("message", data.message);
            await sendContactEmail(formData);
            isSubmitting === false;
            // reset the form
            reset();
            toast.success("Message sent successfully");
        } catch (err: unknown) {
            console.log(err);
            toast.error("Message send fail", {
                description:
                    err instanceof Error ? err.message : "Something went wrong",
            });
        }
    };
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Contact</h1>
                <p className="text-sm text-gray-400 mt-2">
                    Send a message to Ludovic Argenty box.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="john@example.com"
                        register={register}
                        error={errors.email}
                        validation={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                            minLength: {
                                value: 3,
                                message:
                                    "Email must be at least 3 characters long",
                            },
                        }}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <InputField
                        name="title"
                        label="Title"
                        placeholder="Title"
                        register={register}
                        error={errors.title}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <InputField
                        name="message"
                        label="Message"
                        placeholder="Message"
                        register={register}
                        error={errors.message}
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <Button type="submit" disabled={isSubmitting} className="green-btn w-full">
                        {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
