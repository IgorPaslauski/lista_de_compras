import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ariaLabel: string;
}

export const InputCustomizado: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  ariaLabel,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      className="input-customizado"
    />
  );
};
