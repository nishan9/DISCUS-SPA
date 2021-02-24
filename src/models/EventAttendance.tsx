interface EventAttendance
{
    "users" : EventUser[], 
    "total" : number, 
    "user_metadata": ExpertiseInterests, 
}

interface EventUser
{
    "name" : string,
    "picture" : string, 
    "email" : string,
}

interface ExpertiseInterests
{
    "expertise" : string[], 
    "interest" : string[],
}
export default EventAttendance;  