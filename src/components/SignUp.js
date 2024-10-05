import React from "react";
import "../index.css";
import "./SignUp.css";
import { Link } from "react-router-dom";
   
  function SignUpForm() {
    return (
       <div className="flex justify-center items-center h-screen">
        <form className="Container">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p> Nice to meet you! Enter your details to regester.</p>
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" className="border  border-black px-2 h-10 w-full rounded-lg" required />
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" className="border  border-black h-10 px-2 w-full rounded-lg" required  />
          <label for="password" className="mt-5 mb-6">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" className=" border border-black px-2 h-10 w-full rounded-md" required />
          <button type="submit" className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg ">Sign Up</button>
          <p className="text-center mt-4">Already have an account? <Link to="/login">Login</Link></p>
        </form>
       </div>
        
       
    );
  }

  export default SignUpForm;