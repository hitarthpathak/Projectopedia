function Column({ heading, onDrop, allow_drop, status, tickets }) {

    return (

        <div className="column rounded-3xl min-h-full w-full pb-2 bg-white border border-slate-200 shadow-sm flex items-center justify-start flex-col gap-2" onDragOver={allow_drop} onDrop={() => onDrop(status)}>

            <h3 className="rounded-3xl h-auto w-full p-3 text-center font-bold bg-gradient-to-r from-sky-100 via-cyan-100 to-fuchsia-100 text-sky-700">{heading}</h3>

            {tickets}

        </div>

    );

};

export default Column;