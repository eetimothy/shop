import './Loading.css'

// const Loading = () => {
//     return ( 
//         <div className="load-page">
//             <div className="loader">
//                 <div>
//                     <div>
//                         <div>
//                             <div>
//                                 <div>
//                                     <div>
//                                         <div></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>    
//         </div>
//      );
// }

// export default Loading;

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <div className="load-page">
            <div className="loader">
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <Box sx={{ display: 'flex', animationDuration: '650ms' }}>
                                        <CircularProgress />
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}