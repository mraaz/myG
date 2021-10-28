import React,{useState,useEffect} from "react";
import Cell from './Cell';
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";



export default function TableComponent ({data}) {
    const [rows,setRows] = useState([]);
    const [sortableStatus,SetSortableStatus] = useState(false);
    if(data.items == "undefined"){
        return 'No Data Found !'
    }

    useEffect(()=>{
        setRows(data.items)
    },[])

const handleSortable = (e,header) =>{
    const data = [...rows];
    data.sort((a,b)=>{
        if(sortableStatus){
            return b[header]-a[header];
        } else {
            return a[header]-b[header];
        }
    })
    setRows(data)
    SetSortableStatus(!sortableStatus)
}

    return (
        <table>
            <TableHeader 
                header = {data.header} 
                handleSortable={handleSortable} 
                sortableStatus={sortableStatus}
            />
            <TableBody 
                header = {data.header} 
                body = {rows} 
            />
        </table>
    );
}