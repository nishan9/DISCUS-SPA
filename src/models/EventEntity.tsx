interface Event {
    id: number,
    title: string,
    dateTime: string,
    finishedDateTime : string, 
    type: string;
    url: string;
    description: string;
    isDISCUS: boolean;
    isApproved : boolean,
    tags : string
}
export default Event;