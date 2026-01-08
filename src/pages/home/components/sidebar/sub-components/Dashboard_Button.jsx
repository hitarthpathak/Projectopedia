import { useContext } from "react";
import { Show_Data_API } from "../../../../../pages/home/Home";

function Dashboard_Button() {

    const { show_dashboard, selected_project } = useContext(Show_Data_API);

    return (

        <>

            <button className="dashboard-button border border-[rgba(0,0,250,0.700)] rounded-lg hover:bg-[rgba(0,0,250,0.200)] hover:border-none h-auto w-full p-4" onClick={() => show_dashboard(selected_project)}>Dashboard</button>

        </>

    );

};

export default Dashboard_Button;