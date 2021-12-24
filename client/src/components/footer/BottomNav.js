import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '../headers/images/glogo_nobg.png'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import './Footer.css'
import { Link } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" to="https://group-buy.io/">
        Group-buy.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '30vh',
        maxHeight: '45vh',
        borderTop: '1px solid lightgrey',
        width: '100%',
        padding: '30px 20px',
        margin: '100px  0px',
        marginTop: '300px'
      }}
    >
      <CssBaseline />
      <div className="footer-wrapper" style={{ display: 'flex' }}>
        <div className="footer-logo" style={{ display: 'flex', flex: '1' }}>
         <Link to="/"><img src={Logo} alt="" width="250px" /></Link> 
        </div>

        <div className="menu-footer" style={{ paddingLeft: '120px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'left' }}>

          <h5>Company</h5>
          <p>How it works</p>
          <p>Sell with us</p>
          <p>Contact</p>
          <p></p>
        </div>

        <div className="menu-footer" style={{ paddingLeft: '80px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'top' }}>
          <h5>Vendor Area</h5>
          <Link to="/account/login"><p>Vendor log in</p></Link>
          <Link to="/account/register_vendor"><p>Vendor Sign up</p></Link>
          <p></p>
          <p></p>
          <p></p>
        </div>

        <div className="menu-footer" style={{ paddingLeft: '100px', display: 'flex', flex: '1', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'left' }}>
          <h5>Others</h5>
          <p>Developers</p>
          <p>Terms of use</p>
          <p>Get help</p>
          <p></p>
        </div>

      </div>

      <Divider style={{ marginTop: '30px' }} />

      <div className="div footer-comments-wrapper" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>

        <div className="div footer-comments" style={{ display: 'flex' }}>
          <div>
            <IconButton
              size="small"
              edge="end"
              aria-label="facebook"
            >
              <FacebookIcon style={{ color: '#263238' }} />
            </IconButton>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="instagram"
            >
              <InstagramIcon style={{ color: '#263238' }} />
            </IconButton>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="twitter"
            >
              <TwitterIcon style={{ color: '#263238' }} />
            </IconButton>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="whatsapp"
            >
              <WhatsAppIcon style={{ color: '#263238' }} />
            </IconButton>
          </div>
        </div>
        <div className="div footer-comments" style={{ display: 'flex' }}>

        </div>
        <div className="div footer-comments" style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
          <Copyright />
        </div>
      </div>
    </Box>
  );
}