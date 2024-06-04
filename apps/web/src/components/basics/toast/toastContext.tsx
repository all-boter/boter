import React, { createContext, useState } from 'react';

export enum ToastType {
  info = 1,
  success = 2,
  error = 3
}

interface IOption {
  type: ToastType
  duration?: number
  direction?: 'Up' | 'Right'
}

interface IToast extends IOption {
  msg: string,
}

interface ToastContextValue {
  toasts: IToast[];
  showToast: (msg: string, option: IOption) => void;
  removeToast: (index: number) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  showToast: function (msg: string, option: IOption): void {
    throw new Error('Function not implemented.');
  },
  removeToast: function (index: number): void {
    throw new Error('Function not implemented.');
  }
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = (msg: string, option: IOption) => {
    setToasts((prevToasts) => [...prevToasts, {
      msg,
      ...option
    }]);
  };

  const removeToast = (index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>;
};
