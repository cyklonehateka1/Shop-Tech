import { createContext, useState } from "react";

export const AccessAwaitEmailContext = createContext();

export const AccessAwaitEmailProvider = ({ children }) => {
  const [checkInfo, setCheckInfo] = useState(false);

  return (
    <AccessAwaitEmailContext.Provider value={{ checkInfo, setCheckInfo }}>
      {children}
    </AccessAwaitEmailContext.Provider>
  );
};
