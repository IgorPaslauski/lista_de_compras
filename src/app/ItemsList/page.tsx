import Link from "next/link";
import { ArrowBackIcon } from "../ArrowBackIcon";
import { ExportIcon } from "../ExportIcon";
import { ListItens } from "../ListItens";
import { Logo } from "../Logo";
import { PlusIcon } from "../PlusIcon";

export default function Home() {
  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ListItens />
          </div>
          <footer className="container-conteudo-footer">
            <button>
              <Link href="/Lists">
                <ArrowBackIcon />
              </Link>
            </button>
            <button>
              <PlusIcon />
            </button>
            <button>
              <ExportIcon />
            </button>
          </footer>
        </div>
      </main>
    </>
  );
}
