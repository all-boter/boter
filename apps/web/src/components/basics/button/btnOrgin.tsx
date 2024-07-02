import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string
  color?: string
  bg?: string
  width?: string
  height?: string
  padding: string
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonOrgin(props: ButtonProps) {
  const { children, ...rest } = props

  return <button {...rest}>{children}</button>;
}
