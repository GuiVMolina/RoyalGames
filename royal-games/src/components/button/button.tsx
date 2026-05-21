import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Botoes = ({ className, children, disabled, style }: ButtonProps) => {
  return <button className={className}>{children}</button>;
};

export default Botoes;
