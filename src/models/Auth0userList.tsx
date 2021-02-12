interface Auth0userList{
    "users" : Users[], 
    "total" : number, 
}

interface Users{
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
    "logins_count": number
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
    "expertise" : String[], 
    "interest" : string[]
}

interface Social
{
    "linkedin" : string,
    "sussex" : string
}

interface Education
{
    "school" : string,
    "department" : string,
    "careerStage": string,
    "graduationDate": string,
    "available" : string,
}


export default Auth0userList;  