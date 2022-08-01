import React, { useReducer } from "react";
import { IProviderProps } from "../Helper/interface";
// import { IReducerActionProps } from "../Helper/interface";

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);

  const Provider: React.FC<IProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
