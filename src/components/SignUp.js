import React from "react";
import "../index.css";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { z } from "zod";

const SignupSchema = z.object({
  username: z.string().min(2, "Username is required").max(20),
  email: z
    .string()
    .min(2, "Email is required")
    .email(),
  password: z
    .string()
    .min(8, "password should be 8 characters and above")
    .max(20),
});

function SignUpForm() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFocus = (e) => {
    // Clear the error for the specific field when the user focuses on it
    setError((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      SignupSchema.parse(formData);
      setError({});

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod validation errors to display in the form
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setError(formattedErrors); // Update error state
      } else {
        console.error("Unexpected error:", error);
      }
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
          onFocus={handleFocus}
          className="border  border-black px-2 h-10 w-full rounded-lg"
        />
        {error.username && <span className="text-red-500 mb-20">{error.username}</span>}
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          className="border  border-black h-10 px-2 w-full rounded-lg"
        />
        {error.email && <span className="text-red-500 mb-5">{error.email}</span>}
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
          onFocus={handleFocus}
          className=" border border-black px-2 h-10 w-full rounded-md"
        />
        {error.password && <span className="text-red-500 mb-5">{error.password}</span>}
        <button
          type="submit"
          className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg "
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
