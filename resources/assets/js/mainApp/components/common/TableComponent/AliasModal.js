
   /*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */ 
import React, {Component} from 'react';
import { MyGModal } from '../../common'

class SortTableHeader extends Component {
  state = {
    items: ''
  };

  render() {
    const {isOpen=false,handleModalToggle} = this.props;
    return (
        <MyGModal isOpen={isOpen} ariaHideApp={false}>
            <div className='modal-container sortable-Container__container'>
                <div className="modal-wrap">
                    <div className="modal__header">War reminders will be sent only if battles are remaining.</div>
                    <div className="modal__body">
                      content area 
                    </div>
                    <div class="modal__close" onClick={handleModalToggle}><img src="https://myG.gg/platform_images/Dashboard/X_icon.svg" /></div>
                </div>
            </div>
        </MyGModal>
    );
  }
}


export default SortTableHeader;