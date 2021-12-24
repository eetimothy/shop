import Hidden from '@mui/material/Hidden'

const NotFound = () => {
    return (
        <>
        <Hidden mdDown={true}>
         <div style={{ paddingTop: '20%', paddingLeft: '45%' }}>
        404 | Not Found
         </div> 
        </Hidden>

        <Hidden mdUp={true}>
         <div style={{ paddingTop: '50%', paddingLeft: '30%' }}>
        404 | Not Found
         </div> 
        </Hidden>
        </>
    );
}
 
export default NotFound;