import * as React from 'react';

export default function Cell({
    content,
    fixed,
    header,
  }) {
  
    const fixedClass = fixed ? ' Cell-fixed' : '';
    const headerClass = header ? ' Cell-header' : '';
    
    const className = (
      `Cell${fixedClass}${headerClass}`
    );  
  
    const cellMarkup = header ? (
      // Add scope="col" to thead cells
      <th scope="col" className={className}>
        {content}
      </th>
    ) : (
      fixed ? (
        // Add scope="row" to the first cell of each tbody row
        <th scope="row" className={className}>
          {content}
        </th>
      ) : (
        <td className={className}>
          {content}
        </td>
      )
    );
  
    return (cellMarkup);
  }