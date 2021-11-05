
   
import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import { MyGModal } from '../../common'

const  array_move = (arr, old_index, new_index) => {
    var element = arr[old_index];
    arr.splice(old_index, 1);
    arr.splice(new_index, 0, element);
    return arr
};

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class SortTableHeader extends Component {
  state = {
    items: this.props.items,
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    const {items } = this.state;
    const heads = items.length ? items : this.props.items;
    const data =  array_move(heads, oldIndex, newIndex);
    this.setState({items:data},()=>{
        this.props.saveHeaderOrder(this.state.items)
    })
  };

  render() {
    const {items} = this.state;
    const {isOpen=false,handleModalToggle} = this.props;
    const heads = items.length ? items : this.props.items;
    return (
        <MyGModal isOpen={isOpen} ariaHideApp={false}>
            <div className='modal-container sortable-Container__container'>
                <div className="modal-wrap">
                    <div className="modal__header">Edit Header Order</div>
                    <div className="modal__body">
                        <SortableContainer onSortEnd={this.onSortEnd}>
                            {heads.map((value, index) => (
                            <SortableItem key={`item-${value.key}`} index={index} value={value.label} />
                            ))}
                        </SortableContainer>    
                    </div>
                    <div class="modal__close" onClick={handleModalToggle}><img src="https://myG.gg/platform_images/Dashboard/X_icon.svg" /></div>
                </div>
            </div>
        </MyGModal>
    );
  }
}


export default SortTableHeader;