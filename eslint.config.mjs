import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "react/no-unescaped-entities": "off",
            "@next/next/no-page-custom-font": "off",
            // Relax strict rules that break Vercel builds
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrors: "none",
                },
            ],
            "react-hooks/exhaustive-deps": "warn",
            "@typescript-eslint/no-require-imports": "off",
        },
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            // Ignore local utility/test scripts
            "database/test-db-connection.js",
        ],
    },
];

export default eslintConfig;
