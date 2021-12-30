import About from './About'
import Contact from './Contact'
import './Company.css'

const Company = () => {
    return ( 
        <div className="company_wrapper">
            <div className="page_wrapper">
            <About/>
            </div>

            <div className="page_wrapper">
                <Contact/>
            </div>
        </div>
     );
}
 
export default Company;