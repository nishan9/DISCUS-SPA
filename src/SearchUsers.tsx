import { Avatar, Box, Button, Checkbox, Chip, Container, FormControl, FormControlLabel, FormGroup, Grid, InputBase, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0userList from './models/Auth0userList';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete, Pagination } from '@material-ui/lab';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import TagSystem from './TagSystem';

function SearchUsers() {
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currPage, setCurrPage] = useState(1); 
    const [DepArray, setDepArray] = useState<string[]>([]);
    const [tags, setTags] = useState(true)
    const [tagsArray, setTagsArray] = useState<String[]>([]); 

      function handleChange (checkbocName: string, state: boolean) {
        if (state === true){
            setDepArray(theArray => [...theArray, checkbocName])
        } else {
            const result = DepArray.filter(dep => dep !== `${checkbocName}`);
            setDepArray(result); 
        }
      }

    useEffect(() => {
        fetchData();
    },[searchTerm,currPage,DepArray, tagsArray]);

    async function fetchData(){
        
        let filter = "ALL"; 

        if (DepArray.length > 0){
            filter = ""; 
            for (var i = 0; i < DepArray.length; i++) {
                if (i === 0){
                  filter = filter.concat('user_metadata.department:"' + DepArray[i] + '"')
                }else {
                  filter = filter.concat( ' OR user_metadata.department:"' + DepArray[i] + '"')
                }
            }
        }

        if (searchTerm.length > 2){
            let FinalQuery = ""

            if (DepArray.length > 0){
                FinalQuery = "name:*" + searchTerm + "* AND "+ filter; 
            }else {
                FinalQuery = "name:*" + searchTerm + "*"; 
            }
            const response = await fetch(`https://localhost:5001/UserSearch/Search/${FinalQuery}/${currPage - 1}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10))

        } else if (tagsArray.length > 0){
            let tagfilter = ""
            for (var i = 0; i < tagsArray.length; i++) {
                if (i === 0){
                    tagfilter = tagfilter.concat('user_metadata.tags:"' + tagsArray[i] + '"')
                }else {
                    tagfilter = tagfilter.concat( ' AND user_metadata.tags:"' + tagsArray[i] + '"')
                }
            }
            const response = await fetch(`https://localhost:5001/UserSearch/Search/${tagfilter}/${currPage - 1}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10))
        }
        
        
        else {
            const response = await fetch(`https://localhost:5001/UserSearch/Page/${currPage - 1}/${filter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10))
        }
    }

        
    function Changetag(){
        setTags(false)
    }
    function Untag(){
        setTags(true);
    }


    function addtoState(value : { Subject : string}[]){
        setTagsArray(value.map ( x => x.Subject)); 
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

                                {tags ?                                
                            <div style={{ display: "flex" , width : "100%" }}>
                            <SearchIcon fontSize={"large"}/>
                                <InputBase fullWidth={true} className={classes.inputbase} placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/> 
                                <Button onClick={Changetag}>
                                    <LabelOffIcon color={"error"} fontSize={"large"}/>
                                </Button>
                                </div>
                                :
                                <div style={{ display: "flex" , width : "100%" }}>
                                                                <SearchIcon fontSize={"large"}/>

                                    <Autocomplete
                                        multiple
                                        onChange={(event, value, reason) => addtoState(value)}
                                        id="multiple-limit-tags"
                                        options={Subjects}
                                        getOptionLabel={(option) => option.Subject}
                                        renderInput={(params) => (
                                        <TextField {...params} variant="outlined" placeholder="Tags" />
                                        )}
                                    />
                                <Button onClick={Untag}>

                                    <LabelIcon color={"error"} fontSize={"large"}/>
                                </Button>
                                </div>
                                }

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
                                                        <Box my={2}>
                                                        {e.user_metadata.tags.map(e => <Chip label={e}></Chip>)}
                                                        </Box>

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
const Subjects = [
    { Subject: 'Computer Stuff'},
    { Subject: 'Natural Language Engineering'},
    { Subject: 'Mathematics'},
    { Subject: 'Julie'},
  ];

export default SearchUsers

