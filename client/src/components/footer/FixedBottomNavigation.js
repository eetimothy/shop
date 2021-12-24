import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const ref = React.useRef(null);
  const state = useContext(GlobalState)

  const [isAdmin] = state.userAPI.isAdmin
  const [isSuperAdmin] = state.userAPI.isSuperAdmin
  const [cart] = state.userAPI.cart
  // const [menu, setMenu] = useState(false)
  const [groupBuyCart] = state.userAPI.groupBuyCart


  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showlabels="true"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >

          <BottomNavigationAction label="Home" icon={<Link to='/'><HomeIcon sx={{ color: grey[500] }} /></Link>} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteBorderOutlinedIcon sx={{ color: grey[500] }} />} />

{
  isAdmin ? '' 
  : isSuperAdmin ? ''
  : cart.length === 0 && groupBuyCart.length === 0 ? 
  <BottomNavigationAction
  label="Cart"
  icon={<Badge
    badgeContent={cart.length + groupBuyCart.length}
    color="error">
    <Link to='#'><ShoppingBagIcon sx={{ color: grey[500] }} /></Link>
  </Badge>
  }
/>
:
<BottomNavigationAction
  label="Cart"
  icon={<Badge
    badgeContent={cart.length + groupBuyCart.length}
    color="error">
    <Link to='/allcarts'><ShoppingBagIcon sx={{ color: grey[500] }} /></Link>
  </Badge>
  }
/>
}
              

   
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
