import { useContext, useState, useEffect, useRef } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios'
import Loading from '../utils/loading/Loading';
// import { Link } from 'react-router-dom';
import GroupBuyItem from './GroupBuyItem'
import Slider from 'react-slick'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import './GroupBuyItem.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Typography } from '@material-ui/core';
import Fab from '@mui/material/Fab';

const ProductGroupBuys = ({ params, productDetails, addGroupBuyCart }) => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [loading] = useState(false)
    // const [result, setResult] = useState([])
    const [productGroupBuys, setProductGroupBuys] = useState([])
    const sliderRef = useRef(null)
    

    useEffect(() => {
        const getProductGroupBuys = async () => {
            const res = await axios.get(`/api/groupbuys_product?id=${params}`, {
                headers: { Authorization: token }
            })
             setProductGroupBuys(res.data.productGroupBuys)
        }
        getProductGroupBuys()
    }, [token, params])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    if (loading) return <div><Loading /></div>

    return ( 
        // <div>
        //     { !isAdmin &&
        //     productGroupBuys.map(groupBuy => {
        //         return (
        //             <div key={groupBuy._id}>
                        
        //                  {/* <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, groupBuy)}>Join</Link> */}
        //                  <GroupBuyItem groupBuy={groupBuy} product={groupBuy.product} />

        //                 </div>  
        //         )
        //     })
        //     }
        // </div>

        <div>
            <div className="carousel_section_header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" style={{ fontWeight: '700' }}>
                    {/* <p>Available Group Buys for This Product</p> */}
                </Typography>

                <div className="slider_nav" style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: '1px', cursor: 'pointer' }}  >
                        {/* <ChevronLeftOutlinedIcon sx={{ color: blueGrey[900], border: '1px solid #263238', borderRadius: '50%' }} onClick={() => sliderRef.current.slickPrev()} />  */}
                        <Fab size="small" color="default" aria-label="add" onClick={() => sliderRef.current.slickPrev()} >
                            <ChevronLeftOutlinedIcon style={{ color: "#000" }} />
                        </Fab>
                    </div>


                    <div style={{ display: 'flex' }}>
                        
                    </div>


                    <div className='last_btn' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
                        {/* <ChevronRightOutlinedIcon sx={{ color: blueGrey[900], border: '1px solid #263238', borderRadius: '50%', cursor: 'pointer' }} onClick={() => sliderRef.current.slickNext()} />  */}
                        <Fab size="small" color="default" aria-label="add" onClick={() => sliderRef.current.slickNext()} >
                            <ChevronRightOutlinedIcon style={{ color: "#000" }} />
                        </Fab>
                    </div>
                </div>
            </div>
            <div className='carousel_nav' style={{ margin: '30px', marginLeft: '35px', marginTop: '60px' }}>
                <Slider ref={sliderRef} {...settings}>

                    {
                        productGroupBuys.map(groupBuy => {
                            if (groupBuy.isActive === true)
                                return <div key={groupBuy._id} style={{ marginTop: '20px' }}>
                                    <GroupBuyItem groupBuy={groupBuy} product={groupBuy.product} />
                                </div>
                            else return ''
                        })
                    }


                </Slider>
            </div>
        </div>
     );
}
 
export default ProductGroupBuys;