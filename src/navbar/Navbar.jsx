import Icon_Box from "./sub-components/Icon_Box";
import Search_Box from "./sub-components/Search_Box";

function Navbar() {

    return (

        <div className="navbar h-[10vh] w-full px-20 bg-gradient-to-r from-sky-50 via-white to-fuchsia-50 border-b border-slate-200 shadow-sm flex items-center justify-between">

            <Icon_Box />

            <Search_Box />

        </div>

    );

};

export default Navbar;