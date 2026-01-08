function Column({ heading, onDrop, allow_drop, status, tickets }) {

    return (

        <div className="column rounded-lg min-h-full w-full pb-2 bg-[rgba(0,0,250,0.200)] flex items-center justify-start flex-col gap-2" onDragOver={allow_drop} onDrop={() => onDrop(status)}>

            <h3 className="rounded-lg h-auto w-full p-1 text-center font-bold bg-[rgba(0,0,250,0.300)]">{heading}</h3>

            {tickets}

        </div>

    );

};

export default Column;