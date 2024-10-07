import React from "react";
import "../index.css";
import "./SignUp.css";
import { Link } from "react-router-dom";
// import { SignupSchema } from "../validation";

function SignUpForm() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  // const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error);
        return;
      } 
    
        const data = await response.json();
        alert(data.message);
    
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form className="Container" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p> Nice to meet you! Enter your details to regester.</p>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border  border-black px-2 h-10 w-full rounded-lg"
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border  border-black h-10 px-2 w-full rounded-lg"
        />

        <label for="password" className="mt-5 mb-6">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className=" border border-black px-2 h-10 w-full rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg "
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
