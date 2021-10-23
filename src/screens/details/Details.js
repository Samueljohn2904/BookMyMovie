import React, { Fragment, useEffect, useState, useContext} from 'react';
import Header from '../../common/header/Header';
import './details.css';
import { Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import Rating from '@material-ui/lab/Rating';


const Details = function(props){

    // API to fetch Movie details from database

    const movieUrl = 'http://localhost:8085/api/v1/movies/';

    // state variables to store value of the state

    const [ratingValue, setRatingValue] = useState(0);
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
    
    // Function to fetch movie details from database

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
    
    // Hook to fetch movie details on page load

    useEffect(()=>{
        loadMovieDetails();
    },[])

    // Variables to store fetched details

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
            <Header showBook='true' movieId={id}/>
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
                    <Typography variant="subtitle1" style={{fontWeight:"bold", marginTop:"16px"}}>Genres:
                        <Typography component="span" className="descriptions">  {genres.toString()}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Duration:
                        <Typography component="span" className="descriptions">  {duration}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Release Date:
                        <Typography component="span" className="descriptions">  {releaseDate.toDateString()}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Rating:
                        <Typography component="span" className="descriptions">  {rating}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" style={{fontWeight:"bold", marginTop:"16px"}}>Plot:
                        <Typography component="span" className="descriptions">  {storyline}</Typography>
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
                    <Rating
                        name="rating"
                        icon={<StarBorderIcon value={ratingValue}/>}
                        onChange={(newValue) => {
                            setRatingValue(newValue);
                        }}
                    />
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