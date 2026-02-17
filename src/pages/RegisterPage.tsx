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

    if (!validateAll()) return;

    try {
      const response = await fetch(
        "https://library-backend-production-b9cf.up.railway.app/api/auth/register",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Register gagal");
        return;
      }

      alert("Register berhasil");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Register gagal");
    }
  };

  // ========================
  // UI
  // ========================

  const inputClass = (error: string, touched: boolean) =>
    `w-full h-[48px] px-4 border rounded-xl outline-none focus:border-blue-500 ${
      error && touched ? "border-red-500" : "border-[#CCD5E2]"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.svg" className="w-[33px] h-[33px]" />
          <span className="text-[25px] font-bold">Booky</span>
        </div>

        {/* Title */}
        <h1 className="text-[30px] font-bold">Register</h1>

        <p className="text-gray-600 mb-6">
          Create your account to start borrowing books.
        </p>

        {/* Name */}
        <div className="mb-4">
          <label>Name</label>

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameTouched) validateName();
            }}
            onBlur={() => {
              setNameTouched(true);
              validateName();
            }}
            className={inputClass(nameError, nameTouched)}
          />

          {nameTouched && nameError && (
            <p className="text-red-500 text-sm">{nameError}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label>Email</label>

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailTouched) validateEmail();
            }}
            onBlur={() => {
              setEmailTouched(true);
              validateEmail();
            }}
            className={inputClass(emailError, emailTouched)}
          />

          {emailTouched && emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label>Nomor Handphone</label>

          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (phoneTouched) validatePhone();
            }}
            onBlur={() => {
              setPhoneTouched(true);
              validatePhone();
            }}
            className={inputClass(phoneError, phoneTouched)}
          />

          {phoneTouched && phoneError && (
            <p className="text-red-500 text-sm">{phoneError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordTouched) validatePassword();
            }}
            onBlur={() => {
              setPasswordTouched(true);
              validatePassword();
            }}
            className={inputClass(passwordError, passwordTouched)}
          />

          {passwordTouched && passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        {/* Confirm */}
        <div className="mb-4">
          <label>Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmTouched) validateConfirmPassword();
            }}
            onBlur={() => {
              setConfirmTouched(true);
              validateConfirmPassword();
            }}
            className={inputClass(confirmError, confirmTouched)}
          />

          {confirmTouched && confirmError && (
            <p className="text-red-500 text-sm">{confirmError}</p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full h-[48px] mt-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#1C65DA] to-[#1A87D7]"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">

          Already have an account?

          <span
            onClick={() => navigate("/")}
            className="text-blue-600 font-semibold cursor-pointer ml-1"
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}