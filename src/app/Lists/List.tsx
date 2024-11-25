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
import { UserList } from "./UserList";
import { Delete } from "../utils/fetchUtils";

export function List({ list }: { list: UserList }) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await Delete({
      url: `lists/delete-list/${list.listId}`,
      funcSuccess: () => {
        window.location.reload();
      },
      funcError: () => {
        console.error("Failed to delete list.");
      },
      funcFinally: () => {},
    });
  };

  const handleItemClick = async (e: React.MouseEvent<HTMLElement>) => {
    // redirecionar para a página de itens
    e.preventDefault();
  };

  return (
    <li>
      <div
        className="flex w-full gap-2 cursor-pointer"
        onClick={handleItemClick}
      >
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
