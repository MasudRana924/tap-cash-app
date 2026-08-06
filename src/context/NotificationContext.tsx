import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NotificationData {
  title?: string;
  body?: string;
  data?: any;
}

interface NotificationContextType {
  notification: NotificationData | null;
  showNotification: (data: NotificationData) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

let globalShowNotification: ((data: NotificationData) => void) | null = null;

export const getGlobalShowNotification = () => globalShowNotification;
export const setGlobalShowNotification = (fn: ((data: NotificationData) => void) | null) => {
  globalShowNotification = fn;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );

  const showNotification = (data: NotificationData) => {
    setNotification(data);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    setGlobalShowNotification(showNotification);
    return () => {
      setGlobalShowNotification(null);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within NotificationProvider',
    );
  }
  return context;
};
