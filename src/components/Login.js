import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [LoginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });


  const handleLoginChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(LoginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error(error);
      return;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="Container" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Login</h1>
        <p> Nice to meet you! Enter your details to login.</p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={LoginData.username}
          onChange={handleLoginChange}
          className="border  border-black px-2 h-10 w-full rounded-lg"
        />
        <label htmlFor="password" className="mt-5 mb-6">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={LoginData.password}
          onChange={handleLoginChange}
          className=" border border-black px-2 h-10 w-full rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg "
        >
          Login
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
