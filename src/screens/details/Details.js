import React, { Fragment, useEffect, useState} from 'react';
import Header from '../../common/header/Header';
import './details.css';
import Button from '@material-ui/core/Button'; 
import { Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

const Details = function(props){

    const movieUrl = 'http://localhost:8085/api/v1/movies/';

    const [movieData,setMovieData] = useState({
        artists:[],
        censor_board_rating:"",
        duration:"",
        genres:[],
        id:"",
        poster_url:"",
        rating:"",
        release_date:"",
        status:"",
        storyline:"",
        title:"",
        trailer_url:"",
        wiki_url:""
    });
   
    const backLabel = "< Back to Home Page";
    
    const loadMovieDetails = async function(){
        try{
            const rawResponse = await fetch(`${movieUrl}${props.match.params.id}`,{
                method:'GET'
            })
            if(rawResponse.ok){
                const result = await rawResponse.json();
                setMovieData(result);
            }
            else{
                throw new Error();
            }
        }catch(e){
            console.log(e.message);
        }
    }
    

    useEffect(()=>{
        loadMovieDetails();
    },[])

    const {artists,
        censor_board_rating,
        duration,
        genres,
        id,
        poster_url,
        rating,
        release_date,
        status,
        storyline,
        title,
        trailer_url,
        wiki_url} = movieData;

    const playerOpts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };

      const onReady = function(event){
          event.target.pauseVideo();
      }

      const youtubeVideoId = trailer_url.split("=");
      let releaseDate = new Date(release_date);

    return(
        <Fragment>
        <Header headerName={sessionStorage.getItem("isUserLoggedIn")=='true'?"LOGOUT":"LOGIN"} showBook='true' movieId={id}/>
        <div className='back-to-home'>
            <Link to='/'>
                <Typography variant='body1'>{backLabel}</Typography>
            </Link>
        </div>
        <div className="movie-details-section">
            <div className='movie-poster'>
                <img src={poster_url} alt={title} onError={(e)=>{console.log(`Image not found`)}}></img>
            </div>
            <div className='movie-trailer'>
                <Typography variant="h2">{title}</Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Genres:
                    <span className="descriptions">  {genres.toString()}</span>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Duration:
                    <span className="descriptions">  {duration}</span>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Release Date:
                    <span className="descriptions">  {releaseDate.toDateString()}</span>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Rating:
                    <span className="descriptions">  {rating}</span>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold", marginTop:"16px"}}>Plot:
                    <span className="descriptions">  {storyline}</span>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold", marginTop:"16px"}}>Wiki Link:
                    <a  className="descriptions" href={wiki_url}>  {wiki_url}</a>
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight:"bold", marginTop:"16px"}}>Trailer:
                    <YouTube videoId={youtubeVideoId[1]} opts={playerOpts} onReady={onReady}/>
                </Typography>

            </div>
            <div className='movie-rating'>
                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Rate this movie:</Typography>
                <Typography variant="subtitle2" style={{fontWeight:"bold", marginTop:"16px", marginBottom:"16px"}}>Artists</Typography>
                <ImageList cols={2} style={{display:'flex', flexDirection: "row", overflowY:"hidden"}}>
                    {artists.map(artist => (
                        <ImageListItem key={`${artist.id}`}>
                            <img className={artist.first_name} src={artist.profile_url} alt={artist.first_name} />
                            <ImageListItemBar key={`${artist.id}`} style={{color:"white"}} title={`${artist.first_name} ${artist.last_name}`}/>
                        </ImageListItem>
                    ))}
                </ImageList>

            </div>
        </div>
        </Fragment>
    )
}

export default Details;