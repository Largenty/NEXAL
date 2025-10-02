import React from "react";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const SelectField = ({
    name,
    label,
    placeholder,
    options,
    error,
    control,
    required = false,
}: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: required
                        ? `Please select ${label.toLowerCase()} option`
                        : false,
                }}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                            <SelectContent className="bg-gray-800 border-gray-600 text-white">
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                )}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default SelectField;
