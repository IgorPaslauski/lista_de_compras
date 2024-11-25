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
import { UserList } from "./UserList";
import { useEffect, useState } from "react";
import { InputCustomizado } from "../InputCustomizado";
import { useToast } from "@/hooks/use-toast";
import { Get, Post } from "../utils/fetchUtils";

export default function Home() {
  const [name, setName] = useState("");
  const userId = localStorage.getItem("userId");
  const { toast } = useToast();

  if (!userId) {
    window.location.href = "/";
  }
  const userNameSigla = localStorage.getItem("userNameSigla");

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [listas, setListas] = useState<UserList[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateList = async () => {};
  const handleCancel = () => {};

  useEffect(() => {
    Get({
      url: `${process.env.api}/lists/find-list-by-user/${userId}`,
      funcSuccess: (data) => {
        setListas(data);
        setLoadingList(false);
      },
      funcError: () => {
        toast({
          title: "Failed to load lists.",
          description: `${new Date().toLocaleString()}`,
          variant: "destructive",
        });
      },
      funcFinally: () => {},
    });
  }, []);

  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ListLists items={listas} pending={loadingList} />
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

                <InputCustomizado
                  placeholder="Name of the list"
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ariaLabel={""}
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
