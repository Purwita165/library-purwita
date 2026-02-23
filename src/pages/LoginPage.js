import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
    const navigate = useNavigate();
    // ======================
    // FORM STATE
    // ======================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // ======================
    // ERROR STATE
    // ======================
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [authError, setAuthError] = useState("");
    // ======================
    // TOUCHED STATE
    // ======================
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    // ======================
    // LOADING STATE
    // ======================
    const [loading, setLoading] = useState(false);
    // ======================
    // VALIDATORS
    // ======================
    const validateEmail = (value) => {
        if (!value)
            return "Email required";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value))
            return "Invalid email";
        return "";
    };
    const validatePassword = (value) => {
        if (!value)
            return "Password required";
        if (value.length < 6)
            return "Password min 6 characters";
        return "";
    };
    // ======================
    // LOGIN HANDLER
    // ======================
    const handleLogin = async () => {
        setAuthError("");
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        setEmailTouched(true);
        setPasswordTouched(true);
        if (emailValidation || passwordValidation) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            // ======================
            // SAVE AUTH DATA
            // ======================
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            // ======================
            // REDIRECT
            // ======================
            navigate("/dashboard");
        }
        catch (err) {
            if (err instanceof Error) {
                setAuthError(err.message);
            }
            else {
                setAuthError("Login failed");
            }
        }
        finally {
            setLoading(false);
        }
    };
    // ======================
    // UI
    // ======================
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("img", { src: "/logo.svg", className: "w-[33px]" }), _jsx("span", { className: "text-[25px] font-bold", children: "Booky" })] }), _jsx("h1", { className: "text-[30px] font-bold", children: "Login" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Sign in to manage your library account." }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "font-semibold text-gray-700", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => {
                                const value = e.target.value;
                                setEmail(value);
                                if (emailTouched) {
                                    setEmailError(validateEmail(value));
                                }
                            }, onBlur: () => {
                                setEmailTouched(true);
                                setEmailError(validateEmail(email));
                            }, className: `w-full h-[48px] px-4 border rounded-xl outline-none
            ${emailError
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"}` }), emailError && emailTouched && (_jsx("p", { className: "text-red-500 text-sm", children: emailError }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "font-semibold text-gray-700", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => {
                                const value = e.target.value;
                                setPassword(value);
                                if (passwordTouched) {
                                    setPasswordError(validatePassword(value));
                                }
                            }, onBlur: () => {
                                setPasswordTouched(true);
                                setPasswordError(validatePassword(password));
                            }, className: `w-full h-[48px] px-4 border rounded-xl outline-none
            ${passwordError
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"}` }), passwordError && passwordTouched && (_jsx("p", { className: "text-red-500 text-sm", children: passwordError }))] }), authError && (_jsx("p", { className: "text-red-500 text-sm mb-4 text-center", children: authError })), _jsx("button", { onClick: handleLogin, disabled: loading, className: "\r\n            w-full h-[48px]\r\n            rounded-full\r\n            text-white\r\n            font-semibold\r\n            bg-gradient-to-r\r\n            from-[#1C65DA]\r\n            to-[#1A87D7]\r\n            hover:opacity-90\r\n            disabled:opacity-50\r\n          ", children: loading
                        ? "Logging in..."
                        : "Login" }), _jsxs("p", { className: "text-center text-gray-600 mt-4", children: ["Don't have an account?", " ", _jsx("span", { onClick: () => navigate("/register"), className: "text-blue-600 font-semibold cursor-pointer", children: "Register" })] })] }) }));
}
