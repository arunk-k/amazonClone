import React from "react";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login Successful (Dummy)");
    window.location = "/";
  };

  const handleGoogleLogin = () => {
    alert("Google Login Successful (Dummy)");
    window.location = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"/>
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4"/>
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full rounded mb-2">Login</button>
        <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 w-full rounded">Login with Google</button>
        <p className="mt-2">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={()=> window.location='/signup'}>Sign Up</span></p>
      </form>
    </div>
  );
}
