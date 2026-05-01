
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthForm from "../components/Authform";

export default function HomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthForm
      title="Create Account"
      fields={[
        {
          name: "username",
          type: "text",
          placeholder: "Enter your username",
        },
        {
          name: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
      buttonText="Sign Up"
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkHref="/login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}