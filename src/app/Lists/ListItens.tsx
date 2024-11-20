import { useEffect, useState } from "react";
import { Item } from "../Item";
import { ItemList } from "../ItemsList/ItemList";
import ListItensNoItems from "./ListItensNoItems";

export function ListItens({ listId }: { listId: string }) {
  const [items, setItems] = useState([] as ItemList[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.api}/items/find-by-list/${listId}`)
      .then((response) => response.json())
      .then((data: ItemList[]) => {
        setLoading(false);
        setItems(data);
      });
  }, []);

  return (
    <ul>
      {loading && (
        <div className="list-loading">
          <h1>Loading...</h1>
        </div>
      )}
      {!loading && items.length === 0 && <ListItensNoItems />}
      {!loading &&
        items.map((item: ItemList) => <Item key={item.id} item={item} />)}
    </ul>
  );
}
