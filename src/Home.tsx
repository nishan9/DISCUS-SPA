import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "./style.css";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Navbar from './Navbar';


export default function Home() {
    const {user, logout} = useAuth0();
    const [event, setEvent] = useState({title:"",date:"",eventType:"",registration:"",userId:""}); 

//    const [token, setToken] = useState("");

//    useEffect(() => {
//        async function getToken(){
//            const accessToken = await useAuth0.getAccessTokenSilently(); 
//            setToken(accessToken);
//        }
//        getToken()
//    })
//            <Button variant="contained" color="secondary" onClick={() => logout({returnTo: window.location.origin})}>Login Out</Button> 


    async function publishEvent(e:any){
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/discusEvents", {
            method:"POST", 
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(response);

        if(response.ok){
            console.log("success"); 
        }else{
            console.error("Publishing failed");
        }
    }
    
    return (
        <>
        <Navbar/>
        <div>
        <p> Dashboard </p>
        <div>
            <form>
                <label>
                    title:
                    <input type="text" name="title" onChange={(e) => setEvent({...event,title:e.target.value})}/>
                    Date:
                    <input type="text" name="date" onChange={(e) => setEvent({...event,date:e.target.value})} />
                    eventType:
                    <input type="text" name="eventType" onChange={(e) => setEvent({...event,eventType:e.target.value})}/>
                    Registration Link:
                    <input type="text" name="registration" onChange={(e) => setEvent({...event,registration:e.target.value})}/>
                    Users:
                    <input type="text" name="userId" onChange={(e) => setEvent({...event,userId:e.target.value})}/>
                </label>
                <input type="submit" onClick={(e) =>publishEvent(e)} value="Submit"/>
            </form>
        </div>
        </div>
        </>

    )
}
