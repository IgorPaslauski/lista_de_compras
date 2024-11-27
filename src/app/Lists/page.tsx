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
import { Logo } from "../Logo";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserList } from "./UserList";
import { useEffect, useState } from "react";
import { InputCustomizado } from "../InputCustomizado";
import { useToast } from "@/hooks/use-toast";
import { Get, Post } from "../utils/fetchUtils";
import { useRouter } from "next/navigation";
import "./profile.css";
import Profile from "./Profile";
import { List } from "./List";
import LoadingPersonalizado from "@/components/LoadingPersonalizado";

export default function Home() {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [userNameSigla, setUserNameSigla] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/");
    }
    setUserNameSigla(localStorage.getItem("userNameSigla") || "");
  }, [router]);


  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [listas, setListas] = useState<UserList[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleCancel = () => {
    setName("");
    setIsOpen(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLoadingList(true);
    Get({
      url: `lists/find-list-by-user/${userId}`,
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
  }, [toast, refresh]);

  const handleCreateList = async () => {
    if (!name) {
      toast({
        title: "Please fill in the name of the list.",
        description: `${new Date().toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const userId = localStorage.getItem("userId");
    const data = {
      listName: name,
      userId: userId,
    };

    Post({
      url: `lists/create-list`,
      params: data,
      funcSuccess: () => {
        toast({
          title: "List created successfully.",
          description: `${new Date().toLocaleString()}`,
          variant: "success",
        });

        setRefresh((prev) => !prev);
      },
      funcError: () => {
        toast({
          title: "Failed to create list.",
          description: `${new Date().toLocaleString()}`,
          variant: "destructive",
        });
        setLoading(false);
      },
      funcFinally: () => {
        setLoading(false);
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ul>
              {loadingList ? (
                <LoadingPersonalizado />
              ) : listas.length === 0 ? (
                <div className="list-no-have-items">
                  <h1>No Lists</h1>
                </div>
              ) : (
                listas.map((item) => (
                  <List
                    key={item.listId}
                    list={item}
                    onDelete={function (): void {
                      setRefresh((prev) => !prev);
                    }}
                  />
                ))
              )}
            </ul>
          </div>
          <footer className="container-conteudo-footer">
            <Dialog>
              <DialogTrigger asChild>
                <button>{userNameSigla}</button>
              </DialogTrigger>

              <DialogContent>
                <Profile />

                <DialogFooter>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      className="w-full bg-red-500"
                      onClick={() => {
                        localStorage.removeItem("userId");
                        localStorage.removeItem("token");

                        router.push("/");
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="w-full bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleCreateList}
                    className="bg-green-500"
                  >
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </footer>
        </div>
      </main>
    </>
  );
}
