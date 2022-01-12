import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
// import Button from "@material-ui/core/Button";
import "./style.css";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Bg from '../../headers/images/bg.png'
// import Hidden from '@mui/material/Hidden'

import GroupBuyCarousel from './GroupBuyCarousel';
import ProductCarousel from './ProductCarousel';



const Landing = () => {
    const state = useContext(GlobalState)
    const [allGroupBuys] = state.groupBuysAPI.allGroupBuys
    const [products] = state.productsAPI.products
    
    return (
        <>
           <div>
                    <Box
                        sx={{
                            backgroundImage: `url(${Bg})`,
                            backgroundSize: "100%",
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="inherit"
                                gutterBottom
                            >
                                Discover
                            </Typography>
                            <Typography variant="h5" align="center" color="inherit" paragraph>
                                Browse through our products and start group buys instantly, or simply just discover and join one!
                            </Typography>
                           
                        </Container>
                    </Box>
                   
                <CssBaseline />
                <Container maxWidth="lg" >

                    <GroupBuyCarousel allGroupBuys={allGroupBuys} />
                </Container>

                <Container maxWidth="lg">

                    <ProductCarousel products={products} />
                </Container>
                </div>
        </>
    );
}



export default Landing;