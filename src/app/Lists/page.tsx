"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListLists } from "./ListList";
import { Logo } from "../Logo";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/";
  }

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para lidar com o cancelamento
  const handleCancel = () => {
    setIsOpen(false); // Fecha o diálogo
  };

  const handleCreateList = async () => {
    try {
      setLoading(true);
      fetch(`${process.env.api}/lists/create-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName: name, userId }),
      }).then(() => {
        setLoading(false);
        setIsOpen(false);
        window.location.reload();
      });
    } catch {
      console.error("Failed to create list.");
    }
  };

  const userNameSigla = localStorage.getItem("userNameSigla");
  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ListLists />
          </div>
          <footer className="container-conteudo-footer">
            <button>{userNameSigla}</button>
            <button className="container-conteudo-footer-backHome">
              <Logo />
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus></Plus>
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create List</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to create a new list?
                  </DialogDescription>
                </DialogHeader>

                <Input
                  name="name"
                  placeholder="Name of the list"
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <DialogFooter>
                  <div className="flex gap-4">
                    <Button type="button" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleCreateList}>
                      {loading ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </footer>
        </div>
      </main>
    </>
  );
}
