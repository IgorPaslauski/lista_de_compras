import { ListLists } from "../ListList";
import { Logo } from "../Logo";

export default function Home() {
  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ListLists />
          </div>
          <footer className="container-conteudo-footer">
            <button>TF</button>
            <button className="container-conteudo-footer-backHome">
              <Logo />
            </button>
            <button>+</button>
          </footer>
        </div>
      </main>
    </>
  );
}
