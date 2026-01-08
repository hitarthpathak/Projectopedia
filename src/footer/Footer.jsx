import { Link } from "react-router-dom";

function Footer() {

    return (

        <div className="footer h-[10vh] w-full px-20 bg-[rgba(0,0,250,0.700)] flex items-center justify-center">

            <Link to="https://hitarthpathak.github.io/" target="_blank">

                <p className="hover:underline hover:text-white">© Hitarth Pathak</p>

            </Link>

        </div>

    );

};

export default Footer;