import { Avatar, Box, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputBase, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0userList from './models/Auth0userList';
import SearchIcon from '@material-ui/icons/Search';
import { Pagination } from '@material-ui/lab';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

function SearchUsers() {
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currPage, setCurrPage] = useState(1); 
    const [theArray, setTheArray] = useState<string[]>([]);

    
      function handleChange (checkbocName: string, state: boolean) {
        if (state === true){
            setTheArray(theArray => [...theArray, checkbocName])
        } else {
            const result = theArray.filter(dep => dep !== `${checkbocName}`);
            setTheArray(result); 
        }
      }

    useEffect(() => {
        fetchData();
    },[searchTerm,currPage,theArray]);


    async function fetchData(){
        
        let filter = "ALL"; 

        if (theArray.length > 0){
            filter = ""; 
            for (var i = 0; i < theArray.length; i++) {
                if (i === 0){
                  filter = filter.concat('user_metadata.department:"' + theArray[i] + '"')
                }else {
                  filter = filter.concat( ' OR user_metadata.department:"' + theArray[i] + '"')
                }
            }
        }

        if (searchTerm.length >=2 ){
            let sex = ""
            if (theArray.length > 0){
                sex = "name:*" + searchTerm + "* AND "+ filter; 
            }else {
                sex = "name:*" + searchTerm + "*"; 
            }
            console.log("Request before sending :"); 
            console.log(`http://localhost:5000/api/users/search/${sex}/${currPage - 1}`);
            const response = await fetch(`http://localhost:5000/api/users/search/${sex}/${currPage - 1}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10))

        } else {
            console.log(`http://localhost:5000/api/users/page/${currPage - 1}/${filter}`); 
            const response = await fetch(`http://localhost:5000/api/users/page/${currPage - 1}/${filter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10))
        }
    }


    const useStyles = makeStyles({
        box: {
          textAlign: 'center', 
          padding : 4,
          borderRadius : 4,
          background : "white", 
        }, 
        search : {
            display: 'inline-flex',
            VerticalAlign: 'text-bottom',
            BoxSizing: 'inherit',
            textAlign: 'center',
            AlignItems: 'center', 
        },
        inputbase : {
        }, 
        large: {
            width: 90, 
            height: 90, 
        },
        form: {
            fontFamily : "Open Sans, sans-serif", 
        },
    });

    const classes = useStyles();

    return (
        <div>
            <Grid container style={{ background: "#ebebeb"}}>
            <Grid xs={12}> 
                <Box mx="25vw" my={7} className={classes.box}>
                    <Grid container direction="row" alignItems="center">
                        <Grid container>
                            <div style={{ display: "flex" , width : "100%" }}>
                                <SearchIcon fontSize={"large"}/>
                                <InputBase fullWidth={true} className={classes.inputbase} placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                            </div>
                        </Grid>
                    </Grid>
                </Box> 
            </Grid>
            </Grid>

        <Container style={{ maxWidth: "1500px"}}>
            <Grid container >
                <Grid item lg={4} > 
                    <Box m={5}>
                    <FormControl component="fieldset"> 
                    <Box style={{ display: "flex" , width : "100%" }} m="auto" fontFamily="Roboto" p={3} fontWeight="fontWeightLight"fontSize={35}>  Refine</Box>

                    <Box style={{ display: "flex" , width : "100%" }} m="auto" fontFamily="Roboto" p={3} fontWeight="fontWeightLight" fontSize={30} > <AssignmentIndIcon  fontSize={"large"} /> Departments</Box>
                    
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary" >University of Sussex Business School</Typography>} />

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Education and Social Work</Typography>} />    

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Engineering and Informatics</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Global Studies</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Law, Policitics and Sociology</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Life Sciences</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("enginf", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Mathematical and Physical Sciences</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("sci", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Media, Arts and Humanities</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("psych", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Psychology</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("psych", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">Brighton and Sussex Medical School</Typography>}/>
                    </FormGroup> </FormControl>  
                    </Box>
                </Grid>
                <Grid item lg={8} > 
                    <Box ml={4} mt={15}>
                        {data ? data.users.map( e => (
                            <Grid container direction="row" alignItems="center" style={{ borderBottom: "1px solid #D3D3D3"}}>
                                <Grid container>
                                        <Box style={{ display : "flex"}} >
                                                <Box  my={6} >
                                                <Avatar alt="Cindy Baker" src={e.picture} className={classes.large} />
                                                </Box>
                                                <Box m={5} className={classes.form} style={{ display : "flex", flexDirection : "column" }} >
                                                    <Typography variant="h5"> {e.name}</Typography>
                                                    <Typography > {e.user_metadata.career_stage}  . {e.user_metadata.department}</Typography>
                                                    <Box my={2} className={classes.form} lineHeight={1} fontWeight="fontWeightLight">
                                                        {e.user_metadata.research_interests}
                                                    </Box>
                                                </Box>
                                        </Box>
                                </Grid>
                            </Grid>
                        )) : <> </>}
                    </Box>
                    <Pagination 
                    count={Pagetotal} 
                    color="primary" 
                    page={currPage}
                    onChange={(event, page) => setCurrPage(page)}
                    />
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default SearchUsers

