import { Link } from "react-router-dom";
import Icon from "/Icon.png";

function Icon_Box() {

    return (

        <Link to={"/"}>

            <div className="icon-box h-[8vh] w-auto flex items-center justify-center gap-7">

                <img className="icon h-full w-auto" src={Icon} alt="Image Not Available" />

                <h2 className="text-2xl text-sky-700 font-semibold">Projectopedia</h2>

            </div>

        </Link>

    );

};

export default Icon_Box;