import React from 'react';

export default class Dropdown extends React.PureComponent {
  renderItem = (item, index, onItemClick) => {
    return (
      <div className="item clickable"
        key={index}
        onClick={() => onItemClick(item.name || item)}>
        {item.render || item.name || item}
      </div>
    );
  }

  render() {
    const {
      show,
      position,
      emptyMessage,
      items,
      onItemClick,
    } = this.props;
    if (!show) return null;
    return (
      <div className="dropdown-component">
        <div className="container" style={position || {}}>
          {items.map((item, index) => this.renderItem(item, index, onItemClick))}
          {!items.length && emptyMessage && <p className="empty">{emptyMessage}</p>}
        </div>
      </div>
    );
  }
}