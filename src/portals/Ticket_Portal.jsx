import { useState, useContext } from "react";
import { Context_API } from "../App";

function Ticket_Portal({ set_is_ticket_portal_open, selected_project_data }) {

    const { set_projects_collection } = useContext(Context_API);

    const [ticket_name, set_ticket_name] = useState("");
    const [ticket_description, set_ticket_description] = useState("");
    const [ticket_status, set_ticket_status] = useState("Planning");
    const [ticket_priority, set_ticket_priority] = useState("");
    const [ticket_deadline, set_ticket_deadline] = useState("");

    function add_ticket(e) {
        e.preventDefault();
        if ((ticket_name != "")) {
            let new_ticket_data = {
                ticket_id: Date.now(),
                ticket_name: ticket_name,
                ticket_description: ticket_description,
                ticket_status: "Planning",
                ticket_priority: ticket_priority,
                ticket_deadline: ticket_deadline
            };
            set_projects_collection((prev) => {
                return prev.map((project) => {
                    if (project.project_id == selected_project_data.project_id) {
                        return {
                            ...project,
                            project_tickets: [...project.project_tickets, new_ticket_data]
                        };
                    }
                    return project;
                });
            });
            set_ticket_name("");
            set_ticket_description("");
            set_ticket_status("");
            set_ticket_priority("");
            set_ticket_deadline("");
        }
        else {
            alert("Add Ticket Name!");
        }
        close_ticket_portal();
    };

    function close_ticket_portal() {
        set_is_ticket_portal_open(false);
    };

    function remove_ticket_deadline(e) {
        e.preventDefault();
        set_ticket_deadline("");
    };

    return (

        <>

            <div className="ticket-portal-background-box fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-0"></div>

            <div className="ticket-form-box rounded-lg z-10 h-auto w-[50%] p-6 fixed top-[20%] left-[25%] bg-[rgba(100,100,250,1)] flex items-center justify-center flex-col gap-3">

                <div className="ticket-portal-top h-auto w-full flex items-center justify-between">

                    <h1 className="h-full w-auto text-3xl text-center">Add New Ticket</h1>

                    <button className="rounded-lg h-full w-auto px-4 py-2 bg-[rgba(0,0,250,0.300)]" onClick={close_ticket_portal}>X</button>

                </div>

                <hr className="border-[rgba(0,0,250,0.700)] h-auto w-full" />

                <form className="ticket-portal-form h-auto w-full flex items-center justify-center flex-col gap-3">

                    <div className="h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Ticket Name - </p>

                        <input className="rounded-lg outline-none h-full w-[70%] p-2" type="text" placeholder="Enter ticket Name" value={ticket_name} onChange={(e) => set_ticket_name(e.target.value)} />

                    </div>

                    <div className="h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Ticket Description - </p>

                        <textarea className="rounded-lg outline-none min-h-[5rem] w-[70%] p-2" placeholder="Enter ticket Description" value={ticket_description} onChange={(e) => set_ticket_description(e.target.value)} />

                    </div>

                    <div className="h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Ticket Status - </p>

                        <span className="h-full w-[70%] flex items-center justify-start"><i>{ticket_status}</i></span>

                    </div>

                    <div className="h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Ticket Priority - </p>

                        <select className="rounded-lg outline-none h-full w-[70%] p-2" value={ticket_priority} onChange={(e) => set_ticket_priority(e.target.value)}>

                            <option value="">Select Ticket Priority</option>

                            <option value="High">High</option>

                            <option value="Moderate">Moderate</option>

                            <option value="Low">Low</option>

                        </select>

                    </div>

                    <div className="h-auto w-full flex items-center justify-start">

                        <p className="h-full w-[30%] p-2 font-bold">Ticket Deadline - </p>

                        <div className="h-full w-[70%] flex items-center justify-center gap-3">

                            <input className="rounded-lg outline-none h-full w-[50%] p-1" type="date" value={ticket_deadline} onChange={(e) => set_ticket_deadline(e.target.value)} />

                            <button className="border border-[rgba(0,0,250,0.700)] rounded-lg h-full w-[50%] p-1 hover:border-none hover:bg-[rgba(0,0,250,0.200)]" onClick={remove_ticket_deadline}>Remove Deadline</button>

                        </div>

                    </div>

                </form>

                <button className="add-ticket-button border border-[rgba(0,0,250,0.700)] rounded-lg h-auto w-full m-auto p-2 hover:border-none hover:bg-[rgba(0,0,250,0.200)]" onClick={add_ticket}>Add Ticket</button>

            </div>

        </>

    );

};

export default Ticket_Portal;