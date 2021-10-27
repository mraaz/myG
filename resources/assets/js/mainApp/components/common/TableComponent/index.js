import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";



export default function TableComponent ({data}) {
    if(data.items == "undefined"){
        return 'No Data Found !'
    }
    return (
        <table>
            <TableHeader header = {data.header} />
            <TableBody header = {data.header} body = {data.items} />
        </table>
    );
}