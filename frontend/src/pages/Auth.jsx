import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom"; 
import { signUp, login, loginWithGoogle } from "../auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        const userCredential = await login(form.email, form.password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("authToken", token); // <--- store token

        const response = await fetch("https://amazonclone-1lul.onrender.com/api/protected", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const userData = await response.json();
        console.log("User Data:", userData);

        
        navigate("/product-home"); 
      } else {
        await signUp(form.name, form.email, form.password);
        
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await loginWithGoogle();
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token); 

      
      const response = await fetch("https://amazonclone-1lul.onrender.com/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const userData = await response.json();
      console.log("Google User:", user);
      console.log("Backend Data:", userData);

      // Redirect to ProductHomePage
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Link to="/" className="mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="h-10"
        />
      </Link>

      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-md p-6">
        <h1 className="text-2xl font-medium mb-4">
          {isLogin ? "Sign-In" : "Create account"}
        </h1>

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="text-sm font-semibold">Your name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="First and last name"
                className="mt-1 w-full border border-gray-300 rounded-sm p-2 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-sm p-2 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={
                isLogin ? "Enter your password" : "At least 6 characters"
              }
              className="mt-1 w-full border border-gray-300 rounded-sm p-2 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              required
            />
            {!isLogin && (
              <p className="text-xs text-gray-600 mt-1">
                Passwords must be at least 6 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-sm py-2 border border-yellow-600"
          >
            {isLogin ? "Sign-In" : "Continue"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm px-2">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-sm py-2 hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium">
            {isLogin ? "Sign in with Google" : "Continue with Google"}
          </span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1 text-sm mt-6">
        {isLogin ? (
          <>
            <span>New to Amazon?</span>
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:underline"
            >
              Create your Amazon account
            </button>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:underline"
            >
              Sign-In
            </button>
          </>
        )}
      </div>
    </div>
  );
} 