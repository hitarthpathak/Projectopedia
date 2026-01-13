import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context_API } from "../App";

function Ticket_Page() {

    const priority_colors = {
        High: "red",
        Moderate: "yellow",
        Low: "green"
    };

    const { ticket_id } = useParams();
    const { projects_collection, set_projects_collection } = useContext(Context_API);
    const navigate = useNavigate();

    let project_of_ticket = projects_collection.find((project) => {
        return project.project_tickets.some((ticket) => {
            return ticket.ticket_id == Number(ticket_id);
        });
    });

    let ticket = project_of_ticket?.project_tickets.find((ticket) => ticket.ticket_id == Number(ticket_id));

    const [is_editing, set_is_editing] = useState(false);
    const [edited_name, set_edited_name] = useState(ticket?.ticket_name || "");
    const [edited_description, set_edited_description] = useState(ticket?.ticket_description || "");
    const [edited_priority, set_edited_priority] = useState(ticket?.ticket_priority || "");
    const [edited_deadline, set_edited_deadline] = useState(ticket?.ticket_deadline || "");

    function edit_ticket() {
        set_is_editing(true);
    };

    function update_ticket() {
        let updated_projects = projects_collection.map(((project) => {
            if (project.project_name === project_of_ticket.project_name) {
                let updated_tickets = project.project_tickets.map((ticket) => {
                    if (ticket.ticket_id == Number(ticket_id)) {
                        return {
                            ...ticket,
                            ticket_name: edited_name,
                            ticket_description: edited_description,
                            ticket_priority: edited_priority,
                            ticket_deadline: edited_deadline
                        };
                    }
                    return ticket;
                });
                return {
                    ...project,
                    project_tickets: updated_tickets
                };
            }
            return project;
        }));
        set_projects_collection(updated_projects);
        localStorage.setItem("pms-projects-collection", JSON.stringify(updated_projects));
        set_is_editing(false);
    };

    function remove_deadline() {
        set_edited_deadline("");
    };

    function delete_ticket() {
        let updated_projects = projects_collection.map((project) => {
            if (project.project_name === project_of_ticket.project_name) {
                let filtered_tickets = project.project_tickets.filter((ticket) => ticket.ticket_id != Number(ticket_id));
                return { ...project, project_tickets: filtered_tickets };
            }
            return project;
        });
        set_projects_collection(updated_projects);
        navigate("/");
    };

    if (!ticket) {

        return (

            <h1 className="h-[80vh] w-full bg-[rgba(0,0,250,0.200)] flex items-center justify-center text-3xl">Ticket ({ticket_id}) Is Not Found!</h1>

        );

    };

    return (

        <div className="ticket-page overflow-auto h-[80vh] w-full p-5 bg-[rgba(0,0,250,0.200)]">

            <h1 className="text-2xl text-center font-bold">Ticket Page</h1>

            <hr className="border-[rgba(0,0,250,0.700)] h-auto w-full my-5" />

            {

                is_editing

                    ?

                    (

                        <div className="h-auto w-full flex items-center justify-start gap-2 flex-col">

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket ID : </p>

                                <p className="h-full w-[80%] p-2">{ticket_id || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 pr-2 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Name - </p>

                                <input className="rounded-lg outline-none h-full w-[80%] p-2" type="text" placeholder="Enter Ticket Name" value={edited_name} onChange={(e) => set_edited_name(e.target.value)} />

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-2 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Description - </p>

                                <textarea className="rounded-lg outline-none min-h-[5rem] w-[80%] p-2" placeholder="Enter Ticket Description" value={edited_description} onChange={(e) => set_edited_description(e.target.value)} />

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Status : </p>

                                <p className="h-full w-[80%] p-2">{ticket.ticket_status || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-2 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Priority : </p>

                                <select className="rounded-lg outline-none h-full w-auto p-2" value={edited_priority} onChange={(e) => set_edited_priority(e.target.value)}>

                                    <option value="">Please Select Priority</option>

                                    <option value="High">High</option>

                                    <option value="Moderate">Moderate</option>

                                    <option value="Low">Low</option>

                                </select>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Deadline : </p>

                                <div className="h-full w-[80%] py-2 flex items-center justify-start gap-3">

                                    <input className="rounded-lg outline-none h-full w-auto p-2" type="date" value={edited_deadline} onChange={(e) => set_edited_deadline(e.target.value)} />

                                    <button className="border border-[rgba(0,0,250,0.700)] rounded-lg h-full w-auto p-2 hover:border-none hover:bg-[rgba(0,0,250,0.200)]" onClick={remove_deadline} disabled={!edited_deadline}>Remove Deadline</button>

                                </div>

                            </div>

                            <hr style={{ margin: "1rem 0" }} />

                            <div className="h-auto w-full flex items-center justify-center gap-5">

                                <button className="rounded-lg h-auto w-auto p-3 bg-green-500" onClick={update_ticket}>Update Ticket</button>

                                <button className="rounded-lg h-auto w-auto p-3 bg-red-500" onClick={delete_ticket}>Delete Ticket</button>

                            </div>

                        </div>

                    )

                    :

                    (

                        <div className="h-auto w-full flex items-center justify-start gap-2 flex-col">

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket ID : </p>

                                <p className="h-full w-[80%] p-2">{ticket_id || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Name : </p>

                                <p className="h-full w-[80%] p-2">{ticket.ticket_name || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Description : </p>

                                <p className="h-full w-[80%] p-2 whitespace-pre-wrap">{ticket.ticket_description || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Status : </p>

                                <p className="h-full w-[80%] p-2">{ticket.ticket_status || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Priority : </p>

                                <p className="h-full w-[80%] p-2" style={{ color: priority_colors[ticket.ticket_priority] }}>{ticket.ticket_priority || "N/A"}</p>

                            </div>

                            <div className="rounded-lg h-auto w-full bg-[rgba(0,0,250,0.200)] p-1 flex items-center justify-start">

                                <p className="h-full w-[20%] p-2 font-bold">Ticket Deadline : </p>

                                <p className="h-full w-[80%] p-2">{ticket.ticket_deadline || "N/A"}</p>

                            </div>

                            <hr className="border-[rgba(0,0,250,0.700)] h-auto w-full my-5" />

                            <div className="h-auto w-full flex items-center justify-center gap-5">

                                <button className="rounded-lg h-auto w-auto p-3 bg-green-500" onClick={edit_ticket}>Edit Ticket</button>

                                <button className="rounded-lg h-auto w-auto p-3 bg-red-500" onClick={delete_ticket}>Delete Ticket</button>

                            </div>

                        </div>

                    )

            }

        </div>

    );

};

export default Ticket_Page;