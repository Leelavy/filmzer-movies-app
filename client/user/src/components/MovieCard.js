import React from "react";
//Axios 
import axios from 'axios';
//styles
import styled from 'styled-components';
import { StyledButton } from '../styles/styles';
//MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    borderRadius: '0',
    transition: 'transform .2s',
    border: '0.5px solid transparent',
    backgroundColor: '#141414',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  media: {
    height: 280,
  },
  content: {
    padding: '1rem 1.2rem',
    height: 120,
    background: '#202020',
    color: '#d4d4d4',
  },
  actions: {
    padding: '1rem 1.2rem',
    background: '#202020',
    color: 'white',
  },
});

const MovieCard = ({ movie, onWatchClick }) => {
  const classes = useStyles();

  const handleWatchClick = (e) => {
    e.preventDefault();
    onWatchClick(movie);
  }

  const { title, description, image_url } = movie;

  //Rating should be calculated on server abd be added to each movie
  const rating = () => {
    // let sum = 0;
    // for (let i = 0; i < movie.reviews.length; i++) {
    //   sum += movie.reviews[i].rating;
    //   console.log(sum);
    // }
    // if (sum) {
    //   return `${sum}/10`;
    // }
    // return "No Reviews";
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={`${title}`}
          height="140"
          image={`${image_url}`}
          title={`${title}`}
        />
        <CardContent className={classes.content}>
          <StyledHeaderCardDiv>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              {`${title.toUpperCase()}`}
            </Typography>
            {movie.reviews && (
              <div>{rating()}</div>
            )}
          </StyledHeaderCardDiv>
          <Typography variant="body2" component="p" align="left">
            {`${description.replace(/^(.{120}[^\s]*).*/, "$1")}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <StyledButton size="small" color="inherit">
          READ MORE
        </StyledButton>
        <StyledButton size="small" color="inherit" onClick={handleWatchClick}>
          WATCH TRAILER
        </StyledButton>
      </CardActions>
    </Card>
  );
}

const StyledHeaderCardDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    background-color: red;
    border-radius: 10px;
  }
`;

export default MovieCard;
