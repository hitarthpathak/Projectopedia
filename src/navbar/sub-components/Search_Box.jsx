import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search_Box() {

    const navigate = useNavigate();
    const [query, set_query] = useState("");

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

        <div className="h-[8vh] w-auto flex items-center justify-center gap-3">

            <input className="search-project-input rounded-lg h-auto w-[25rem] p-2 outline-none" type="text" placeholder="Search" value={query} onChange={(e) => set_query(e.target.value)} />

            <button className="border rounded-lg h-auto w-[5rem] p-2 text-white hover:border-none hover:bg-[rgba(0,0,250,0.700)]" onClick={search_tickets}>Search</button>

        </div>

    );

};

export default Search_Box;