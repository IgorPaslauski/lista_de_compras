interface AuthButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean; // Caso você queira mostrar um loading
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      className="btn-customizado"
      onClick={onClick}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <span>Loading...</span> : <span>{label}</span>}
    </button>
  );
};
