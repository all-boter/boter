import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string
  color?: string
  bg?: string
  size?: 'small' | 'middle'
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonOrgin(props: ButtonProps) {
  const { children, ...rest } = props

  return <button {...rest}>{children}</button>;
}
