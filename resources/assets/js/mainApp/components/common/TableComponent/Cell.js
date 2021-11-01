import * as React from 'react';

export default function Cell({
    content,
    fixed,
    header,
    handleSortable,
    headerkey,
  }) {
  
    const fixedClass = fixed ? ' Cell-fixed' : '';
    const headerClass = header ? ' Cell-header' : '';
    const handleSortableFn = (e,head)=>{
      if(typeof handleSortable =="function"){
        handleSortable(e,head)
      }
    }
    
    const className = (
      `Cell${fixedClass}${headerClass}`
    );  
  
    const cellMarkup = header ? (
      // Add scope="col" to thead cells
      <th onClick={e=>handleSortableFn(e,headerkey)} scope="col" className={className}>
        {content} <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      </th>
    ) : (
      fixed ? (
        // Add scope="row" to the first cell of each tbody row
        <th scope="row" className={className}>
          {content}
        </th>
      ) : (
        <td  className={className}>
          {content}
        </td>
      )
    );
  
    return (cellMarkup);
  }