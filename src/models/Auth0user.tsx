interface Auth0user{
    "created_at": string,
    "email": "test@email.com",
    "email_verified": boolean,
    "identities": Identity[], 
    "name": string,
    "nickname": string, 
    "picture": string,
    "updated_at": string, 
    "user_id": string, 
    "user_metadata": Metadata, 
    "last_ip": string, 
    "last_login": string, 
    "logins_count": number
}

interface Identity{
    "connection": string, 
    "provider": string, 
    "user_id": number, 
    "isSocial": boolean
}

interface Metadata{
    "sussex": string, 
    "linkedin": string, 
    "career_stage" : string, 
    "school" : string
    "department": string, 
    "research_interests" : string 
}


export default Auth0user;  