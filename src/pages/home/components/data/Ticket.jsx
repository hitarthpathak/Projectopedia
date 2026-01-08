import { Link } from "react-router-dom";

function Ticket({ drag_start, ticket_id, ticket_name, ticket_description, ticket_status, ticket_priority, ticket_deadline }) {

    const priority_colors = {
        High: "red",
        Moderate: "yellow",
        Low: "green"
    };

    return (

        <Link to={`/ticket/${ticket_id}`}>

            <div className="ticket rounded-lg h-auto w-full text-start p-5 bg-[rgba(0,0,250,0.200)]" draggable={true} onDragStart={drag_start}>

                <p><strong>ID :</strong> {ticket_id || "N/A"}</p>

                <p><strong>Name :</strong> {ticket_name || "N/A"}</p>

                <p><strong>Description :</strong> {ticket_description || "N/A"}</p>

                <p><strong>Status :</strong> {ticket_status || "N/A"}</p>

                <p><strong>Priority :</strong> <span style={{ color: priority_colors[ticket_priority] }}>{ticket_priority || "N/A"}</span> </p>

                <p><strong>Deadline :</strong> {ticket_deadline || "N/A"}</p>

            </div>

        </Link>

    );

};

export default Ticket;