import Image from "next/image";

export function List() {
  return (
    <li>
      <div>
        <Image
          alt="Cart Icon"
          src="/Shopping_cart.png"
          width={32}
          height={32}
        />
      </div>
      <div className="list-label">List Title</div>
      <div>
        <Image alt="Trash Icon" src="/Trash.png" width={32} height={32} />
      </div>
    </li>
  );
}
