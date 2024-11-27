"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PackageOpen, ShoppingCart, Trash } from "lucide-react";
import { UserList } from "./UserList";
import { Delete } from "../utils/fetchUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function List({
  list,
  onDelete,
}: {
  list: UserList;
  onDelete: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    await Delete({
      url: `lists/delete-list/${list.listId}`,
      funcSuccess: () => {
        router.refresh();
        onDelete();
      },
      funcError: () => {
        console.error("Failed to delete list.");
      },
      funcFinally: () => {
        setLoading(false);
      },
    });
  };

  const handleItemClick = async (e: React.MouseEvent<HTMLElement>) => {
    // redirecionar para a página de itens, usando o redirecionamento do Next.js e passando o id da lista
    e.preventDefault();

    router.push(`/ItemsList?listId=${list.listId}`);
  };

  return (
    // se tiver todos os itens comprados, deixar o texto em tachado
    <li
      {...(list.allItemsPurchased && !list.listEmpty
        ? { className: "line-through" }
        : {})}
    >
      <div
        className="flex w-full gap-2 cursor-pointer"
        onClick={handleItemClick}
      >
        <div>
          <ShoppingCart />
        </div>
        <div className="list-label">{list.listName}</div>
      </div>
      <div className="flex gap-2">
        {list.listEmpty ? (
          <PackageOpen xlinkTitle="Lista vazia" className="text-gray-400" />
        ) : (
          <></>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <Trash />
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete List</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this list?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-gray-200 w-full bg-gray-800">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500"
              >
                {loading ? "Loading..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
