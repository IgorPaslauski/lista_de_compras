"use client";
import Link from "next/link";
import { ListItens } from "../Lists/ListItens";
import { Logo } from "../Logo";
import { ArrowLeft, FileUp, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Post } from "../utils/fetchUtils";

export default function Home() {
  const searchParams = useSearchParams();

  const listId = searchParams?.get("listId") || "";

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  if (!listId) {
    window.location.href = "/Lists";
  }

  const handleCancel = () => {
    setIsOpen(false); // Fecha o diálogo
  };

  const handleCreateItem = async () => {
    try {
      setLoading(true);
      await Post({
        url: "items/create-item",
        params: {
          itemName: name,
          description,
          listId,
          purchased: false,
        },
        funcSuccess: () => {
          setLoading(false);
          setIsOpen(false);
          window.location.reload();
        },
        funcError: () => {
          console.error("Failed to create item.");
        },
        funcFinally: () => {
          setLoading(false);
        },
      });
    } catch {
      console.error("Failed to create item.");
    }
  };

  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ListItens listId={listId} />
          </div>
          <footer className="container-conteudo-footer">
            <Link href="/Lists">
              <button>
                <ArrowLeft />
              </button>
            </Link>
            <div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus></Plus>
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create item</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to create a new Item?
                    </DialogDescription>
                  </DialogHeader>

                  <Input
                    name="name"
                    placeholder="Name of the item"
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    name="description"
                    placeholder="Description of the item"
                    type={"text"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <DialogFooter>
                    <div className="flex gap-4 w-full">
                      <Button type="button" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleCreateItem}>
                        {loading ? "Creating..." : "Create"}
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <button>
              <FileUp />
            </button>
          </footer>
        </div>
      </main>
    </>
  );
}
