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
import { ItemList } from "./ItemList";
import { Delete, Put } from "../utils/fetchUtils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function Item({ item }: { item: ItemList }) {

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    Delete({
      url: `items/delete-item/${item.id}`,
      funcSuccess: () => {
        window.location.reload();
      },
      funcError: () => {
        console.error("Failed to delete item.");
      },
      funcFinally: () => {
        setLoading(false);
      },
    });
  };
  const handleCheck = () => {
    const data = {
      id: item.id,
      purchased: !item.purchased,
      itemName: item.itemName,
      description: item.description,
    };

    Put({
      url: `items/update-item/${item.id}`,
      params: data,
      funcSuccess: () => {
        toast({
          title: "Item updated successfully.",
          description: `${new Date().toLocaleString()}`,
          variant: "success",
        });
      },
      funcError: () => {
        console.error("Failed to update item.");
      },
      funcFinally: () => {},
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
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
