import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import dateFormat from "dateformat";
import axios from 'axios';

const News = (props) => {
  const [liked, setLiked] = useState(props.new.liked)
  const [bookmark, setBookMark] = useState(props.new.bookmark);
  const dateOfNew = new Date(props.new.publishedAt);

  return (
    <div className="mt-20">
      <Card sx={{ minWidth: 200, maxWidth: 1000 }}>
        <a href={props.new.url}>
          <CardHeader
            title={props.new.title}
            subheader={dateFormat(dateOfNew)}
          />
        </a>
        {props.new.urlToImage ?
          <CardMedia
            component="img"
            height="50"
            style={{ margin: "auto", height: "500px", width: "500px" }}
            src={props.new.urlToImage}
            alt="Paella dish"
          /> :
          <CardMedia
            component="img"
            height="50"
            style={{ margin: "auto", height: "500px", width: "500px" }}
            src="https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
            alt="Paella dish"
          />
        }
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.new.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {liked ?
            <IconButton style={{ color: 'red' }} onClick={async () => {
              setLiked(false);
              const payload = {
                email: sessionStorage.getItem('@user'),
                url: props.new.url ? props.new.url : "",
                action: 'S',
                type: 'R'
              }
              console.log(payload);
              await axios.post('http://169.51.205.76:32522/action', payload);
            }} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            :
            <IconButton style={{ color: 'gray' }} onClick={async () => {
              setLiked(true);
              const payload = {
                email: sessionStorage.getItem('@user'),
                title: props.new.title ? props.new.title : "",
                url: props.new.url ? props.new.url : "",
                urlToImage: props.new.urlToImage ? props.new.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
                publishedAt: props.new.publishedAt ? props.new.publishedAt : "",
                description: props.new.description ? props.new.description : "",
                action: 'S',
                type: 'A'
              }
              console.log(payload);
              //169.51.205.76:32522
              await axios.post('http://169.51.205.76:32522/action', payload);
            }} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          }
          <IconButton aria-label="settings">
            {bookmark ? <BookmarkIcon onClick={async () => {
              const payload = {
                email: sessionStorage.getItem('@user'),
                url: props.new.url ? props.new.url : "",
                action: 'B',
                type: 'R'
              }
              console.log(payload);
              await axios.post('http://169.51.205.76:32522/action', payload);
              setBookMark(false)
            }} style={{ color: "green" }} /> : <BookmarkIcon onClick={async () => {
              const payload = {
                email: sessionStorage.getItem('@user'),
                title: props.new.title ? props.new.title : "",
                url: props.new.url ? props.new.url : "",
                urlToImage: props.new.urlToImage ? props.new.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
                publishedAt: props.new.publishedAt ? props.new.publishedAt : "",
                description: props.new.description ? props.new.description : "",
                action: 'B',
                type: 'A'
              }
              console.log(payload);
              //169.51.205.76:32522
              await axios.post('http://169.51.205.76:32522/action', payload);
              setBookMark(true)
            }} />}
          </IconButton>
          <a href={`https://api.WhatsApp.com/send?text=` + props.new.url}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </a>
        </CardActions>
      </Card>
    </div>
  );
}

export default News;