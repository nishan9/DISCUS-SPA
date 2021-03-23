import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@material-ui/icons/Send';
import EmailAddress from '../models/EmailAddress'; 
import { EditEventContext } from  '../context/EditEventContext'; 
import SendMail from '../models/SendMail'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SendEmail() {
    const EventContext = useContext(EditEventContext)
    const [subject, setSubject] = useState("Invitation..."); 
    const [body, setBody] = useState(""); 
    const [recipents, setrecipents] = useState<EmailAddress[]>(); 

    useEffect(() => {
        getRecipents(); 
        formatter(); 
    }, [])

    async function formatter(){
        setBody(`Title = ${EventContext.event.title}\n\nURL : ${EventContext.event.url}\n\nType : ${EventContext.event.type}\n\nStart DateTime : ${EventContext.event.dateTime}\n\nFinish DateTime : ${EventContext.event.dateTime}\n\nDescription : ${EventContext.event.description}`)
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
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography> To </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {recipents?.map (e => 
                            <>
                                <Chip style={{backgroundColor:'#24CAC3', margin : 3}} label={e.name}></Chip>
                            </>)
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Box my={3}>
                    <TextField variant="outlined"  label="Subject" value={subject} onChange={e => setSubject(e.target.value)}></TextField>
                </Box>

                <TextField
                    value={body} 
                    variant="outlined" 
                    label="Body" 
                    multiline
                    fullWidth={true}
                    rows={10}
                    onChange={e => setBody(e.target.value)}>
                </TextField>

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={sendEmail}><SendIcon/>Send</Button>
                </Box>

            </Box>
        </div>
    )
}

export default SendEmail
