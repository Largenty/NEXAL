import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const InputField = ({
    name,
    label,
    placeholder,
    type = "text",
    register,
    error,
    validation,
    disabled,
    value,
}: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label text-gray-400">
                {label}
            </Label>
            <Input
                {...(register ? register(name, validation) : {})}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn(
                    "form-input text-emerald-100 placeholder:text-gray-500 bg-emerald-950/40 border border-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/70 focus-visible:outline-none backdrop-blur supports-[backdrop-filter]:bg-emerald-950/30",
                    error
                        ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
                        : disabled && "opacity-50 cursor-not-allowed"
                )}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
