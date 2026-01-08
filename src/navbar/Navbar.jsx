import Icon_Box from "./sub-components/Icon_Box";
import Search_Box from "./sub-components/Search_Box";

function Navbar() {

    return (

        <div className="navbar h-[10vh] w-full px-20 bg-[rgba(0,0,250,0.700)] flex items-center justify-between">

            <Icon_Box />

            <Search_Box />

        </div>

    );

};

export default Navbar