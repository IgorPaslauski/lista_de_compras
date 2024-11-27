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

export function Item({
  item,
  onDelete,
  onCheck,
}: {
  item: ItemList;
  onDelete: () => void;
  onCheck: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    await Delete({
      url: `items/delete-item/${item.id}`,
      funcSuccess: () => {
        toast({
          title: "Item deleted successfully.",
          description: `${new Date().toLocaleString()}`,
          variant: "success",
        });
        onDelete();
      },
      funcError: () => {
        console.error("Failed to delete item.");
      },
      funcFinally: () => {
        setLoading(false);
      },
    });
  };
  const handleCheck = async () => {
    const data = {
      id: item.id,
      purchased: !item.purchased,
      itemName: item.itemName,
      description: item.description,
      listId: item.listId,
    };

    console.log(data);
    console.log(item);

    await Put({
      url: `items/update-item/${item.id}`,
      params: data,
      funcSuccess: () => {
        toast({
          title: "Item updated successfully.",
          description: `${new Date().toLocaleString()}`,
          variant: "success",
        });
        onCheck();
      },
      funcError: () => {
        toast({
          title: "Failed to update item.",
          description: `${new Date().toLocaleString()}`,
          variant: "destructive",
        });
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
            <button style={{ background: "none", border: "none" }}>
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

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="bg-gray-800 w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
