import { BtnCustomizado } from "../BtnCustomizado";
import { InputCustomizado } from "../InputCustomizado";
import Link from "next/link";

export function Register() {
  return (
    <form className="form-login">
      <InputCustomizado type="text" placeholder="Name" />
      <InputCustomizado type="email" placeholder="Email" />
      <InputCustomizado type="password" placeholder="Password" />
      <InputCustomizado type="password" placeholder="Confirm Password" />
      <BtnCustomizado text="Register" />
      <span className="register-now">
        Already have an account?
        <Link href="/">Login Now</Link>
      </span>
    </form>
  );
}
