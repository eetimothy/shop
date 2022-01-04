import { useRef } from 'react'
import Slider from 'react-slick'
import ProductItem from '../utils/productItem/ProductItem'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Typography } from '@material-ui/core';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Link } from 'react-router-dom'
import './style.css'
import Fab from '@mui/material/Fab';

const ProductCarousel = ({ products }) => {
    const sliderRef = useRef(null)

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
                    slidesToShow: 3,
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



    return (
        <div>
            <div className="carousel_section_header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                <Typography variant="h5" style={{ fontWeight: '700' }}>
                    Latest Added Products
                </Typography>

                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: '1px', cursor: 'pointer' }}  >
                        <Fab size="small" color="default" aria-label="add" onClick={() => sliderRef.current.slickPrev()} >
                            <ChevronLeftOutlinedIcon style={{ color: "#000" }} />
                        </Fab>
                        {/* <ChevronLeftOutlinedIcon sx={{ color: blueGrey[900], border: '1px solid #263238', borderRadius: '50%' }} onClick={() => sliderRef.current.slickPrev()} />  */}
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: '1px', cursor: 'pointer' }}  >
                            {/* <Typography variant="h6" style={{ borderRadius: '15px', border: '1px solid #263238', color: 'gray', fontSize: '10px', padding: '4px' }}>
                            <Link to='/products' style={{ color: '#263238' }}>View all</Link>
                        </Typography> */}

                            <Link to='/products'>
                                <Fab variant="extended" size="medium">
                                    <Typography variant="h6" style={{ fontSize: '10px', color: 'black', textTransform: "none" }}>

                                        View All

                                    </Typography>
                                </Fab>
                            </Link>
                        </div>
                    </div>

                    <div className='last_btn' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
                    <Fab size="small" color="default" aria-label="add" onClick={() => sliderRef.current.slickNext()} >
                            <ChevronRightOutlinedIcon style={{ color: "#000", fontWeight: '300' }} />
                        </Fab>
                        
                        {/* <ChevronRightOutlinedIcon sx={{ color: blueGrey[900], border: '1px solid #263238', borderRadius: '50%', cursor: 'pointer' }} onClick={() => sliderRef.current.slickNext()} /> */}
                    </div>
                </div>
            </div>
            <div style={{ margin: '30px', marginLeft: '10px', marginTop: '30px', marginBottom: '30px' }}>
                <Slider ref={sliderRef} {...settings}>
                    {
                        products.map(product => {
                            if (product.isActive === true)
                                return <div key={product._id} style={{ marginTop: '20px' }} >
                                    <ProductItem product={product} />
                                </div>
                            else return ''
                        })
                    }


                </Slider>
            </div>
        </div>
    );
}

export default ProductCarousel;