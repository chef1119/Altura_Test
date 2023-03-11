import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';
import { ellipseAddress } from '../../lib/utils';

import "./styles.scss"

export default function CardModal(props:{ open: any, handleClose: any, data:any, metadata:any, image:any, chain:any }) {
    const style = {
        borderRadius: "0.75rem",
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#050017',
        color: "#ff8cdf",
        fontFamily: 'PressStart2P',
        boxShadow: "0px 0px 13px #ff3f84",
        flexDirection: "column",
        overflow: "hidden",
        overflowY: "scroll",
        display:"flex",
        height:430,
        mb:2,
        p: 4,
      };

    const getBlockURL = (address : any) => {
        if(props.chain == "eth") return "https://etherscan.io/address/" + address;
        else if(props.chain == "bsc") return "https://bscscan.com/address/" + address;
        else return "https://polygonscan.com/address/" + address;
    }

    const purchase = () => {
        var purchaseUrl : string = "";
        if(JSON.parse(props.metadata).external_link) purchaseUrl = JSON.parse(props.metadata).external_link;
        else {
            if(props.chain == "eth") purchaseUrl = "https://opensea.io/assets/ethereum/" + props.data.token_address + '/' + props.data.token_id;
            else if (props.chain == "bsc") purchaseUrl = "https://opensea.io/assets/binance/" + props.data.token_address + '/' + props.data.token_id;
            else purchaseUrl = "https://opensea.io/assets/polygon/" + props.data.token_address + '/' + props.data.token_id;
        }
        window.open(purchaseUrl, "_blank", "location=yes");
    }

    return (
    <Modal
        open={props.open}
        onClose={props?.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='typo-container' sx={style}>
            <Grid container spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} sx={{textAlign:'center', margin:"15px"}}>
                        <CardMedia sx={{ height: "300px"}} image={props?.image}/>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{textAlign:'center', marginTop:"15px"}}>
                        <Typography>{props.metadata && (JSON.parse(props.metadata).name) }</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{textAlign:'center', alignContent:'center'}}>
                    <Grid item xs={12} sm={12} sx={{margin:"15px"}}>
                        <Typography sx={{textTransform: 'uppercase'}}>{props.metadata && (JSON.parse(props.metadata).description) }</Typography>
                    </Grid>
                    <Grid container sx={{margin:"15px"}}>
                        <Grid item xs={12} sm={5}>
                            <Typography sx={{textTransform: 'uppercase'}}>COLLECTION NAME : </Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography sx={{textTransform: 'uppercase'}}>{props.data.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{margin:"15px"}}>
                        <Typography sx={{textTransform: 'uppercase'}}>Token Address : <a href={getBlockURL(props.data.token_address)} target="_blank">{ellipseAddress(props.data.token_address)}</a></Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{margin:"15px"}}>
                        <Typography sx={{textTransform: 'uppercase'}}>Owner Address : <a href={getBlockURL(props.data.owner_of)} target="_blank">{ellipseAddress(props.data.owner_of)}</a></Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{margin:"15px"}}>
                        <Button className="purchase-button" sx={{maxField:"116px", width:"70%"}} onClick={purchase}>Purchase</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    );
  }