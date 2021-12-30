import './HowItWorks.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const HowItWorks = () => {
     return (
          <div className="howitworks_container">
               <div className="howitworks_title">
                    <h2>How It Works</h2>
               </div>

               <div className='how_contents'>
                    <h5>Browse Products or Group Buys</h5>
                    <p><ArrowDropDownIcon style={{ color: 'black' }} /></p>
                    <h5>Complete Payment</h5>
                    <p> <ArrowDropDownIcon style={{ color: 'black' }} /></p>
                    <h5>Share with friends to Group Up</h5>
                    <p> <ArrowDropDownIcon style={{ color: 'black' }} /></p>
                    <h5>Wait for Minimum order to be met*</h5>
                    <p> <ArrowDropDownIcon style={{ color: 'black' }} /></p>
               </div>


               <div className='how_contents'>
                    <h4>*Minimum Order Met</h4>
                    <p>Item(s) will be shipped within 24hours</p>
               </div>

               <div className='how_contents'>
                    <h4>*Minimum Order Not Met</h4>
                    <p>Refund will be made within 24hours</p>
               </div>
          </div>
     );
}

export default HowItWorks;