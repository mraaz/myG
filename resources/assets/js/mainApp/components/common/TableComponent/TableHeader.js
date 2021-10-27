import React from "react";



export default function TableHeader ({header=[]}) {

console.log("header   ",header);
    return (
        <thead>
            <tr>
                {Object.keys(header).map(head=>{
                    return <th>{header[head]}</th>
                })}
                
            </tr>
        </thead>
    );
}