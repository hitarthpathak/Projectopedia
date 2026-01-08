import { useContext } from "react";
import { Show_Data_API } from "../../../../../pages/home/Home";

function Projects_Button() {

    const { show_projects } = useContext(Show_Data_API);

    return (

        <>

            <button className="projects-button border border-[rgba(0,0,250,0.700)] rounded-lg hover:bg-[rgba(0,0,250,0.200)] hover:border-none h-auto w-full p-4" onClick={show_projects}>Projects</button>

        </>

    );

};

export default Projects_Button;