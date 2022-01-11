import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import VendorProducts from "../vendorProducts/vendorProducts";
import VendorGroupBuys from '../vendorGroupBuys/VendorGroupBuys'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import './Shops.css'

const ShopDetails = () => {
    const state = useContext(GlobalState)
    const params = useParams()
    const [vendors] = state.userAPI.vendors
    const [shopDetails, setShopDetails] = useState([])

    const [value, setValue] = useState('shop');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(() => {
        if (params.username) {
            vendors.forEach(vendor => {
                if (vendor.username === params.username) setShopDetails(vendor)
            })
        }
    })

    return (
        <div className="vendor_home">
            <div className="vendor_details">
                
                <img src={shopDetails.logo} alt=""/>
                <h5>{shopDetails.company}</h5>
                <h6>Contact: {shopDetails.mobile}</h6>
                <h6>Email: {shopDetails.email}</h6>
                <h6>Address: {shopDetails.address}</h6>
            </div>

            {/* <div className="vendor_products">
                <VendorProducts/>
            </div> */}
            <div className="vendor_products">
                <Box sx={{ width: '100%', bgcolor: "background.paper" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="Shop" value="shop" />
                                <Tab label="Group Buys" value="groupBuys" />
                               
                            </TabList>
                        </Box>
                        <TabPanel value="shop"><VendorProducts/></TabPanel>
                        <TabPanel value="groupBuys"><VendorGroupBuys/></TabPanel>
                        
                    </TabContext>
                </Box>
            </div>
        </div>
    );
}

export default ShopDetails;