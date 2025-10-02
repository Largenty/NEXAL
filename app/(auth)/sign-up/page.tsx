"use client";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    INVESTMENT_GOALS,
    PREFERRED_INDUSTRIES,
    RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "",
            investmentGoals: "",
            riskTolerance: "",
            preferredIndustry: "",
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
            <h1 className="form-title">Sign Up & personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: "Full Name is required",
                        minLength: {
                            value: 3,
                            message:
                                "Full Name must be at least 3 characters long",
                        },
                    }}
                    disabled={isSubmitting}
                />
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

                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goals"
                    error={errors.investmentGoals}
                    options={INVESTMENT_GOALS}
                    control={control}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk tolerance"
                    error={errors.riskTolerance}
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your investment goals"
                    error={errors.preferredIndustry}
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    required
                />

                <Button
                    type="submit"
                    variant="secondary"
                    className="yellow-btn w-full mt-5"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Create account"
                        : "Start your Investment Journey"}
                </Button>

                <FooterLink text="Already have an account?" linkText="Sign In" href="/sign-in" />
            </form>
        </>
    );
};

export default SignUpPage;
