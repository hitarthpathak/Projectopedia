import { useEffect, useState, useContext } from "react";
import { Context_API } from "../App";

function useTicket(selected_project) {

    const { projects_collection, set_projects_collection } = useContext(Context_API);
    const [dragged_ticket_id, set_dragged_ticket_id] = useState(null);
    const [is_loaded, set_is_loaded] = useState(false);

    useEffect(() => {
        set_is_loaded(true);
    }, [projects_collection]);

    useEffect(() => {
        localStorage.setItem("pms-projects-collection", JSON.stringify(projects_collection));
    }, [projects_collection]);

    function drag_start(ticket_id) {
        set_dragged_ticket_id(ticket_id);
    };

    function drag_drop(new_status) {
        if (!dragged_ticket_id || !selected_project) return;
        let updated_projects = projects_collection.map((project) => {
            if (project.project_name === selected_project) {
                let updated_tickets = project.project_tickets.map((ticket) => {
                    return ticket.ticket_id === dragged_ticket_id ? { ...ticket, ticket_status: new_status } : ticket
                });
                return { ...project, project_tickets: updated_tickets };
            }
            return project;
        })
        set_projects_collection(updated_projects);
        set_dragged_ticket_id(null);
    };

    function allow_drop(e) {
        e.preventDefault();
    };

    function load_tickets(status) {
        let projects = projects_collection.find((project) => project.project_name == selected_project);
        return projects ? projects.project_tickets.filter((ticket) => ticket.ticket_status == status) : [];
    };

    return { drag_start, drag_drop, allow_drop, load_tickets, is_loaded };

};

export default useTicket;