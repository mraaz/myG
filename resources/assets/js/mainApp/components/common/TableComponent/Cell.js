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
        {content} <img src="https://myG.gg/platform_icons/ic_messenger_chevron_down.svg" />
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