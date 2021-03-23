import ExtensionIcon from '@material-ui/icons/Extension';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, ButtonBase, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Hidden, IconButton, InputBase, Paper, Switch, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Auth0userList from './models/Auth0userList';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete, AutocompleteChangeReason, Pagination } from '@material-ui/lab';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SchoolIcon from '@material-ui/icons/School';
import { Link } from 'react-router-dom';
import Tags from './config/Tags.json'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from './theme';
import SearchTheme from './themes/SearchTheme';
import AntSwitch from './components/AntSwitch';

const JsonFind = require('json-find');

function SearchUsers() {
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currPage, setCurrPage] = useState(1); 
    const [DepArray, setDepArray] = useState<string[]>([]);
    const [CareerStage, setCareerStage] = useState<string[]>([]);
    const [tags, setTags] = useState(true)
    const [checked, setChecked] = useState(false);
    const [tagsArray, setTagsArray] = useState<string[]>([]); 
    const [newArr, setnewArr] = useState<string[]>([]); 
    const [IncludeAll, setIncludeAll] = useState(false); 

      function handleChangeCareer (checkbocName: string, state: boolean) {
        if (state === true){
            setCareerStage(theArray => [...theArray, checkbocName])
        } else {
            const result = CareerStage.filter(dep => dep !== `${checkbocName}`);
            setCareerStage(result); 
        }
      }

      function handleChange (checkbocName: string, state: boolean) {
        if (state === true){
            setDepArray(theArray => [...theArray, checkbocName])
        } else {
            const result = DepArray.filter(dep => dep !== `${checkbocName}`);
            setDepArray(result); 
        }
      }

      const Subjects = [
        { Subject: 'Computer Stuff'},
        { Subject: 'Natural Language Engineering'},
        { Subject: 'Data Structures and Algorithms'},
        { Subject: 'Chemistry'},
        { Subject: 'Computer Stuff'},
        { Subject: 'Physics'},
      ];
      
    useEffect(() => {
        fetchData();
    },[searchTerm,currPage,DepArray, tagsArray, checked, IncludeAll, CareerStage]);





    function checkChildTagsTwo(Term : String){
        const keyify : any = (obj : any, prefix = '') => 

            Object.keys(obj).reduce((res :any, el) => {
                if( Array.isArray(obj[el]) ) {
                } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
                    return [...res, ...keyify(obj[el], prefix + el + '.')];
                }
                    return [...res, prefix + el];
            }, []);

        const result = keyify(JsonFind(Tags).checkKey(Term));
        const arr = result.map( (val : string) => { return ( val.split(".").map( (item) => { return item}))})
        const subjectList = ([].concat.apply([], arr))
        return subjectList; 
    }

    function testFunction(filter: string, arr: string[], cond: string ){
        for (var i = 0; i < arr.length; i++) {
            if (i === 0){
                filter = filter.concat(`user_metadata.${cond}:"` + arr[i] + '"')
            }else {
                filter = filter.concat( ` OR user_metadata.${cond}:"` + arr[i] + '"')
            }
        }
        console.log(filter);
        return filter;
    }


    async function fetchData(){

        const DepFilter = DepArray.length > 0 ? testFunction("",DepArray,"education.school") : "";
        const careerFilter = CareerStage.length > 0 ? testFunction("",CareerStage,"education.CareerStage") : "";
        
        var SidebarFilterOptions = "";
        if (DepFilter.length > 0 && careerFilter.length > 0){
            SidebarFilterOptions = DepFilter + " AND " + careerFilter; 
        }else if (DepFilter.length > 0){
            SidebarFilterOptions = DepFilter; 
        } else if (careerFilter.length > 0){
            SidebarFilterOptions = careerFilter;
        }

        // Default no filter options have been set
        if (searchTerm.length < 2 && SidebarFilterOptions.length === 0 && tagsArray.length === 0){
            console.log(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/ALL`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/ALL`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 
        }

        tags ? NameSearch(SidebarFilterOptions) : TagSearch(SidebarFilterOptions)     
    }


    async function TagSearch(filter : string ){
        //Block for Tag-based search
        if (tagsArray.length > 0 && filter !== ""){
            let tagfilter = ""
            
            checked ? tagfilter = testFunction("",tagsArray,"interest")  :  tagfilter = testFunction("",tagsArray,"expertise")

            if (IncludeAll){
                if (checked){
                    for (var i = 0; i < newArr.length; i++) {
                        tagfilter = tagfilter.concat(' OR user_metadata.interest:"' + newArr[i] + '"')
                    }
                }else {
                    for (var i = 0; i < newArr.length; i++) {
                        tagfilter = tagfilter.concat(' OR user_metadata.interest:"' + newArr[i] + '"')
                    }
                }
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/${tagfilter} AND ${filter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 

        } else if (tagsArray.length > 0){
            let tagfilter = ""
            checked ? tagfilter = testFunction("",tagsArray,"interest")  :  tagfilter = testFunction("",tagsArray,"expertise");

            if (IncludeAll){
                if (checked){
                    for (var i = 0; i < newArr.length; i++) {
                        tagfilter = tagfilter.concat(' OR user_metadata.interest:"' + newArr[i] + '"')
                    }
                }else {
                    for (var i = 0; i < newArr.length; i++) {
                        tagfilter = tagfilter.concat(' OR user_metadata.interest:"' + newArr[i] + '"')
                    }
                }
            }
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/${tagfilter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 
        } else {
                console.log(filter); 
                const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/${filter}`);
                const data : Auth0userList = await response.json();
                setData(data);
                setPagetotal(Math.ceil(data.total/10));    
        }
    }

    async function NameSearch(filter : string){

        if (searchTerm.length > 2){
            let FinalQuery = ""; 
            if (DepArray.length > 0){
                FinalQuery = "name:*" + searchTerm + "* AND "+ filter; 
            }else {
                FinalQuery = "name:*" + searchTerm + "*"; 
            }
            
            console.log(`${process.env.REACT_APP_API_URL}/UserSearch/Search/${FinalQuery}/${currPage - 1}`); 
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Search/${FinalQuery}/${currPage - 1}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 

        }

        if (searchTerm.length < 2 && filter.length === 0 && tagsArray.length === 0){
            console.log(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/ALL`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/ALL`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 

        } else if (searchTerm.length < 2){
            console.log(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/${filter}`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Page/${currPage - 1}/${filter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/10)); 
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


    const classes = SearchTheme(); 

    return (
        <Grid container>
            <Grid container justify="center" className={classes.color}>                    
                    <Paper component="form" className={classes.root}>
                        {tags ?
                        <>
                            <InputBase
                              className={classes.input}
                              placeholder="Search"
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              inputProps={{ 'aria-label': 'Search' }} 
                              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                             />
                            <IconButton disabled className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <ButtonBase onClick={Changetag} className={classes.iconButton} aria-label="directions">
                                    <LabelIcon/>
                            </ButtonBase>
                        </>
                        :
                        <>
                            <Autocomplete
                                multiple fullWidth onChange={(event, value, reason) => addtoState(value, reason)}
                                limitTags={2}
                                className={classes.input} options={Subjects}
                                getOptionLabel={(option) => option.Subject}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" size="small" placeholder="Search Tags" />
                                )}
                            />
                            <IconButton disabled className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <ButtonBase onClick={Untag}  className={classes.iconButton} aria-label="directions">
                                    <LabelOffIcon/>
                            </ButtonBase>
                        </>
                        }
                    </Paper>

                    {tags ?  " " : 
                        <Grid container justify="center"> 
                            <>
                                <Box alignContent="flex-start">
                                <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>Expertise</Grid>
                                    <Grid item>
                                        <AntSwitch checked={checked} onChange={toggleChecked} name="checkedC" />
                                    </Grid>
                                    <Grid item>Interests</Grid>
                                </Grid>
                                </Box>
                            </>
                        </Grid>
                    }
            </Grid>

            <Grid container justify="center">

                <Grid item xs={12} lg={3}>
                
                <Grid container justify="center">

                { tags ? "" :
                    <>
                        <FormControlLabel
                        value="start"
                        control={
                            <Switch
                             checked={IncludeAll}
                             onChange={(e) => setIncludeAll(e.target.checked)}
                             name="Search"
                             inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label="Search within tag heirachy"
                        labelPlacement="start"
                        />
                        
                        
                    </>
                }
                        <Grid container justify="center">
                            <Box my={6}>


                            <Accordion
                                defaultExpanded={window.innerWidth > 800}
                                elevation={0}
                                classes={{
                                    root: classes.MuiAccordionroot
                                }}
                                className={classes.accordian}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                <Box style={{ display: "flex" , width : "100%",}} m="auto" px={1} fontSize={25} > <AssignmentIndIcon  fontSize={"large"} /> Departments </Box>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("University of Sussex Business School", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary" >University of Sussex Business School</Typography>} />
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Education and Social Work", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Education and Social Work</Typography>} />    
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Engineering and Informatics", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Engineering and Informatics</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Global Studies", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Global Studies</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Law, Politics and Sociology", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Law, Politics and Sociology</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Life Sciences", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Life Sciences</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Mathematical and Physical Sciences", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Mathematical and Physical Sciences</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Media, Arts and Humanities", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Media, Arts and Humanities</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("School of Psychology", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">School of Psychology</Typography>}/>
                                        <FormControlLabel control={ <Checkbox onChange={(e) => handleChange("Brighton and Sussex Medical School", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">Brighton and Sussex Medical School</Typography>}/>
                                    </FormGroup> 
                                </AccordionDetails>
                            </Accordion>

                            <Box my={2}>

                            </Box>

                            <Accordion 
                                    elevation={0}
                                    classes={{
                                        root: classes.MuiAccordionroot
                                    }}
                                className={classes.accordian}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >

                                <Box style={{ display: "flex" , width : "100%" }} m="auto" px={1} fontSize={25} > <ExtensionIcon  fontSize={"large"} /> Career Stage</Box>

                                </AccordionSummary>
                                <AccordionDetails>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("UG", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary" >UG</Typography>} />
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("MSc", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">MSc</Typography>}/>
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("PhD", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">PhD</Typography>} />    
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("Postdoc", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">Postdoc</Typography>}/>
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("Faculty", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">Faculty</Typography>}/>
                                    <FormControlLabel control={<Checkbox onChange={(e) => handleChangeCareer("Professional Services", e.target.checked)} />} label={<Typography variant="body2" color="textPrimary">Professional Services</Typography>}/>
                                </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                            </Box>
                        </Grid>


                    </Grid>
                </Grid>
                <Hidden xsDown>
                     <Grid item lg={1}>
                    </Grid>               
                </Hidden>
                <Grid item xs={11} lg={6}>
                <Grid container>
                            <Grid item> 
                                {data ? data.users.map( e => (
                                <>
                                {e.user_metadata !== null ?
                                <Grid container direction="row" alignItems="center">
                                    <Link to={`/users/${e.user_id}`} style={{ textDecoration: 'none', color : 'black' }}>
                                        <Box style={{ display : "flex"}} >
                                        <Box my={6} >
                                            <Avatar alt="Cindy Baker" src={e.picture} className={classes.large} />
                                        </Box>
                                        <Box m={5} mt={7} style={{ display : "flex", flexDirection : "column" }} >
                                            <Typography variant="h5"> {e.name}</Typography>
                                            <Grid container direction="row" alignItems="center">
                                                <Box pt={5}></Box>
                                                <Box pr={1}><SchoolIcon /></Box>  {e.user_metadata.education.school}

                                                <Box pr={3}></Box><ApartmentIcon /> {e.user_metadata.education.department}
                                            </Grid>
                                            <Box> 
                                                <Typography variant="body2">
                                                    {e.user_metadata.research} 
                                                </Typography>
                                                <Box mt={2}>
                                                    {e.user_metadata.expertise.length !== 0 ? 
                                                        <>
                                                        <Typography display="inline">Expertise</Typography> - {e.user_metadata.expertise.map(e => <Chip style={{backgroundColor:'#24CAC3', margin : 3}} label={e}></Chip>)}
                                                        </>
                                                        : <></> 
                                                    }
                                                    <Box m={1}/>
                                                    {e.user_metadata.interest.length !== 0 ? 
                                                        <>
                                                        <Typography display="inline" >Interest</Typography>  - {e.user_metadata.interest.map(e => <Chip style={{backgroundColor:'#24CAC3', margin : 3}} label={e}></Chip>)}
                                                        </>
                                                        :<></>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                        </Box>
                                        <Divider />
                                    </Link>
                                </Grid> 
                                : ""
                                }
                                </>
                                )) : <> </>}
                                
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                        <Box my={3}>
                            <Pagination 
                             count={Pagetotal} 
                             color="primary" 
                             page={currPage}
                             onChange={(event, page) => setCurrPage(page)}
                            />
                        </Box>

                        </Grid>

                </Grid>
            </Grid>
          
        </Grid>
    ); 
}

export default SearchUsers