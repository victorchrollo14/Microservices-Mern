import React, { useState } from "react";

export function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async () => {
    try {
      const { fullName, email, password } = formData;
      const response = await fetch("http://localhost:80/user/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.error) {
        alert(responseData.error);
        return;
      }
      alert(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      // Handle register logic
      register();
    } else {
      try {
        const { email, password } = formData;
        const response = await fetch("http://localhost:80/user/login", {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();

        // adding token to localStorage
        const token = await data.token;
        const user = await data.user;
        localStorage.setItem("Token", token);
        localStorage.setItem("User", JSON.stringify(user));

        if (data.error) {
          alert(data.error);
          return;
        }
        alert(data.message);

        window.location.reload();
      } catch (err) {
        alert(`error: ${err}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 border p-4">
        <h2 className="text-2xl mb-4 text-white">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-white text-sm mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isRegister ? "Register" : "Login"}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="bg-gray-300 text-gray-700 p-2 rounded"
            >
              {isRegister ? "Switch to Login" : "Switch to Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
