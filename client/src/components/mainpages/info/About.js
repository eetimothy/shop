import Logo from '../../headers/images/glogo_nobg.png'

const About = () => {
    return (
        <div>

            <div className="company_title" style={{ display: "flex", justifyContent: "center" }}>
                <img src={Logo} alt="" width="100px" />
            </div>

            <div className="company_content" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                <p>
                    <strong><em>Group Up</em></strong> is a marketplace where customers can start groups or join existing group buys.
                    It embraces social commerce where users can benefit from economy of scale by grouping up
                    with friends to make purchases at a discount or help one another fulfill minimum order quantities.
                </p>
            </div>


            <div className="company_title" style={{ display: "flex", justifyContent: "center" }}>
                <h2>group-buy.io</h2>
            </div>

            <div className="company_content" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                <p>
                <strong><em>Group-buy.io</em></strong> provides a solution for retailers to increase advertising returns by enabling
                    group buys for their products listed on our marketplace or even on their own websites - harnessing
                    the potential of virality through social media and messaging platforms.
                </p>
            </div>
        </div>
    );
}

export default About;


