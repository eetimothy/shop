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
    // const [result, setResult] = useState(0)
    // const [page, setPage] = useState(1)
    // const [isMoving, setIsMoving] = useState(false)

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const res = await axios.get(`/api/products?limit=${page * 9}`)
    //         setProducts(res.data.products)
    //         setResult(res.data.result)
    //         // console.info(res.data.products)
    //     }
    //     getProducts()
    // }, [page])


    // const gb = allGroupBuys.map(gb => {
    //     return gb
    // })


    return (
        <>
           <div>
                {/* <Container maxWidth="md"> */}
                    {/* <Hidden mdDown={true}> */}
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
                            {/* <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button size="large" variant="contained"><Link to='/groupbuys'>Group Buys</Link></Button>
                                <Button size="large" variant="outlined"><Link to='/products'>Products</Link></Button>
                            </Stack> */}
                        </Container>
                    </Box>
                    {/* </Hidden> */}
                {/* </Container> */}
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

// const styles = () => ({
//     root: {
//         textAlign: "center"
//     },
//     title: {
//         maxWidth: 400,
//         margin: "auto",
//         marginTop: 10
//     }
// });

export default Landing;