"use client";
export function BtnCustomizado({ text }: { text: string }) {
  return (
    <button className="btn-customizado">
      <span>{text}</span>
    </button>
  );
}
