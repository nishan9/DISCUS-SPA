//Structure of the Context API

import React, {createContext, useState} from 'react';

export const GlobalContext = createContext({
    value: "",
    setValue: (val:string) => {}
});

export const GlobalContextProvider : React.FC = ({children}) => {
    const [value, setValue] = useState("TestValue");

    return(
        <GlobalContext.Provider value={{value:value, setValue: setValue}}>
            {children}
        </GlobalContext.Provider>
    )
}