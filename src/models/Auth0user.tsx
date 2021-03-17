interface Auth0user{
    "created_at": string,
    "email": string,
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
    "logins_count": number,
    "app_metadata" : AppMetadata
}

interface AppMetadata
{
    "isAdmin" : boolean
}

interface Identity{
    "connection": string, 
    "provider": string, 
    "user_id": number, 
    "isSocial": boolean
}

interface Metadata
{
    "social" : Social,
    "education" : Education,
    "research" : string, 
    "expertise" : string[], 
    "interest" : string[],
    "events" : number[]
}

interface Social
{
    "sussex" : string,
    "linkedIn" : string, 
}

interface Education
{
    "school" : string,
    "department" : string,
    "careerStage": string,
    "graduationDate": string,
    "available" : string,
}


export default Auth0user;  