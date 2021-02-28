import { Box, Button, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@material-ui/icons/Send';
import EmailAddress from '../models/EmailAddress'; 
import { EditEventContext } from  '../context/EditEventContext'; 
import SendMail from '../models/SendMail'; 

function SendEmail() {
    const EventContext = useContext(EditEventContext)
    const [to, setTo] = useState(""); 
    const [subject, setSubject] = useState("Invitation..."); 
    const [body, setBody] = useState(""); 
    const [recipents, setrecipents] = useState<EmailAddress[]>(); 
    useEffect(() => {
        getRecipents(); 
        formatter(); 
    }, [])

    async function formatter(){
        setBody(`Title = ${EventContext.event.title}\nURL = ${EventContext.event.url}\nType = ${EventContext.event.type}\nStart DateTime = ${EventContext.event.dateTime}\nFinish DateTime = ${EventContext.event.dateTime}\nDescription = ${EventContext.event.description}`)
    }

    async function getRecipents(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/GetEmails`, { 
            headers: {
              'Content-Type': 'application/json',
            }
        });
        setrecipents(await response.json())
    }

    async function sendEmail(){
        if (recipents !== undefined){
            let message; 
            message = "<center> <img src='http://avantehealth.co.uk/discus.png'  width='100' height='100' /> </center> <br> <br>" + body.replace(/\n/g, "<br />") 
            const sendObj : SendMail = {
                "recipients" : recipents, 
                "body" : message, 
                "subject" : subject, 
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/SendEmail`, { 
                method:"POST", 
                body: JSON.stringify(sendObj),
                headers: {
                  'Content-Type': 'application/json',
                }
            });
    
            if (response.ok){
                (alert("sentt")); 
            }; 
        }
    }

    return (
        <div>
            <Box m={3}>
                <Typography> To </Typography>
                {recipents?.map (e => 
                    <>
                    <Box m={2}>
                        <Typography>{e.name}</Typography>
                    </Box>
                    </>)
                }
                <Box my={5}>
                    <Typography> Subject </Typography>
                </Box>
                    <TextField variant="outlined"  value={subject} onChange={e => setSubject(e.target.value)}></TextField>
                <Typography > Body </Typography>
                    <TextField
                        value={body} 
                        variant="outlined" 
                        multiline
                        fullWidth={true}
                        rows={10}
                        onChange={e => setBody(e.target.value)}>
                    </TextField>
                <Button onClick={sendEmail}><SendIcon/></Button>
            </Box>
        </div>
    )
}

export default SendEmail
