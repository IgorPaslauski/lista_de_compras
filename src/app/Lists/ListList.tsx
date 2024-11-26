"use client";
import { UserList } from "./UserList";
import { List } from "./List";
import LoadingPersonalizado from "@/components/LoadingPersonalizado";

export function ListLists({
  items,
  pending,
}: {
  items: UserList[];
  pending: boolean;
}) {
  if (pending) {
    return <LoadingPersonalizado />;
  }
  return (
    <ul>
      {items.length === 0 ? (
        <div className="list-no-have-items">
          <h1>No Lists</h1>
        </div>
      ) : (
        items.map((item) => <List key={item.listId} list={item} />)
      )}
    </ul>
  );
}
