import { Link } from "react-router-dom";

function Footer() {

    return (

        <div className="footer h-[10vh] w-full px-20 bg-slate-50 border-t border-slate-200 flex items-center justify-center">

            <Link to="https://hitarthpathak.github.io/" target="_blank">

                <p className="creator text-slate-500 hover:underline hover:text-slate-900">© Hitarth Pathak</p>

            </Link>

        </div>

    );

};

export default Footer;