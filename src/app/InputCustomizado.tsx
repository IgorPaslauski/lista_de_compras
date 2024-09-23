export function InputCustomizado({
  type,
  placeholder,
}: {
  type: string | "text";
  placeholder: string | "";
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-customizado"
    />
  );
}
