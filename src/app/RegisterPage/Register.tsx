"use client";
import Link from "next/link";
import { InputCustomizado } from "../InputCustomizado";
import { useState } from "react";
import { Post } from "../utils/fetchUtils";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

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

      Post({
        url: "users/create-user",
        params: data,
        anonymous: true,
        funcSuccess: () => {
          toast({
            title: "Registration successful.",
            description: `${new Date().toLocaleString()}`,
            variant: "success",
          });
          router.push("/");
        },
        funcError: () => {
          setError("Registration failed. Please try again.");
        },
        funcFinally: () => {},
      });
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
        <button type="submit" className="button-login bg-gray-800 p-2 w-full">
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
