import React,{Fragment} from "react";

export default function TableBody ({header,body}) {


    return (
        <tbody>
           {body && body.length && body.map(bItem=>{
               return (<tr>
                    {Object.keys(header).map(head=>{
                            return <td>{bItem[head]}</td>
                    })}
                    </tr>
                )
           })}
        </tbody>
    );
}