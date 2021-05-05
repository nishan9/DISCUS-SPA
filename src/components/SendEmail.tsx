import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@material-ui/icons/Send';
import EmailAddress from '../models/EmailAddress'; 
import { EditEventContext } from  '../context/EditEventContext'; 
import SendMail from '../models/SendMail'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';

interface SendEmailProps{
    dialog : Function
}

function SendEmail(props : SendEmailProps) {
    const Auth0 = useAuth0();    
    const EventContext = useContext(EditEventContext);
    const [accessToken, setAccessToken] = useState("");
    const [subject, setSubject] = useState("Invitation..."); 
    const [body, setBody] = useState(""); 
    const [recipents, setrecipents] = useState<EmailAddress[]>(); 
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        getRecipents(); 
        formatter(); 
    }, [Auth0, accessToken])

    //Retrieves the relevant event information to render as the body for email. 
    async function formatter(){
        setBody(`Title = ${EventContext.event.title}\n\nURL : ${EventContext.event.url}\n\nType : ${EventContext.event.type}\n\nStart DateTime : ${EventContext.event.dateTime}\n\nFinish DateTime : ${EventContext.event.dateTime}\n\nDescription : ${EventContext.event.description}`)
    }

    // Retrieves all of the users in the system. 
    async function getRecipents(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/GetEmails`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setrecipents(await response.json())
    }

    function removeRecipents(e : any){
        setrecipents(recipents?.filter(recipent => recipent !== e))
    }

    //HTTP request to send an email with the DISCUS logo at the header
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
                    'Authorization': `Bearer ${accessToken}`, 
                    'Content-Type': 'application/json',
                }
            });
    
            if(response.ok){
                enqueueSnackbar('User has been updated', { variant : "success" });
                props.dialog(); 
            }else{
                console.error("Publishing failed");
            }
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
                                <Chip style={{backgroundColor:'#24CAC3', margin : 3}} onDelete={() => removeRecipents(e)} label={e.name}></Chip>
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
