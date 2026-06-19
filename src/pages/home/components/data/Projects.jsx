import { useState, useEffect, useContext, memo } from "react";
import ReactDOM from "react-dom";
import { Context_API } from "../../../../App";
import { Show_Data_API } from "../../Home";
import Project_Portal from "../../../../portals/Project_Portal";

function Projects({ show_dashboard }) {

    const { projects_collection, set_projects_collection } = useContext(Context_API);
    const { selected_project, set_selected_project } = useContext(Show_Data_API);

    const [is_project_portal_open, set_is_project_portal_open] = useState(false);
    const [editing_index, set_editing_index] = useState(null);
    const [edited_name, set_edited_name] = useState("");
    const [edited_description, set_edited_description] = useState("");

    useEffect(() => {
        localStorage.setItem("pms-projects-collection", JSON.stringify(projects_collection));
    }, [projects_collection]);

    function open_project_portal() {
        set_is_project_portal_open(true);
    };

    function go_to_dashboard(project_name) {
        set_selected_project(project_name);
        show_dashboard(project_name);
    };

    function edit_project(project, index) {
        set_editing_index(index);
        set_edited_name(project.project_name);
        set_edited_description(project.project_description);
    };

    function update_project(project, index) {
        let updated_projects_collection = [...projects_collection];
        updated_projects_collection[index] = {
            ...updated_projects_collection[index],
            project_name: edited_name,
            project_description: edited_description
        };
        set_projects_collection(updated_projects_collection);
        set_editing_index(null);
    };

    function cancel_edit() {
        set_editing_index(null);
    };

    function remove_project(project, index) {
        if (project.project_name == selected_project) {
            set_selected_project("No Project Selected!");
        }
        let updated_projects_collection = [...projects_collection];
        updated_projects_collection.splice(index, 1);
        set_projects_collection(updated_projects_collection);
    };

    return (

        <>

            <div className="project h-full w-full flex items-center justify-start flex-col">

                <div className="project-options-box h-auto w-full bg-sky-50 border border-slate-200 rounded-3xl shadow-sm p-4 flex items-center justify-between">

                    <span className="text-lg font-bold">{projects_collection.length} Projects</span>

                    <button className="add-new-project-button border border-fuchsia-500 bg-fuchsia-500 text-white rounded-3xl h-auto w-auto px-4 py-2 shadow-sm hover:bg-fuchsia-600" onClick={open_project_portal}>Add New Project</button>

                </div>

                {

                    is_project_portal_open

                    &&

                    ReactDOM.createPortal(
                        <Project_Portal set_is_project_portal_open={set_is_project_portal_open} />,
                        document.getElementById("project-portal")
                    )

                }

                <div className="projects-list-box border border-slate-200 rounded-3xl overflow-auto h-full w-full p-4 bg-slate-50 flex items-start justify-start gap-8 flex-col">

                    {projects_collection.length == 0 && <p className="h-auto w-full text-center">No Projects Available!</p>}

                    {projects_collection.map((project, index) => {

                        return (

                            <div className="project-list h-auto w-full" key={project.project_id}>

                                {

                                    editing_index == index

                                        ?

                                        (

                                            <>

                                                <div className="project-box border rounded-lg h-auto w-full text-start p-5 bg-slate-100">

                                                    <div className="project-id-box h-auto w-full p-1 flex items-center justify-start">

                                                        <p className="h-full w-[20%] p-1 font-bold">Project ID : </p>

                                                        <p className="border rounded-lg h-full w-[80%] p-1">{project.project_id || "N/A"}</p>

                                                    </div>

                                                    <div className="project-name-box h-auto w-full p-1 pr-2 flex items-center justify-start">

                                                        <p className="h-full w-[20%] p-1 font-bold">Project Name - </p>

                                                        <input className="border rounded-lg outline-none h-full w-[80%] p-2" type="text" placeholder="Enter Project Name" value={edited_name} onChange={(e) => set_edited_name(e.target.value)} />

                                                    </div>

                                                    <div className="project-description-box h-auto w-full p-1 flex items-center justify-start">

                                                        <p className="h-full w-[20%] p-1 font-bold">Project Description - </p>

                                                        <textarea className="border rounded-lg outline-none [field-sizing:content] w-[80%] p-2" placeholder="Enter Project Description" value={edited_description} onChange={(e) => set_edited_description(e.target.value)} />

                                                    </div>

                                                </div>

                                                <div className="project-buttons-box mt-2 flex items-center justify-center gap-2">

                                                    <button className="update-project-button border border-slate-200 rounded-lg h-auto w-1/2 py-1 hover:border-none hover:bg-slate-100" onClick={() => update_project(project, index)}>Update</button>

                                                    <button className="cancel-edit-button border border-slate-200 rounded-lg h-auto w-1/2 py-1 hover:border-none hover:bg-slate-100" onClick={cancel_edit}>Cancel</button>

                                                </div>

                                            </>

                                        )

                                        :

                                        (

                                            <>

                                                <div className="project-box border rounded-lg h-auto w-full text-start p-5 bg-slate-100 cursor-pointer flex flex-col items-center justify-center gap-2" onClick={() => go_to_dashboard(project.project_name)}>

                                                    <div className="project-id-box h-auto w-full flex items-center justify-start">

                                                        <p className="h-full w-[25%] p-1 font-bold">Project ID : </p>

                                                        <p className="border rounded-lg h-full w-[75%] p-1">{project.project_id || "N/A"}</p>

                                                    </div>

                                                    <div className="project-name-box h-auto w-full flex items-center justify-start">

                                                        <p className="h-full w-[25%] p-1 font-bold">Project Name - </p>

                                                        <p className="border rounded-lg h-full w-[75%] p-1">{project.project_name || "N/A"}</p>

                                                    </div>

                                                    <div className="project-description-box h-auto w-full flex items-center justify-start">

                                                        <p className="h-full w-[25%] p-1 font-bold">Project Description - </p>

                                                        <p className="border rounded-lg h-full w-[75%] p-1 whitespace-pre-wrap">{project.project_description || "N/A"}</p>

                                                    </div>

                                                </div>

                                                <div className="project-buttons-box mt-2 flex items-center justify-center gap-2">

                                                    <button className="edit-project-button border border-slate-200 rounded-lg h-auto w-1/2 py-1 hover:border-none hover:bg-slate-100" onClick={() => edit_project(project, index)}>Edit</button>

                                                    <button className="remove-project-button border border-slate-200 rounded-lg h-auto w-1/2 py-1 hover:border-none hover:bg-slate-100" onClick={() => remove_project(project, index)}>Remove</button>

                                                </div>

                                            </>

                                        )

                                }

                            </div>

                        );

                    })}

                </div>

            </div>

            <div id="project-portal"></div>

        </>

    );

};

export default memo(Projects);