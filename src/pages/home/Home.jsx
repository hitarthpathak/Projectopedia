import { useState, useEffect, useContext, createContext } from "react";
import { Context_API } from "../../../src/App";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/data/Dashboard";
import Projects from "./components/data/Projects";
import Loading from "../../loading/Loading";

export const Show_Data_API = createContext();

function Home() {

    const { projects_collection } = useContext(Context_API);

    const [data, set_data] = useState(() => {
        return localStorage.getItem("pms-selected-view") || "projects";
    });
    const [selected_project, set_selected_project] = useState(() => {
        let saved_project = localStorage.getItem("pms-selected-project");
        if (saved_project && projects_collection.some((project) => project.project_name == saved_project)) {
            return saved_project;
        }
        return "No Project Selected!";
    });
    const [loading, set_loading] = useState(false);

    useEffect(() => {
        localStorage.setItem("pms-selected-view", data);
    }, [data]);

    useEffect(() => {
        localStorage.setItem("pms-selected-project", selected_project);
    }, [selected_project]);

    function show_dashboard(project_name) {
        set_loading(true);
        set_data("");
        setTimeout(() => {
            if (projects_collection.length == 0) {
                set_selected_project("No Project Selected!");
            }
            else if (project_name) {
                set_selected_project(project_name);
            }
            else if (!selected_project || !projects_collection.some((project) => project.project_name == selected_project)) {
                set_selected_project("No Project Selected!");
            }
            set_data("dashboard");
            set_loading(false);
        }, 1000);
    };

    function show_projects() {
        set_loading(true);
        set_data("");
        setTimeout(() => {
            set_data("projects");
            set_loading(false);
        }, 1000);
    };

    return (

        <div className="h-[80vh] w-full flex items-start justify-center">

            <Show_Data_API.Provider value={{ data, set_data, selected_project, set_selected_project, show_dashboard, show_projects }} >

                <Sidebar />

                <div className="data-box h-full w-[85%] bg-[rgba(0,0,250,0.200)]">

                    {loading && <Loading />}

                    {data == "dashboard" && <Dashboard />}

                    {data == "projects" && <Projects show_dashboard={show_dashboard} />}

                </div>

            </Show_Data_API.Provider>

        </div>

    );

};

export default Home;