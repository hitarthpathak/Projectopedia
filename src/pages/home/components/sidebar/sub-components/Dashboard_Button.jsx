import { useContext } from "react";
import { Show_Data_API } from "../../../../../pages/home/Home";

function Dashboard_Button() {

    const { show_dashboard, selected_project } = useContext(Show_Data_API);

    return (

        <>

            <button className="dashboard-button border border-slate-200 bg-white rounded-3xl hover:bg-sky-50 hover:border-sky-200 h-auto w-full p-4 transition" onClick={() => show_dashboard(selected_project)}>Dashboard</button>

        </>

    );

};

export default Dashboard_Button;