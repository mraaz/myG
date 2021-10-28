import React,{Fragment} from "react";



export default function TableHeader ({header=[],handleSortable,sortableStatus}) {


const handleSortableClick = (e,header) =>{
    handleSortable(e,header)
}
    return (
        <thead>
            <tr>
                {Object.keys(header).map(head=>{
                    return <th onClick={(e)=>handleSortableClick(e,head,sortableStatus)}>{header[head]}</th>
                })}
                
            </tr>
        </thead>
    );
}