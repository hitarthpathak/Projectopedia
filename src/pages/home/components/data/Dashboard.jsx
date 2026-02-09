import { useState, useContext, memo } from "react";
import ReactDOM from "react-dom";
import { Context_API } from "../../../../App";
import { Show_Data_API } from "../../Home";
import useTicket from "../../../../hooks/useTicket";
import Ticket_Portal from "../../../../portals/Ticket_Portal";
import Ticket from "./Ticket";
import Column from "./Column";

function Dashboard() {

    const { projects_collection } = useContext(Context_API);
    const { selected_project, set_selected_project } = useContext(Show_Data_API);

    const { drag_start, drag_drop, allow_drop, is_loaded } = useTicket(selected_project);

    const [query, set_query] = useState("");
    const [is_ticket_portal_open, set_is_ticket_portal_open] = useState(false);

    let selected_project_data = projects_collection.find((project) => project.project_name == selected_project);

    function open_ticket_portal() {
        set_is_ticket_portal_open(true);
    };

    function render_tickets(status) {
        let tickets = selected_project_data?.project_tickets || [];
        let filtered_tickets = tickets.filter((ticket) => ticket.ticket_status == status)
        let searched_tickets = filtered_tickets.filter((ticket) => ticket.ticket_name.toLowerCase().includes(query.toLowerCase()));
        return searched_tickets.map((ticket) => (
            <div className="h-auto w-full" key={ticket.ticket_id}>
                <Ticket ticket_id={ticket.ticket_id} ticket_name={ticket.ticket_name} ticket_description={ticket.ticket_description} ticket_status={ticket.ticket_status} ticket_priority={ticket.ticket_priority} ticket_deadline={ticket.ticket_deadline} drag_start={() => drag_start(ticket.ticket_id)} />
            </div>
        ));
    };

    if (is_loaded) return (

        <>

            <div className="dashboard-box h-full w-full flex items-center justify-center flex-col">

                <div className="project-info-box h-auto w-full p-4 flex items-start justify-between">

                    <div className="project-info-box-details h-auto w-[50%] flex items-center justify-center flex-col">

                        <p className="h-auto w-full text-lg font-bold">{selected_project_data ? selected_project_data.project_name.toUpperCase() : "NO PROJECT SELECTED!"}</p>

                    </div>

                    <div className="project-info-box-options h-auto w-[50%] flex items-center justify-end gap-3">

                        <button className="add-new-ticket-button border border-[rgba(0,0,250,0.700)] rounded-lg h-auto w-auto p-2 hover:border-none hover:bg-[rgba(0,0,250,0.200)] disabled:cursor-not-allowed" onClick={open_ticket_portal} disabled={!selected_project_data}>Add New Ticket</button>

                        <select className="project-selection rounded-lg outline-none h-auto w-auto p-3 bg-[rgba(0,0,250,0.300)] cursor-pointer" value={selected_project_data ? selected_project_data.project_name : "NO PROJECT SELECTED!"} onChange={(e) => set_selected_project(e.target.value)}>

                            {!selected_project_data && <option>NO PROJECT SELECTED!</option>}

                            {

                                projects_collection.map((project) => (

                                    <option key={project.project_id}>{project.project_name}</option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                {

                    is_ticket_portal_open

                    &&

                    ReactDOM.createPortal(
                        <Ticket_Portal set_is_ticket_portal_open={set_is_ticket_portal_open} selected_project_data={selected_project_data} />,
                        document.getElementById("ticket-portal")
                    )

                }

                <hr className="border-[rgba(0,0,250,0.700)] h-auto w-full" />

                <input className="search-ticket-input rounded-lg h-auto w-[99%] m-2 p-2 outline-none" placeholder="Search Tickets" type="text" onChange={(e) => set_query(e.target.value)} />

                <hr className="border-[rgba(0,0,250,0.700)] h-auto w-full" />

                <div className="project-status-box h-full w-full p-4 flex items-start justify-start overflow-auto gap-4">

                    <Column heading="PLANNING" status="Planning" onDrop={drag_drop} allow_drop={allow_drop} tickets={render_tickets("Planning")} />

                    <Column heading="STARTED" status="Started" onDrop={drag_drop} allow_drop={allow_drop} tickets={render_tickets("Started")} />

                    <Column heading="ONGOING" status="Ongoing" onDrop={drag_drop} allow_drop={allow_drop} tickets={render_tickets("Ongoing")} />

                    <Column heading="TESTING" status="Testing" onDrop={drag_drop} allow_drop={allow_drop} tickets={render_tickets("Testing")} />

                    <Column heading="COMPLETED" status="Completed" onDrop={drag_drop} allow_drop={allow_drop} tickets={render_tickets("Completed")} />

                </div>

            </div>

            <div id="ticket-portal"></div>

        </>

    );

};

export default memo(Dashboard);