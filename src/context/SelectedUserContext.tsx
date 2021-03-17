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
        "expertise" : ["Physics"], 
        "interest" : ["Chemistry"],
        "events" : [],
    }, 
    "last_ip": "", 
    "last_login": "", 
    "logins_count": 0,
    "app_metadata" : {
        "isAdmin" : false
    }
}
export const SelectedUserContext = createContext({
    data : dataDefaultValue,
    setData : (user : Auth0user) => {}, 
    edit : false, 
    setEdit : (user : boolean) => {}
});

export const SelectedUserContextProvider : React.FC = ({children}) => {
    const [data, setData] = useState<Auth0user>(dataDefaultValue)
    const [edit, setEdit] = useState(false)

    return(
        <SelectedUserContext.Provider value={{data, setData, edit, setEdit}}>
            {children}
        </SelectedUserContext.Provider>
    )
}