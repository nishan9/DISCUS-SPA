interface Event {
    id: number,
    title: string,
    dateTime: Date,
    finishedDateTime : Date, 
    type: string;
    url: string;
    description: string;
    isDISCUS: boolean;
    isApproved : boolean,
    tags : string
}
export default Event;