"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { ItemList } from "./ItemsList/ItemList";

export function Item({ item }: { item: ItemList }) {
  const handleDelete = () => {
    fetch(`${process.env.api}/items/delete-item/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    });
  };
  const handleCheck = () => {
    const data = {
      id: item.id,
      purchased: !item.purchased,
      itemName: item.itemName,
      description: item.description,
    }

    console.log(data);
    fetch(`${process.env.api}/items/update-item/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
     window.location.reload();
    });
  };
  return (
    <li>
      <div
        style={{
          display: "flex",
        }}
      >
        <Checkbox
          style={{ width: 32, height: 32, color: "#fff", borderColor: "#fff" }}
          checked={item.purchased}
          onCheckedChange={handleCheck}
        />
      </div>
      <div className="item-label">
        <div className="item-label-title">{item.itemName}</div>
        <div className="item-label-description">{item.description}</div>
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
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item?
              </DialogDescription>
            </DialogHeader>

            <form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={() => handleDelete}
                >
                  Delete
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
