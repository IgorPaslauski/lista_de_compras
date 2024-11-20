"use client";
import { useEffect, useState } from "react";
import { UserList } from "./UserList";
import { List } from "../List";

export function ListLists() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/";
  }

  const [items, setItems] = useState([] as UserList[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.api}/lists/find-list-by-user/${userId}`)
      .then((response) => response.json())
      .then((data: UserList[]) => {
        setLoading(false);
        setItems(data);
      });
  }, []);

  return (
    <ul>
      {loading ? (
        <>
          <div className="list-loading">
            <h1>Loading...</h1>
          </div>
        </>
      ) : (
        <></>
      )}
      {!loading && items.length === 0 && (
        <div className="list-no-have-items">
          <h1>No Lists</h1>
        </div>
      )}
      {items.map((item: UserList) => (
        <List key={item.listId} list={item} />
      ))}
    </ul>
  );
}
