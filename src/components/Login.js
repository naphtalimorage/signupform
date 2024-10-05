import React from "react";
import { Link } from "react-router-dom";
   
  export default function LoginForm() {
    return (
      <div className="flex justify-center items-center h-screen">
      <form className="Container">
        <h1 className="text-2xl font-bold">Login</h1>
        <p> Nice to meet you! Enter your details to login.</p>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" className="border  border-black px-2 h-10 w-full rounded-lg" required />
        <label for="password" className="mt-5 mb-6">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" className=" border border-black px-2 h-10 w-full rounded-md" required />
        <button type="submit" className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg ">Login</button>
        <p className="text-center mt-4">Already have an account? <Link to="/">Sign Up</Link></p>
      </form>
     </div>
    );
  }