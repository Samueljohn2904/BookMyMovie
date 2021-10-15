import React, { useEffect, useState} from 'react';
import { Fragment } from 'react';
import Header from '../../common/header/Header';
import './home.css'
import GridList from "@material-ui/core/GridList";
import Button from '@material-ui/core/Button'; 
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import image1 from '../../assets/logo.svg';
import { FormControl, OutlinedInput, TextField, Typography } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';


const Home = function() {

    const movieUrl = "http://localhost:8085/api/v1/movies";
    const artistUrl = "http://localhost:8085/api/v1/artists";
    const genreUrl = "http://localhost:8085/api/v1/genres";

    const [imageList, setImageList] = useState([{}]);
    const [releasedImageList, setreleasedImageList] = useState([{}]);
    let [filteredImageList, setFilterImageList] = useState([{}]);
    const [genreList, setGenreList] = useState([{}]);
    const [artistList, setArtistList] = useState([{}]);
    const [filterState, setFilterState] = useState({
        filterMovieName:"",
        genre:[],
        artist:[],
        releaseStartDate:"",
        releaseEndDate:""
    });

    const loadArtist = async function(artistUrl){
        try{
            const rawResponse = await fetch(artistUrl,{
                method:'GET'
            })
            if(rawResponse.ok){
                const result = await rawResponse.json();
                setArtistList(result.artists);
                console.log(result.artists);
            }
            else{
                throw new Error();
            }
        }catch(e){
        console.log(e.message);
        }       
    }

    const loadGenre = async function(genreUrl){
        try{
            const rawResponse = await fetch(genreUrl,{
                method:'GET'
            })
            if(rawResponse.ok){
                const result = await rawResponse.json();
                setGenreList(result.genres);
                console.log(result.genres);
            }
            else{
                throw new Error();
            }
        }catch(e){
        console.log(e.message);
        }       
    }

    const loadImage = async function(movieUrl){
        try{
        const rawResponse = await fetch(`${movieUrl}?status=PUBLISHED`,{
            method:'GET'
        })
        if(rawResponse.ok){
            const result = await rawResponse.json();
            setImageList(result.movies);
            console.log(result.movies);
        }
        else{
            throw new Error();
        }
    }catch(e){
        console.log(e.message);
    }       
    }

    const loadReleasedImage = async function(movieUrl){
        try{
        const rawResponse = await fetch(`${movieUrl}status=RELEASED`,{
            method:'GET'
        })
        if(rawResponse.ok){
            const result = await rawResponse.json();
            setreleasedImageList(result.movies);
            setFilterImageList(result.movies);
            console.log(result.movies);
        }
        else{
            throw new Error();
        }
    }catch(e){
        console.log(e.message);
    }       
    }

    const inputChangehandler = function(e){
        const currState = filterState;
        currState[e.target.name] = e.target.value;
        setFilterState({...currState});
        console.log(filterState)
    }

    const handleSelectorChange = (event) => {
        const currState = filterState;
        const {
          target: { value },
        } = event;
          // On autofill we get a the stringified value.
          currState[event.target.name]= typeof value === 'string' ? value.split(',') : value,
          setFilterState({...currState});

      };
    

    useEffect(()=>{
       loadImage(movieUrl);
       loadArtist(artistUrl);
       loadGenre(genreUrl);
       loadReleasedImage(movieUrl+"?");
    },[])

    const handleImageClick = function(e){
        console.log("You clicked the image", e.key);
    }

    const filterHandler = function(){

        let filterurl = movieUrl+"?";
        if(filterState.filterMovieName!==""){
            filterurl = `${filterurl}title=${filterState.filterMovieName}&`;
        }
        if(filterState.genre.length!==0){
            filterurl = `${filterurl}genre=${filterState.genre.toString()}&`;
        }
        if(filterState.artist.length!==0){
            let artistString = filterState.artist.toString();
            artistString = artistString.replace(/\s+/g, '');
            filterurl = `${filterurl}artists=${artistString}&`;
        }
        if(filterState.releaseStartDate!==""){
            filterurl = `${filterurl}start_date=${filterState.releaseStartDate}&`;
        }
        if(filterState.releaseEndDate!==""){
            filterurl = `${filterurl}end_date=${filterState.releaseEndDate}&`;
        }
        console.log(filterurl);
        loadReleasedImage(filterurl);

        if(filterState.filterMovieName==="" && filterState.artist.length===0 && filterState.genre.length===0 && filterState.releaseStartDate===""
            && filterState.releaseEndDate===""){
                filteredImageList = releasedImageList;
                setFilterImageList(filteredImageList);
            }
     }

    const {filterMovieName,genre,artist, releaseStartDate, releaseEndDate} = filterState;

    return(
        <Fragment>
        <Header headerName="Home Page"/>
        <div className="heading">
            <span>Upcoming Movies</span>
        </div>
        <div className="upcoming-movies-section">
            <GridList cellHeight={250} cols={6} style={{display:'flex', flexDirection: "row", flexWrap: "nowrap", overflowX: "scroll"}}>
                {imageList.map(image => (
                    <GridListTile key={image.id}>
                        <img className={image.title} src={image.poster_url} alt={image.title} />
                        <GridListTileBar style={{color:"white"}} title={image.title}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
        <div className="released-movie">
            <div className="released-movie-section">
                <GridList cellHeight={350} cols={4} style={{display:'flex', flexDirection: "row", flexWrap: "wrap"}}>
                    {filteredImageList.map(image => (
                        <GridListTile key={image.id} style={{margin:"16px", cursor:"pointer"}} onClick={handleImageClick} >
                            <img className={image.title} src={image.poster_url} alt={image.title} />
                            <GridListTileBar style={{color:"white"}} title={image.title} subtitle={`Release Date: ${image.release_date}`}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="filter-section">
                <Card variant="outlined">
                    <Typography color="primary" style={{margin:"10px"}}>FIND MOVIES BY:</Typography>
                    <FormControl className="form-control" style={{background:"white"}}> 
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                                <TextField id="movieName" label="Movie Name" type="text" onChange={inputChangehandler} value={filterMovieName} name="filterMovieName" style={{maxWidth:"240px", minWidth:"240px"}}></TextField>
                        </CardContent>
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                        <FormControl>
                            <InputLabel variant="standard" id="genre-selector" style={{display:"block",width:"100%"}}>   Genres</InputLabel>
                                <Select
                                    id="genre-selector"
                                    multiple="true"
                                    value={genre}
                                    onChange={handleSelectorChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    name="genre"
                                    style={{maxWidth:"240px", minWidth:"240px"}}
                                    >
                                    {genreList.map((item) => (
                                        <MenuItem key={item.genre} value={item.genre}>
                                        <Checkbox checked={genre.indexOf(item.genre) > -1} />
                                        <ListItemText primary={item.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                        </CardContent>
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                        <FormControl>
                            <InputLabel variant="standard" id="artist-selector" style={{display:"block",width:"100%"}}>   Artists</InputLabel>
                                <Select
                                    id="artist-selector"
                                    multiple="true"
                                    value={artist}
                                    onChange={handleSelectorChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    name="artist"
                                    style={{maxWidth:"240px", minWidth:"240px"}}
                                    >
                                    {artistList.map((item) => (
                                        <MenuItem key={item.id} value={`${item.first_name} ${item.last_name}`}>
                                        <Checkbox checked={artist.indexOf(`${item.first_name} ${item.last_name}`) > -1} />
                                        <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                                        </MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                        </CardContent>
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                                <TextField id="releaseStartDate" label="Release Date Start" type="date" onChange={inputChangehandler} value={releaseStartDate} name="releaseStartDate" InputLabelProps = {{shrink:true}} style={{maxWidth:"240px", minWidth:"240px"}}></TextField>
                        </CardContent>
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                                <TextField id="releaseEndDate" label="Release Date End" type="date" onChange={inputChangehandler} value={releaseEndDate} name="releaseEndDate" InputLabelProps = {{shrink:true}} style={{maxWidth:"240px", minWidth:"240px"}}></TextField>
                        </CardContent>
                        <CardContent style={{maxWidth:"240px", minWidth:"240px", margin:"2px"}}>
                            <Button variant="contained" color="primary" style={{marginTop:"8px", maxWidth:"240px", minWidth:"240px"}} onClick={filterHandler}>Apply</Button>
                        </CardContent>
                    </FormControl>
                    </Card>
                    </div>
        </div>
        </Fragment>
    )
}

export default Home;