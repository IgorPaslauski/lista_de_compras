"use client";
import Link from "next/link";
import { InputCustomizado } from "../InputCustomizado";
import { useState } from "react";

export function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Validação dos campos
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Enviar dados para o backend
      const data = { name, email, password };
      const response = await fetch(`${process.env.api}/users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataReturn = await response.json();
      if (dataReturn.status === "error") {
        setError(dataReturn.message);
      } else {
        setError(""); // Limpar o erro
        window.location.href = "/"; // Redirecionar para login
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <form className="form-login" onSubmit={handleRegister}>
        {error && <p className="error-message">{error}</p>}

        <InputCustomizado
          type="text"
          placeholder="Name"
          ariaLabel="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <InputCustomizado
          type="email"
          placeholder="Email"
          ariaLabel="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <InputCustomizado
          type="password"
          placeholder="Password"
          ariaLabel="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <InputCustomizado
          type="password"
          placeholder="Confirm Password"
          ariaLabel="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button type="submit" className="button-login">
          Register
        </button>
        <span className="register-now">
          Already have an account?{" "}
          <Link href="/" onClick={() => setError("")}>
            Login Now
          </Link>
        </span>
      </form>
    </>
  );
}
