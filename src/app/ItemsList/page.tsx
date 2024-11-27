"use client";
import Link from "next/link";
import { Logo } from "../Logo";
import { ArrowLeft, Plus, Share } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Get, Post } from "../utils/fetchUtils";
import { ItemList } from "./ItemList";
import LoadingPersonalizado from "@/components/LoadingPersonalizado";
import ListItensNoItems from "../Lists/ListItensNoItems";
import { Item } from "./Item";

export default function Home() {
  const searchParams = useSearchParams();

  const listId = searchParams?.get("listId") || "";
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  if (!listId) {
    router.push("/Lists");
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
          setRefresh((prev) => !prev);
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

  const [items, setItems] = useState([] as ItemList[]);
  useEffect(() => {
    setLoadingList(true);
    Get({
      url: `items/find-by-list/${listId}`,
      funcSuccess: (data) => {
        setItems(data);
      },
      funcError: () => {
        console.error("Failed to load items.");
      },
      funcFinally: () => {
        setLoadingList(false);
      },
    });
  }, [listId, refresh]);

  return (
    <>
      <main className="conteudo-main-home">
        <Logo />
        <div className="container-conteudo">
          <div className="container-conteudo-list">
            <ul>
              {loadingList && <LoadingPersonalizado />}
              {!loadingList && items.length === 0 && <ListItensNoItems />}
              {!loadingList &&
                items.map((item: ItemList) => (
                  <Item
                    key={item.id}
                    item={item}
                    onDelete={() => setRefresh((prev) => !prev)}
                    onCheck={() => setRefresh((prev) => !prev)}
                  />
                ))}
            </ul>
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
                     <Button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleCreateItem}
                        className="bg-green-500"
                      >
                        {loading ? "Creating..." : "Create"}
                      </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <button>
              <Share />
            </button>
          </footer>
        </div>
      </main>
    </>
  );
}
