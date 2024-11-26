"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { InputCustomizado } from "../InputCustomizado";
import { AuthButton } from "./AuthButton";
import { FormError } from "./FormError";
import { useRouter } from "next/navigation";
import { Post } from "../utils/fetchUtils";

export function Login() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/Lists");
  }

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

    const data = { email, password };

    Post({
      url: "auth/login",
      params: data,
      anonymous: true,
      funcSuccess: (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);

        // pega o nome do usuário e armazena como sigla, se existir mais de um nome pega as iniciais, se não pega os 2 primeiros caracteres
        const userName = data.nome;
        let userNameSigla = "";
        if (userName.split(" ").length > 1) {
          userNameSigla = userName
            .split(" ")
            .map((n: string) => n[0])
            .join("");
        } else {
          userNameSigla = userName.substring(0, 2);
        }

        localStorage.setItem("userNameSigla", userNameSigla);

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
