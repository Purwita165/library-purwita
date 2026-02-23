import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
    const navigate = useNavigate();
    // ========================
    // FORM STATE
    // ========================
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // ========================
    // TOUCHED STATE (UX professional)
    // ========================
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);
    // ========================
    // ERROR STATE
    // ========================
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    // ========================
    // VALIDATION FUNCTIONS
    // ========================
    const validateName = () => {
        if (!name.trim()) {
            setNameError("Name is required");
            return false;
        }
        setNameError("");
        return true;
    };
    const validateEmail = () => {
        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            setEmailError("Valid email required");
            return false;
        }
        setEmailError("");
        return true;
    };
    const validatePhone = () => {
        if (phone && phone.length < 8) {
            setPhoneError("Phone min 8 characters");
            return false;
        }
        setPhoneError("");
        return true;
    };
    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Password min 6 characters");
            return false;
        }
        setPasswordError("");
        return true;
    };
    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setConfirmError("Password does not match");
            return false;
        }
        setConfirmError("");
        return true;
    };
    const validateAll = () => {
        const v1 = validateName();
        const v2 = validateEmail();
        const v3 = validatePhone();
        const v4 = validatePassword();
        const v5 = validateConfirmPassword();
        return v1 && v2 && v3 && v4 && v5;
    };
    // ========================
    // HANDLE REGISTER
    // ========================
    const handleRegister = async () => {
        setNameTouched(true);
        setEmailTouched(true);
        setPhoneTouched(true);
        setPasswordTouched(true);
        setConfirmTouched(true);
        if (!validateAll())
            return;
        try {
            const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "Register gagal");
                return;
            }
            alert("Register berhasil");
            navigate("/");
        }
        catch (error) {
            console.error(error);
            alert("Register gagal");
        }
    };
    // ========================
    // UI
    // ========================
    const inputClass = (error, touched) => `w-full h-[48px] px-4 border rounded-xl outline-none focus:border-blue-500 ${error && touched ? "border-red-500" : "border-[#CCD5E2]"}`;
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("img", { src: "/logo.svg", className: "w-[33px] h-[33px]" }), _jsx("span", { className: "text-[25px] font-bold", children: "Booky" })] }), _jsx("h1", { className: "text-[30px] font-bold", children: "Register" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Create your account to start borrowing books." }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { children: "Name" }), _jsx("input", { value: name, onChange: (e) => {
                                setName(e.target.value);
                                if (nameTouched)
                                    validateName();
                            }, onBlur: () => {
                                setNameTouched(true);
                                validateName();
                            }, className: inputClass(nameError, nameTouched) }), nameTouched && nameError && (_jsx("p", { className: "text-red-500 text-sm", children: nameError }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { children: "Email" }), _jsx("input", { value: email, onChange: (e) => {
                                setEmail(e.target.value);
                                if (emailTouched)
                                    validateEmail();
                            }, onBlur: () => {
                                setEmailTouched(true);
                                validateEmail();
                            }, className: inputClass(emailError, emailTouched) }), emailTouched && emailError && (_jsx("p", { className: "text-red-500 text-sm", children: emailError }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { children: "Nomor Handphone" }), _jsx("input", { value: phone, onChange: (e) => {
                                setPhone(e.target.value);
                                if (phoneTouched)
                                    validatePhone();
                            }, onBlur: () => {
                                setPhoneTouched(true);
                                validatePhone();
                            }, className: inputClass(phoneError, phoneTouched) }), phoneTouched && phoneError && (_jsx("p", { className: "text-red-500 text-sm", children: phoneError }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => {
                                setPassword(e.target.value);
                                if (passwordTouched)
                                    validatePassword();
                            }, onBlur: () => {
                                setPasswordTouched(true);
                                validatePassword();
                            }, className: inputClass(passwordError, passwordTouched) }), passwordTouched && passwordError && (_jsx("p", { className: "text-red-500 text-sm", children: passwordError }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { children: "Confirm Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => {
                                setConfirmPassword(e.target.value);
                                if (confirmTouched)
                                    validateConfirmPassword();
                            }, onBlur: () => {
                                setConfirmTouched(true);
                                validateConfirmPassword();
                            }, className: inputClass(confirmError, confirmTouched) }), confirmTouched && confirmError && (_jsx("p", { className: "text-red-500 text-sm", children: confirmError }))] }), _jsx("button", { onClick: handleRegister, className: "w-full h-[48px] mt-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#1C65DA] to-[#1A87D7]", children: "Register" }), _jsxs("p", { className: "text-center text-gray-600 mt-4", children: ["Already have an account?", _jsx("span", { onClick: () => navigate("/"), className: "text-blue-600 font-semibold cursor-pointer ml-1", children: "Login" })] })] }) }));
}
