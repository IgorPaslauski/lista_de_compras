import { useEffect, useState } from "react";
import { Item } from "../ItemsList/Item";
import { ItemList } from "../ItemsList/ItemList";
import ListItensNoItems from "./ListItensNoItems";
import { Get } from "../utils/fetchUtils";
import LoadingPersonalizado from "@/components/LoadingPersonalizado";

export function ListItens({ listId }: { listId: string }) {
  const [items, setItems] = useState([] as ItemList[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Get({
      url: `items/find-by-list/${listId}`,
      funcSuccess: (data) => {
        setLoading(false);
        setItems(data);
      },
      funcError: () => {
        console.error("Failed to load items.");
      },
      funcFinally: () => {
        setLoading(false);
      },
    });
  }, []);

  return (
    <ul>
      {loading && <LoadingPersonalizado />}
      {!loading && items.length === 0 && <ListItensNoItems />}
      {!loading &&
        items.map((item: ItemList) => <Item key={item.id} item={item} />)}
    </ul>
  );
}
