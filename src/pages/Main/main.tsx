import React,  { useEffect, useRef, useState } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import NftCard from "../../components/NFTCard/NftCard";
import { TextField, Button, Container, Select, Grid, InputLabel, FormControl, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import './style.scss';

export default function Main() {
    const walletAddress = useRef<HTMLInputElement | null>(null);
    const chainName = useRef<HTMLInputElement | null>(null);
    const [nftData, setNftData] = useState([]);
    const [buttonStatus, setButtonStatus] = useState("SEARCH");
    const [isDisabled, setDisable] = useState(false);

    useEffect(()=> {
        //runApp();
        
    }, []);
    const runApp = async () => {
        if(buttonStatus == "SEARCH")
            setButtonStatus("REFRESH STATUS");
            setDisable(true);
        if(buttonStatus == "REFRESH STATUS") {
            window.location.reload();
        }
        const walletAddressInput = walletAddress.current?.value;
        const chainNameInput = chainName.current?.value;
        // console.log(walletAddressInput);
        // console.log('https://deep-index.moralis.io/api/v2/' + walletAddressInput + '/nft?chain=' + chainNameInput + '&format=decimal&=')
        await Moralis.start({
        apiKey:"Uie3TlEAdunREYMQyXkXml3TvSW7PkcmFnl4bTivYsC9JB6ud03wwoRO3NWeLSEH",
        // ...and any other configuration
        });
        
        const allNFTs: any[] = [];     
        try {
            var config = {
                method: 'get',
                url: 'https://deep-index.moralis.io/api/v2/' + walletAddressInput + '/nft?chain=' + chainNameInput + '&format=decimal&=',
                headers: { 
                    'X-API-KEY': 'Uie3TlEAdunREYMQyXkXml3TvSW7PkcmFnl4bTivYsC9JB6ud03wwoRO3NWeLSEH'
                }
                };
                
            await axios(config)
            .then(function (response) {
            allNFTs.push(response.data);
            })
            .catch(function (error) {
            console.log(error);
            });
            
        } catch(error) {
            console.log(error);
        }
        setNftData(allNFTs[0]["result"]);
    }
    return (
        <Container sx={{marginTop:"2%"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label="WALLET ADDRESS" className="wallet_address" sx={{maxField:"116px", width:"50%"}} inputRef={walletAddress} disabled={isDisabled}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl sx={{maxField:"116px", width:"50%"}} disabled={isDisabled}>
                    <InputLabel className="chain-select-label">Select Chain</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        className="chain-select"
                        label="Age"
                        defaultValue={"eth"}
                        inputRef={chainName}
                    >
                        <MenuItem value={"eth"}>Ethereum</MenuItem>
                        <MenuItem value={"bsc"}>BSC</MenuItem>
                        <MenuItem value={"polygon"}>Polygon</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button className="search-button" sx={{maxField:"116px", width:"50%"}} onClick={runApp}>{buttonStatus}</Button>
                </Grid>
            </Grid>
            {!isDisabled?(
                <Grid container className="label-content">
                    <Grid item xs={12} sm={12}>
                        <Typography className="typo-content" sx={{color:'white'}}>Please Input Requirements</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{marginTop:'30px'}}>
                        <Typography className="typo-content">Enjoy The App</Typography>
                    </Grid>
                </Grid>
            ):(
                <Grid container spacing={3} sx={{marginTop:"10px"}}>
                {nftData.map(data => (
                    <>
                        {data["metadata"]? (
                            <Grid item xs={12} sm={3} sx={{height:"100%"}}>
                                <NftCard data={data} metadata={JSON.parse(JSON.stringify(data["metadata"]))} chain={chainName.current?.value}></NftCard>    
                            </Grid>
                        ):( 
                            <>
                            </>
                        )}
                    </>
                ))}
            </Grid>
            )}
            
        </Container>
    );
}