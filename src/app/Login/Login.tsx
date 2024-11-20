"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { InputCustomizado } from "../InputCustomizado";
import { AuthButton } from "./AuthButton";
import { FormError } from "./FormError";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const data = { email, password };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(data);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      } as RequestInit;

      fetch(`${process.env.api}/users/autentica-user`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setError(""); // Limpar o erro
            const nomeSigla = result.name.split(" ") || ["", ""];

            let sigla = ""; // primeira letra do nome e do sobrenome
            if (nomeSigla.length > 1) {
              sigla = nomeSigla[0].charAt(0) + nomeSigla[1].charAt(0);
            } else {
              sigla = nomeSigla[0].charAt(0) + nomeSigla[0].charAt(1);
            }
            // Salvar o token no localStorage
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("userName", result.name);
            localStorage.setItem("userNameSigla", sigla.toUpperCase());

            window.location.href = "/Lists"; // Redirecionar para login
          } else {
            setError(result.message);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError("Login failed. Please try again.");
          setIsLoading(false);
        });
    } catch {
      setIsLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form className="form-login" onSubmit={handleLogin}>
      <InputCustomizado
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ariaLabel="Email"
      />
      <InputCustomizado
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ariaLabel="Password"
      />
      {error && <FormError message={error} />} {/* Exibindo erros */}
      <AuthButton label="Login" onClick={handleLogin} isLoading={isLoading} />
      <span className="register-now">
        Don’t have an account? <Link href="/RegisterPage">Register Now</Link>
      </span>
    </form>
  );
}
