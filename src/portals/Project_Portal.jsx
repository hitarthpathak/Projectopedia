import { useContext } from "react";
import { Context_API } from "../App";

function Project_Portal({ set_is_project_portal_open }) {

    const { set_projects_collection, project_name, set_project_name, project_description, set_project_description } = useContext(Context_API);

    function add_project(e) {
        e.preventDefault();
        if ((project_name != "")) {
            let new_project_data = {
                project_id: Date.now(),
                project_name: project_name,
                project_description: project_description,
                project_tickets: []
            };
            set_projects_collection((prev) => [...prev, new_project_data]);
            set_project_name("");
            set_project_description("");
        }
        else {
            alert("Add Project Name!");
            return;
        }
        close_project_portal();
    };

    function close_project_portal() {
        set_is_project_portal_open(false);
    };

    return (

        <>

            <div className="project-portal-background-box fixed top-0 left-0 right-0 bottom-0 bg-slate-900/20 z-0"></div>

            <div className="project-portal-box rounded-3xl shadow-2xl shadow-slate-300/30 z-10 h-auto w-[50%] p-6 fixed top-[30%] left-[25%] bg-white flex items-center justify-center flex-col gap-3">

                <div className="project-portal-top h-auto w-full flex items-center justify-between">

                    <h1 className="h-full w-auto text-3xl text-center">Add New Project</h1>

                    <button className="border rounded-lg h-full w-auto px-4 py-2 bg-slate-100" onClick={close_project_portal}>X</button>

                </div>

                <hr className="border-slate-200 h-auto w-full" />

                <form className="project-portal-form h-auto w-full flex items-center justify-center flex-col gap-3">

                    <div className="project-name-box h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Project Name - </p>

                        <input className="border rounded-lg outline-none h-full w-[70%] p-2" type="text" placeholder="Enter Project Name" value={project_name} onChange={(e) => set_project_name(e.target.value)} />

                    </div>

                    <div className="project-description-box h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Project Description - </p>

                        <textarea className="border rounded-lg outline-none min-h-[5rem] w-[70%] p-2" placeholder="Enter Project Description" value={project_description} onChange={(e) => set_project_description(e.target.value)} />

                    </div>

                    <button className="add-project-button border border-fuchsia-500 bg-fuchsia-500 text-white rounded-3xl h-auto w-full m-auto px-4 py-2 shadow-sm hover:bg-fuchsia-600 transition" onClick={add_project}>Add Project</button>

                </form>

            </div>

        </>

    );

};

export default Project_Portal;