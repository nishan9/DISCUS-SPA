import React, {createContext, useState} from 'react';
import Auth0user from '../models/Auth0user';

const dataDefaultValue : Auth0user = {
    "created_at": "",
    "email": "",
    "email_verified": false,
    "identities": [{
        "connection": "", 
        "provider": "", 
        "user_id": 0, 
        "isSocial": false
    }], 
    "name": "",
    "nickname": "", 
    "picture": "",
    "updated_at": "", 
    "user_id": "", 
    "user_metadata": {
        "social" : {
            "sussex" : "",
            "linkedIn" : "", 
        },
        "education" : {
            "school" : "",
            "department" : "",
            "careerStage": "",
            "graduationDate": "",
            "available" : "",
        },
        "research" : "", 
        "expertise" : [], 
        "interest" : [],
        "events" : [],
    }, 
    "last_ip": "", 
    "last_login": "", 
    "logins_count": 0,
    "app_metadata" : {
        "isAdmin" : false
    }
}
//Context API for the primary user logged-in
export const Auth0Context = createContext({
    data : dataDefaultValue,
    setData : (user : Auth0user) => {}, 
    edit : false, 
    setEdit : (user : boolean) => {}
});

export const Auth0ContextProvider : React.FC = ({children}) => {
    const [data, setData] = useState<Auth0user>(dataDefaultValue)
    const [edit, setEdit] = useState(false)

    return(
        <Auth0Context.Provider value={{data, setData, edit, setEdit}}>
            {children}
        </Auth0Context.Provider>
    )
}