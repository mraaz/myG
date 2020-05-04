
import React from 'react';

export default function Divider(name, expanded, onClick, renderFunction) {
  const chevronType = expanded ? 'down' : 'right';
  return (
    <div key={name} className="messenger-body-section">
      <div className="messenger-body-section-header-light clickable"
        onClick={onClick}
      >
        <p className="messenger-body-section-header-name">{name}</p>
        <div className="messenger-body-section-header-info">
          <div
            className="messenger-body-section-header-icon"
            style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Chat/ic_messenger_chevron_${chevronType}.svg')` }}
          />
        </div>
      </div>
      {expanded && (
        <div className="messenger-body-divider-content">
          {renderFunction()}
        </div>
      )}
    </div >
  );
}