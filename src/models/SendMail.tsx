import EmailAddress from "./EmailAddress";

interface SendMail{
    "recipients" : EmailAddress[], 
    "subject" : string,
    "body" : string
}

export default SendMail
