import { Register } from "./Register";
import { Logo } from "../Logo";

export default function Home() {
  return (
    <>
      <main className="conteudo-main">
        <h1 className="title-main">PhantShopping</h1>
        <Logo />
        <Register />
      </main>
    </>
  );
}
