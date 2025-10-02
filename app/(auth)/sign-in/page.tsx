"use client";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FooterLink from "@/components/forms/FooterLink";

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<SignUpFormData> = async (
        data: SignUpFormData
    ) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="form-title">Log In Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            message: "Email must be at least 3 characters long",
                        },
                    }}
                    disabled={isSubmitting}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="********"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                        },
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 3 characters long",
                        },
                    }}
                    disabled={isSubmitting}
                />

                <Button
                    type="submit"
                    variant="secondary"
                    className="yellow-btn w-full mt-5"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sign In" : "Start your Investment Journey"}
                </Button>

                <FooterLink
                    text="Don't have an account?"
                    linkText="Sign Up"
                    href="/sign-up"
                />
            </form>
        </>
    );
};

export default SignInPage;
