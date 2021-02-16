interface user_metada{
    user_metadata : Metadata
}

interface Metadata
{
    social : Social,
    education : Education,
    research : string, 
    expertise : string[], 
    interest : string[],
}

interface Social
{
    sussex : string
}

interface Education
{
    school : string,
    department : string,
    careerStage: string,
    graduationDate: string,
    available : string,
}

export default user_metada
