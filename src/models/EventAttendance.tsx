

interface EventAttendance{
    "users" : EventUser[], 
    "total" : number, 
}

interface EventUser{
    "name" : string,
    "picture" : string
}
export default EventAttendance;  