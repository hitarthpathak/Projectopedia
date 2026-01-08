import { Link } from "react-router-dom";
import Icon from "/Icon.png";

function Icon_Box() {

    return (

        <Link to={"/"}>

            <div className="h-[8vh] w-auto flex items-center justify-center gap-7">

                <img className="h-full w-auto" src={Icon} alt="Image Not Available" />

                <h2 className="text-2xl text-white">Projectopedia</h2>

            </div>

        </Link>

    );

};

export default Icon_Box;