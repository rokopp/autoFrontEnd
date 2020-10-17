import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, IconButton, CardMedia, CardActions, Button} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import CardHeader from "@material-ui/core/CardHeader";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        maxWidth: "sm",
    },
    media: {
        height: 140,
        marginTop: 20,
    },
});

const MediaCard = (props) => {
    const classes = useStyles();
    const { avatarSrc, userName, price, description, pictureDto, carMark, carModel, carID} = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar src={avatarSrc} />
                }
                action={
                    <IconButton aria-label="settings">
                        <ShareIcon/>
                    </IconButton>
                }
                title={userName}
            />
            <CardMedia style={{height: "150px"}} image={pictureDto}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {carMark} {carModel}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                    {price} eur
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={"/buyNow"} size="small">Osta</Button>
                <Button component={Link} to={"/carAds/" + carID} size="small">Uuri lähemalt</Button>
            </CardActions>
        </Card>
    );
}

export default MediaCard;
