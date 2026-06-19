import { useContext } from "react";
import { Show_Data_API } from "../../../../../pages/home/Home";

function Projects_Button() {

    const { show_projects } = useContext(Show_Data_API);

    return (

        <>

            <button className="projects-button border border-slate-200 bg-white rounded-3xl hover:bg-sky-50 hover:border-sky-200 h-auto w-full p-4 transition" onClick={show_projects}>Projects</button>

        </>

    );

};

export default Projects_Button;