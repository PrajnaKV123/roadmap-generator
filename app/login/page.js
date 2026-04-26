// app/login/page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthForm from "../../components/Authform";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
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
      await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      fields={[
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
      buttonText="Login"
      bottomText="Don't have an account?"
      bottomLinkText="Register"
      bottomLinkHref="/"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}