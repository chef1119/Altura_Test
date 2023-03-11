import React,  { useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography';
import CardModal from "../CardModal/CardModal";
import './styles.scss';

export default function NftCard(props:{data: any, metadata:any, chain:any}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log('handle close invoked.');
    setOpen(false);
  };
  
  const getImageUrl = (image:string) => {
    if(image.indexOf("ipfs")==0)
      return "https://ipfs.io/ipfs/" + image.slice(7, image.length);
    else return image;
  }

  return (
    <>
      <Card className="card-area" sx={{ maxWidth: 355, height: "100%" }} onClick={handleOpen}>
        <CardActionArea>
          {props.metadata?(
            <CardMedia
              sx={{ height: "250px" }}
              image={getImageUrl(JSON.parse(props.metadata).image)}
              title="green iguana"
            />
          ):(
            <></>
          )}
          
          <CardContent>
            <Typography className="nftname-label" gutterBottom variant="h5" component="div">
              <>
                {props.metadata && (JSON.parse(props.metadata).name) }
              </>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {props.metadata?(
            <CardModal open={open} handleClose={handleClose} data={props.data} metadata={props.metadata} image={getImageUrl(JSON.parse(props.metadata).image)} chain={props.chain}></CardModal>
          ):(
            <></>
          )}
        
      
    </>
  );
}