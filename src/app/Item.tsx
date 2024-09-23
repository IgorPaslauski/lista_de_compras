import Image from "next/image";

export function Item() {
  return (
    <li>
      <div
        style={{
          display: "flex",
        }}
      >
        <input type="checkbox" className="input-checkbox" />
      </div>
      <div className="item-label">
        <div className="item-label-title">Item Title</div>
        <div className="item-label-description">Item Description</div>
      </div>
      <div>
        <Image alt="Trash Icon" src="/Trash.png" width={32} height={32} />
      </div>
    </li>
  );
}
