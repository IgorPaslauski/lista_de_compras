import { BtnCustomizado } from "../BtnCustomizado";
import { InputCustomizado } from "../InputCustomizado";
import Link from "next/link";

export function Login() {
  return (
    <form className="form-login">
      <InputCustomizado type="text" placeholder="Enter your Email" />
      <InputCustomizado type="password" placeholder="Enter yuor Password" />
      <BtnCustomizado text="Login" />
      <span className="register-now">
        Don’t have an account?
        <Link href="/RegisterPage">Register Now</Link>
      </span>
    </form>
  );
}
