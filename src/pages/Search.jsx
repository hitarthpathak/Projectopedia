import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Search() {

    const navigate = useNavigate();
    const { search_query } = useParams();
    const decoded_query = decodeURIComponent(search_query).toLowerCase();

    const [searched_projects, set_searched_projects] = useState([]);

    useEffect(() => {
        let stored_projects = JSON.parse(localStorage.getItem("pms-projects-collection")) || [];
        let filtered_projects = stored_projects.filter((project) => {
            return (
                (project.project_name.toLowerCase().includes(decoded_query)) ||
                (project.project_description.toLowerCase().includes(decoded_query)));
        });
        set_searched_projects(filtered_projects);
    }, [decoded_query]);

    function go_to_dashboard(project_name) {
        localStorage.setItem("pms-selected-project", project_name);
        localStorage.setItem("pms-selected-view", "dashboard");
        navigate("/");
    };

    return (

        <div className="search overflow-auto h-[80vh] w-full p-5 bg-slate-50">

            <button className="back-to-dashboard-button border border-slate-200 rounded-lg h-auto w-auto p-3 hover:border-none hover:bg-slate-100" onClick={() => navigate("/")}>Back To Dashboard</button>

            <hr className="border-slate-200 h-auto w-full my-5" />

            <h1 className="mb-3">Search Results : {searched_projects.length}</h1>

            <div className="search-list flex items-start justify-start flex-wrap gap-3">

                {

                    searched_projects.length == 0

                        ?

                        (

                            <p className="m-auto">Projects Not Found!</p>

                        )

                        :

                        (

                            searched_projects.map((project) => {

                                return (

                                    <div className="project rounded-3xl h-auto w-full text-start p-5 bg-white border border-slate-200 shadow-sm cursor-pointer hover:bg-sky-50 transition" onClick={() => go_to_dashboard(project.project_name)} key={project.project_id}>

                                        <div className="project-id-box h-auto w-full flex items-center justify-start">

                                            <p className="h-full w-[25%] p-1 font-bold">Project ID : </p>

                                            <p className="h-full w-[75%] p-1">{project.project_id || "N/A"}</p>

                                        </div>

                                        <div className="project-name-box h-auto w-full flex items-center justify-start">

                                            <p className="h-full w-[25%] p-1 font-bold">Project Name - </p>

                                            <p className="h-full w-[75%] p-1">{project.project_name || "N/A"}</p>

                                        </div>

                                        <div className="project-description-box h-auto w-full flex items-center justify-start">

                                            <p className="h-full w-[25%] p-1 font-bold">Project Description - </p>

                                            <p className="h-full w-[75%] p-1">{project.project_description || "N/A"}</p>

                                        </div>

                                    </div>

                                );

                            })

                        )

                }

            </div>

        </div>

    );

};

export default Search;