import { Avatar, Box, Button, Checkbox, Chip, Container, FormControl, FormControlLabel, FormGroup, Grid, InputBase, makeStyles, Switch, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0userList from './models/Auth0userList';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete, AutocompleteChangeReason, Pagination } from '@material-ui/lab';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SchoolIcon from '@material-ui/icons/School';
import { Link } from 'react-router-dom';
import { TagSystem } from './TagSystem';
const JsonFind = require('json-find');


function SearchUsers() {
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currPage, setCurrPage] = useState(1); 
    const [DepArray, setDepArray] = useState<string[]>([]);
    const [tags, setTags] = useState(true)
    const [checked, setChecked] = useState(false);
    const [tagsArray, setTagsArray] = useState<String[]>([]); 
    const [newArr, setnewArr] = useState<String[]>([]); 
    const [IncludeAll, setIncludeAll] = useState(false); 

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
    },[searchTerm,currPage,DepArray, tagsArray, checked, IncludeAll]);


    function checkChildTagsTwo(Term : String){
        const keyify : any = (obj : any, prefix = '') => 

            Object.keys(obj).reduce((res :any, el) => {
                if( Array.isArray(obj[el]) ) {
                } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
                    return [...res, ...keyify(obj[el], prefix + el + '.')];
                }
                    return [...res, prefix + el];
            }, []);

        const result = keyify(JsonFind(TagSystem).checkKey(Term));
        const arr = result.map( (val : string) => { return ( val.split(".").map( (item) => { return item}))})
        const subjectList = ([].concat.apply([], arr))
        return subjectList; 
    }


    async function fetchData(){
        
        let filter = "ALL"; 
        if (DepArray.length > 0){
            filter = ""; 
            for (var i = 0; i < DepArray.length; i++) {
                if (i === 0){
                  filter = filter.concat('user_metadata.education.School:"' + DepArray[i] + '"')
                }else {
                  filter = filter.concat( ' OR user_metadata.education.department:"' + DepArray[i] + '"')
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
            if (checked === true){
                //Interests 
                for (var i = 0; i < tagsArray.length; i++) {
                    if (i === 0){
                        tagfilter = tagfilter.concat('user_metadata.interest:"' + tagsArray[i] + '"')
                    }else {
                        tagfilter = tagfilter.concat(' AND user_metadata.interset:"' + tagsArray[i] + '"')
                    }
                }
            }else {
                //Expertise
                for (var i = 0; i < tagsArray.length; i++) {
                    if (i === 0){
                        tagfilter = tagfilter.concat('user_metadata.expertise:"' + tagsArray[i] + '"')
                    }else {
                        tagfilter = tagfilter.concat(' AND user_metadata.expertise:"' + tagsArray[i] + '"')
                    }
                }
            }

            let newstring = ""
            if (IncludeAll === true){
                if (checked === true){
                    newstring = newstring.concat(' OR user_metadata.interest:"' + newArr[i] + '"')
                } 
                else{
                    for (var i = 0; i < newArr.length; i++) {
                        newstring = newstring.concat(' OR user_metadata.expertise:"' + newArr[i] + '"')
                    }
                }
            }

            tagfilter = tagfilter.concat(newstring)
            console.log(tagfilter); 

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

    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };

    function addtoState(value : { Subject : string}[], reason : AutocompleteChangeReason){
        let newTags : string [] = []; 
        value.map( x => {
            const tempArr : string []= checkChildTagsTwo(x.Subject); 
            tempArr.map( item => newTags.push(item))
        })
        setnewArr(newTags); 
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
                                        fullWidth
                                        onChange={(event, value, reason) => addtoState(value, reason)}
                                        id="multiple-limit-tags"
                                        options={Subjects}
                                        getOptionLabel={(option) => option.Subject}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" placeholder="Add Tags" />
                                        )}
                                    />

                                <Button onClick={Untag}>
                                    <LabelIcon color={"error"} fontSize={"large"}/>
                                </Button>
                                </div>
                                }

                        </Grid>
                        {tags ?  " " :      
                        <div style={{ background: "#ebebeb", width : "100%"}}>
                            <Box alignContent="flex-start">
                                <Typography display="inline">Expertise</Typography>
                                    <FormControlLabel
                                        control={<Switch checked={checked} onChange={toggleChecked} />}
                                        label="Interest"
                                    />
                                <Typography display="inline">Include All</Typography>
                                <Checkbox 
                                       checked={IncludeAll}
                                        onChange={(e) => setIncludeAll(e.target.checked)}
                                        />
                            </Box>
                        </div>
}
                  
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
                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("University of Sussex Business School", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary" >University of Sussex Business School</Typography>} />

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Education and Social Work", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Education and Social Work</Typography>} />    

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Engineering and Informatics", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Engineering and Informatics</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Global Studies", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Global Studies</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Law, Policitics and Sociology", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Law, Policitics and Sociology</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Life Sciences", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Life Sciences</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Mathematical and Physical Sciences", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Mathematical and Physical Sciences</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Media, Arts and Humanities", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Media, Arts and Humanities</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("School of Psychology", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">School of Psychology</Typography>}/>

                        <FormControlLabel control={<Checkbox onChange={(e) => handleChange("Brighton and Sussex Medical School", e.target.checked)} />}
                        label={<Typography variant="body2" color="textPrimary">Brighton and Sussex Medical School</Typography>}/>
                    </FormGroup> </FormControl>  
                    
                    </Box>
                </Grid>
                <Grid item lg={8} > 
                    {tags ? 
                    <p> </p>
                    : 
                    <Box>
                    </Box> 
                    }
                    <Box ml={4} mt={15}>

                        {data ? data.users.map( e => (
                            <Grid container direction="row" alignItems="center" style={{ borderBottom: "1px solid #D3D3D3"}}>
                                <Grid container>
                                <Link to={`/users/${e.user_id}`} style={{ textDecoration: 'none' }}>

                                        <Box style={{ display : "flex"}} >
                                                    <Box  my={6} >
                                                        <Avatar alt="Cindy Baker" src={e.picture} className={classes.large} />
                                                    </Box>
                                                <Box m={5} className={classes.form} style={{ display : "flex", flexDirection : "column" }} >
                                                    <Typography variant="h5"> {e.name}</Typography>
                                                <Grid container direction="row" alignItems="center">
                                                <Box pt={5}></Box>
                                                <Box pr={1}><SchoolIcon /></Box>  {e.user_metadata.education.school}
                                                <Box pr={3}></Box><ApartmentIcon /> {e.user_metadata.education.department}
                                                </Grid>

                                                    <Box my={2} className={classes.form} lineHeight={1} fontWeight="fontWeightLight">
                                                        {e.user_metadata.research}
                                                        <Box my={2}>
                                                            <Typography>Expertise</Typography> - {e.user_metadata.expertise.map(e => <Chip label={e}></Chip>)}
                                                            <Typography>Interest</Typography>  - {e.user_metadata.interest.map(e => <Chip label={e}></Chip>)}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                        </Box>
                                        </Link>
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
    { Subject: 'Julie'},
  ];

export default SearchUsers