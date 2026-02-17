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
  // TOUCHED STATE (UX PRO)
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

  const validateEmail = (value: string) => {
    if (!value) return "Email required";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Invalid email";

    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password required";
    if (value.length < 6) return "Password min 6 characters";
    return "";
  };

  // ======================
  // HANDLERS
  // ======================

  // ======================
  // LOGIN SUBMIT
  // ======================

  const handleLogin = async () => {
    // reset error
    setAuthError("");

    // validation basic (UX-pro)
    if (!email) {
      setAuthError("Email is required");
      return;
    }

    if (!password) {
      setAuthError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://library-backend-production-b9cf.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      // kalau gagal dari server
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // tandai user sebagai login
      localStorage.setItem("isLoggedIn", "true");

      // simpan token juga kalau ada
      localStorage.setItem("token", data.data.token);

      // redirect ke dashboard
      navigate("/dashboard");

      // simpan token
      localStorage.setItem("token", data.data.token);

      // redirect ke dashboard
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // UI
  // ======================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.svg" className="w-[33px]" />
          <span className="text-[25px] font-bold">Booky</span>
        </div>

        {/* TITLE */}
        <h1 className="text-[30px] font-bold">Login</h1>
        <p className="text-gray-600 mb-6">
          Sign in to manage your library account.
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              if (emailTouched) {
                setEmailError(validateEmail(value));
              }
            }}
            onBlur={() => {
              setEmailTouched(true);
              setEmailError(validateEmail(email));
            }}
            className={`w-full h-[48px] px-4 border rounded-xl outline-none
  ${emailError ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />

          {emailError && emailTouched && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (passwordTouched) {
                setPasswordError(validatePassword(value));
              }
            }}
            onBlur={() => {
              setPasswordTouched(true);
              setPasswordError(validatePassword(password));
            }}
            className={`w-full h-[48px] px-4 border rounded-xl outline-none
  ${passwordError ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />

          {passwordError && passwordTouched && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        {/* AUTH ERROR */}
        {authError && (
          <p className="text-red-500 text-sm mb-4 text-center">{authError}</p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[48px] rounded-full text-white font-semibold
                     bg-gradient-to-r from-[#1C65DA] to-[#1A87D7]
                     hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
