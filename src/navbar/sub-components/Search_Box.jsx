import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Search_Box() {

    const navigate = useNavigate();
    const location = useLocation();

    const [query, set_query] = useState("");

    useEffect(() => {
        if (location.pathname.startsWith("/search")) {
            let search_path_query = location.pathname.replace("/search/", "");
            set_query(decodeURIComponent(search_path_query));
        } else {
            set_query("");
        }
    }, [location.pathname]);

    function search_tickets() {
        if (query !== "") {
            navigate(`search/${encodeURIComponent(query)}`);
        }
        else {
            alert("Please Enter A Search Query!");
            return;
        }
    };

    return (

        <div className="search-project-box h-[8vh] w-auto flex items-center justify-center gap-3">

            <input className="search-project-input rounded-3xl h-auto w-[25rem] px-3 py-2 outline-none bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400" type="text" placeholder="Search" value={query} onChange={(e) => set_query(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") search_tickets(); }} />

            <button className="search-project-button border border-sky-500 rounded-3xl h-auto w-[5rem] p-2 bg-sky-500 text-white shadow-sm hover:bg-sky-600 transition" onClick={search_tickets}>Search</button>

        </div>

    );

};

export default Search_Box;