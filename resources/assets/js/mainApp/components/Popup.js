import React from 'react';

export default class Popop extends React.PureComponent {
  render() {
    const {
      show,
      position,
      header,
      confirmAction,
      denyAction,
      confirmText,
      denyText,
      footer,
    } = this.props;
    if (!show) return null;
    return (
      <div className="popup-component">
        <div className="container" style={position || {}}>
          {header && <p className="header">{header}</p>}
          <div className="buttons">
            {confirmAction && <div className="button clickable confirm" onClick={confirmAction}>{confirmText || "Yes"}</div>}
            {denyAction && <div className="button clickable deny" onClick={denyAction}>{denyText || "No"}</div>}
          </div>
          {footer && <p className="footer">{footer}</p>}
        </div>
      </div>
    );
  }
}