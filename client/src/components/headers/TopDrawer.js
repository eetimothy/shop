import { useContext } from 'react';
import * as React from 'react';
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import glogo from './images/glogo.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import Divider from '@mui/material/Divider';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import AccSettings from './AccSettings';
import './Header.css'

const drawerHeight = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: '-60px',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginTop: drawerHeight,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easingOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginTop: '180px',
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        
    }),
    ...(open && {
        // height: `${drawerHeight}px)`,
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        toolbar: theme.mixins.toolbar,
        zIndex: theme.zIndex.drawer + 1,

    }),

}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(7, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


function TopDrawer() {
    const state = useContext(GlobalState)
    const [isLoggedIn] = state.userAPI.isLoggedIn
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [cart] = state.userAPI.cart
    // const [menu, setMenu] = useState(false)
    const [groupBuyCart] = state.userAPI.groupBuyCart
    const [user] = state.userAPI.user
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const logoutUser = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
        } catch (err) {
            window.location.href = "/"
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar 
            position="absolute" 
            open={open} 
            style={{ background: '#263238', border: 'none', height: '100px', paddingTop: '18px', color: '#ffffff' }}
            >
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                            <div className="logo">
                            <Link to='/'><img width={60} src={glogo} alt=''/></Link> 
                            <Hidden mdDown={true}>
                            <Link to='/'><span>x group-buy.io</span></Link> 
                            </Hidden>
                            </div>
                            
                        </Typography>
                        
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} textTransform={'none'}>
                            {
                                !isSuperAdmin &&

                                <Button
                                    
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to='/groupbuy/how_it_works'>How It Works</Link>
                                </Button>
                            }
                            {
                                !isAdmin && !isSuperAdmin &&

                                <Button
                                    
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to='/groupbuys'>Discover Group Buys</Link>
                                </Button>
                            }
                            {
                                !isAdmin && !isSuperAdmin &&

                                <Button
                                    
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to='/products'>Explore Products</Link>
                                </Button>
                            }
                            {
                                isAdmin && <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to={`/vendorproducts/${user._id}`}>My Products</Link>
                                </Button>
                            }
                            {
                                isAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to={`/vendor_groupbuys/${user._id}`}>My Group Buys</Link>
                                </Button>
                            }
                            {
                                isAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to={`/add_product`}>Add Product</Link>
                                </Button>
                            }
                            {
                                isSuperAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to="/brand">Brand</Link>
                                </Button>
                            }
                            {
                                isSuperAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to="/category">Category</Link>
                                </Button>
                            }
                            {
                                isSuperAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to="/product_type">Product Type</Link>
                                </Button>
                            }
                            {
                                isSuperAdmin &&
                                <Button
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10px' }}
                                >
                                    <Link to="/superadmin_create_product">Add Product</Link>
                                </Button>
                            }


                        </Box>
                        
                        {
                            isLoggedIn  && 
                          <Tippy
                            content={<AccSettings/>}
                            interactive={true}
                            theme="light"
                            offset={[15,5]}
                            trigger="click"
                            hideOnClick={true}
                       
                          >  
                          <span>
                          <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                            >
                                <Typography variant="h6" style={{ fontSize: '12px', color: '#ffffff', marginRight: '5px', fontWeight: '700' }}>{user.username}</Typography>
                                <AccountCircle /> 
                                <KeyboardArrowDownIcon/> 
                            </IconButton>
                            </span>
                            </Tippy>
                        }
                        {
                            !isLoggedIn
                            &&
                            
                            <IconButton
                                size="small"
                                edge="end"
                                aria-label="account of current user"
                            >
                                <Link to='/account/login'>
                                    <Typography  style={{ border: '1px solid #ddd', marginRight: '8px', borderRadius: '5%', padding: '2px 12px', fontWeight: '700' }}>
                                    Log In
                                    </Typography>
                                    </Link>
                                </IconButton>
                            
                        }
                        {
                            !isLoggedIn
                            &&
                            <IconButton
                                size="small"
                                edge="end"
                                aria-label="account of current user"
                                
                            >
                                <Link to='/account/register' style={{ color: '#ddd' }} >
                                    <Typography style={{ color: '#263238', backgroundColor: '#ffffff', padding: '2px 12px', borderRadius: '5%', fontWeight: '700' }}>
                                        Sign Up
                                        </Typography>
                                    </Link>
                                </IconButton>
                        }

                            <Hidden mdDown={true}>
                        {
                            isAdmin ? ''
                                : isSuperAdmin ? ''
                                    : 
                                            cart.length === 0 && groupBuyCart.length === 0 ?
                                                <IconButton
                                                    size="small"
                                                    aria-label="cart"
                                                    color="inherit"
                                                    edge="end"
                                                    
                                                >
                                                    <Link to="#"> <ShoppingBagIcon style={{ paddingTop: '8px' }} /></Link>
                                                </IconButton>
                                                :
                                                <IconButton
                                                    size="small"
                                                    aria-label="cart"
                                                    color="inherit"
                                                    edge="end"
                                                    
                                                >
                                                    <Badge badgeContent={cart.length + groupBuyCart.length} color="error" style={{ marginTop: '8px' }}>
                                                        <Link to="/allcarts">
                                                            <ShoppingBagIcon />
                                                        </Link>
                                                    </Badge>
                                                </IconButton>
                                        
                        }
                                </Hidden>



                        <Hidden mdUp={true}>
                            {
                                open ? <IconButton
                                color="inherit"
                                aria-label="close drawer"
                                edge="end"
                                onClick={handleDrawerClose}
                                sx={{ ...(!open && { display: 'none' }) }}
                            >
                                <CancelIcon />
                            </IconButton> : 
                            !open ? <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={(handleDrawerOpen)}
                            sx={{ ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton> : 
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={(handleDrawerOpen)}
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                            }
                            
                           
                            
                        </Hidden>
                    </Toolbar>
                </Container>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
            </Main>
            <Drawer
                sx={{
                    height: drawerHeight,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        height: drawerHeight,
                    },
                }}
                variant="temporary"
                anchor="top"
                open={open}
                position="absolute"    
            >
                <div />
                <DrawerHeader/>
                   
                <List>
                
                    {!isAdmin && !isSuperAdmin &&
                     <div>
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/groupbuys`}>
                           <PeopleOutlineIcon/> Discover Group Buys
                            <ListItemText />
                        </ListItem>
                        </div>
                    }
                    {!isAdmin && !isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/products`}>
                           <FavoriteBorderOutlinedIcon/> Explore Products
                            <ListItemText />
                        </ListItem>
                    }
                    {!isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/groupbuy/how_it_works`}>
                           <LightbulbOutlinedIcon/> How It Works
                            <ListItemText />
                        </ListItem>
                    }
                    {!isAdmin && !isSuperAdmin && isLoggedIn &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/groupbuys_user/${user._id}`}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */} <FolderSpecialOutlinedIcon/> My Group Buys
                            <ListItemText />
                        </ListItem>
                    }
                    {!isAdmin && !isSuperAdmin && isLoggedIn &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/history`}>
                            <DescriptionOutlinedIcon/> My Orders
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/vendorproducts/${user._id}`}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}  <InventoryOutlinedIcon/> My Products
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/add_product`}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}  <AddCircleOutlineOutlinedIcon/> Add Products
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={`/vendor_groupbuys/${user._id}`}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}<FolderSpecialOutlinedIcon/> My Group Buys
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to="/brand">
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}Manage Brands
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to="/category">
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}Manage Categories
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to="/product_type">
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}Manage Product Types
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        isSuperAdmin &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={"/superadmin_create_product"}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}Add Product
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        !isLoggedIn &&
                    <ListItem button component={Link} onClick={handleDrawerClose} to={"/account/login"}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */} <LoginOutlinedIcon/> Login
                            <ListItemText />
                        </ListItem>
                    }
                    {
                        !isLoggedIn &&
                        <ListItem button component={Link} onClick={handleDrawerClose} to={"/account/login"}>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */} <HowToRegOutlinedIcon/> Sign Up
                            <ListItemText />
                        </ListItem>
                    }

                    {
                        isLoggedIn && 
                        <ListItem button onClick={logoutUser} component={Link} to='/'>
                            {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */} <LogoutIcon/> Log Out
                            <ListItemText />
                        </ListItem>
                    }

                </List>
                {/* <Divider /> */}
            </Drawer>
            {/* {
                isAdmin ? renderAdminMenu
                    : isSuperAdmin ? renderSuperAdminMenu
                        : renderMenu
            } */}
        </Box>
    );
}
export default TopDrawer