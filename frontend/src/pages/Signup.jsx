import React from "react";

export default function Signup() {
  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup Successful (Dummy)");
    window.location = "/";
  };

  const handleGoogleSignup = () => {
    alert("Google Signup Successful (Dummy)");
    window.location = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input type="text" placeholder="Full Name" className="border p-2 w-full mb-2"/>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"/>
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4"/>
        <button onClick={handleSignup} className="bg-blue-600 text-white px-4 py-2 w-full rounded mb-2">Sign Up</button>
        <button onClick={handleGoogleSignup} className="bg-red-500 text-white px-4 py-2 w-full rounded">Sign Up with Google</button>
        <p className="mt-2">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={()=> window.location='/login'}>Login</span></p>
      </form>
    </div>
  );
}
