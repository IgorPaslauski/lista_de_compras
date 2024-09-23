import { Item } from "./Item";

export function ListItens() {
  const items = [
    { name: "Item 1" },
    { name: "Item 2" },
    { name: "Item 3" },
    { name: "Item 4" },
  ];

  return (
    <ul>
      {items.length === 0 && (
        <div className="list-no-have-items">
          <h1>No items</h1>
        </div>
      )}
      {items.map((item, index) => (
        <Item key={index} />
      ))}
    </ul>
  );
}
