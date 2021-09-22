import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Collapse } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import './Index.scss'

const CardItem = (props) => {
    const { date, explanation, url, title, copyright } = props
    const likedPhotosArr = JSON.parse(localStorage.getItem('likedPhotosLibrary'));
    const [liked, setLiked] = useState(likedPhotosArr?.[title] ?? false);

    //isShow explanation variable and set function 
    const [showDetail, setShowDetail] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

   

    const open = Boolean(anchorEl);

    //share link.
    const copyImageUrl = () => {
        navigator.clipboard.writeText(url)
        document.dispatchEvent(new Event('successCopy'))
    }

    //Click to add or remove from the like list
    const handleClickLikeIcon = () => {
        try {
            //set ui action view
            setLiked(!liked);

            //get new likedPhotosArr as obj
            const obj = JSON.parse(localStorage.getItem('likedPhotosLibrary')) ?? {};

            //set localStorage  likedPhotosLibrary json 
            obj[title] = !liked;
            localStorage.setItem('likedPhotosLibrary', JSON.stringify(obj));
        } catch (e) {
            //if catch  error , console error
            console.error(new Error("Failed to save  photo likes."));
        }
    }

    return (
        <Card className="cardContent" style={{ background: '#293858' }}>

            {/*cardHeader picture start*/}
            <CardMedia
                className="imgElem"
                component="img"
                image={url}
                title={title}
            />
            {/*cardHeader picture end*/}


            {/* {text content start } */}
            {!showDetail && <CardContent className="btnsContent">
                <Typography component="h3" className="title">
                    {copyright}
                    {copyright && ' - '}
                    {title}
                </Typography>
                <Typography className="date" >
                    {date}
                </Typography>
                <Typography variant="body2" component="p" className="explanation" >
                    {explanation}
                </Typography>
            </CardContent>}
            <Collapse in={showDetail} timeout="auto" unmountOnExit>
                <CardContent className="btnsContent">
                    <Typography variant="body2" component="p">
                        {explanation}
                    </Typography>
                </CardContent>
            </Collapse>
            {/* text content end  */}

            <CardActions disableSpacing className="btnsContent">
                <IconButton aria-label="liked" onClick={handleClickLikeIcon}>
                    <FavoriteIcon style={{ color: liked ? 'red' : 'white' }} />
                </IconButton>
                <IconButton aria-label="share" onClick={copyImageUrl} style={{ color: '#fff' }} >
                    {/* aria-describedby={id} variant="contained" onClick={handleClick} */}
                    <ShareIcon />
                </IconButton>


                <IconButton
                    className="showDetail"
                    onClick={() => setShowDetail(!showDetail)}
                    aria-expanded={showDetail}
                    style={{ color: '#fff' }}
                >
                    {
                        showDetail ? < KeyboardArrowUpIcon /> : <ExpandMoreIcon />
                    }

                </IconButton>
            </CardActions>
        </Card >
    );
}
export default CardItem;
