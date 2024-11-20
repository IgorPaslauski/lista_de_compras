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
import { ShoppingCart, Trash } from "lucide-react";
import { UserList } from "./Lists/UserList";

export function List({ list }: { list: UserList }) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await fetch(`${process.env.api}/lists/delete-list/${list.listId}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch {
      console.error("Failed to delete list.");
    }
  };

  const handleItemClick = async (e: React.MouseEvent<HTMLElement>) => {
    // redirecionar para a página de itens
    e.preventDefault();
    window.location.href = `/ItemsList?listId=${list.listId}`;
  };

  return (
    <li>
      <div className="flex w-full gap-2 cursor-pointer" onClick={handleItemClick}>
        <div>
          <ShoppingCart />
        </div>
        <div className="list-label">{list.listName}</div>
      </div>
      <div>
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
                <Button>Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
