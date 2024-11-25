"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { InputCustomizado } from "../InputCustomizado";
import { AuthButton } from "./AuthButton";
import { FormError } from "./FormError";
import { useRouter } from "next/navigation";
import { Post } from "../utils/fetchUtils";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    const data = { email, password };

    Post({
      url: "auth/login",
      params: data,
      anonymous: true,
      funcSuccess: (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        router.push("/Lists");
      },
      funcError: () => {
        setError("Login failed. Please try again.");
        setIsLoading(false);
      },
      funcFinally: () => {
        setIsLoading(false);
      },
    });
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
