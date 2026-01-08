import Dashboard_Button from "./sub-components/Dashboard_Button";
import Projects_Button from "./sub-components/Projects_Button";

function Sidebar() {

    return (

        <div className="sidebar h-full w-[15%] p-4 bg-[rgba(0,0,250,0.400)] flex items-center justify-start flex-col gap-4">

            <Dashboard_Button />

            <Projects_Button />

        </div>

    );

};

export default Sidebar;