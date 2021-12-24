import FixedBottomNavigation from "./FixedBottomNavigation"
import Hidden from '@mui/material/Hidden'
import BottomNav from './BottomNav'

function Footer() {
    return (
        <div className="footer">
            <Hidden mdUp={true}>
        <FixedBottomNavigation/>
        
        </Hidden>

        <Hidden mdDown={true}>
        <BottomNav/>

        </Hidden>
        </div>
    )
}

export default Footer