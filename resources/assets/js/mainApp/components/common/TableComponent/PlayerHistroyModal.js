/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import axios from 'axios'

// Import React Table
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

// Import React Table HOC Fixed columns
import withFixedColumns from 'react-table-hoc-fixed-columns'
import 'react-table-hoc-fixed-columns/lib/styles.css'

import { MyGModal, MyGTextarea, MyGButton } from '../../common'
import { logToElasticsearch } from '../../../../integration/http/logger'
import notifyToast from '../../../../common/toast'

const ReactTableFixedColumns = withFixedColumns(ReactTable)

class PlayerHistroyModal extends Component {
  state = {
    items: '',
    player_details: {},
    history_details: [],
    header: []
  }

  async componentDidMount() {
    try {
      const { data = {} } = await axios.post('/api/clashroyale/cr_player_manager_show/', {
        user_id: this.props.player_id,
        group_id: this.props.group_id,
        player_tag: this.props.player_tag
      })
      const player_details = data.player_details || {}
      const history_details = data.history_details || []
      const header = data.header || []
      this.setState({
        header,
        player_details,
        history_details
      })
      console.log(data, '<<<DATAS')
    } catch (error) {
      this.setState({ loading: false })
      logToElasticsearch('error', 'HelpModal.js', 'Failed componentDidMount:' + ' ' + error)
    }
  }

  onTextAreaChange = (e) => {
    const { player_details = {} } = this.state
    const value = e.target.value
    player_details['notes'] = value
    this.setState({ player_details })
  }

  handleSave = async () => {
    const { player_details = {} } = this.state
    const tmp = await axios.post('/api/clashroyale/cr_player_manager_update/', {
      ...player_details,
      player_details_id: this.props.player_id,
      group_id: this.props.group_id,
      notes: player_details.notes
    })
    if (tmp) {
      notifyToast('Yeah ! Notes Saved successfully!')
      this.props.handleModalToggle()
    }
  }

  renderColumns = (header) => {
    let w = '50%'
    return header.map((head) => {
      return {
        Header: head.label,
        accessor: head.key,
        width: w,
        Cell: (row) => <div title={row.value}>{row.value}</div>
      }
    })
  }

  render() {
    const { handleModalToggle, player_name = '', player_tag = '' } = this.props
    const { history_details, player_details, header } = this.state
    const columns = this.renderColumns(header)
    console.log('history_details  ', history_details)
    console.log('player_details  ', player_details)
    console.log('header  ', header)
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container playerHistory'>
          <div className='modal-wrap'>
            <div className='modal__header'>
              <div className='header__left'>
                <a href={`/profile/${player_name}`}>@{player_name}</a>
              </div>
              <div className='header__right'>{player_tag}</div>
            </div>
            <div className='modal__body'>
              <div className='field-title'>Notes</div>
              <div className='description-text-area'>
                <div>
                  <MyGTextarea onChange={this.onTextAreaChange} value={player_details.notes} placeholder='Enter Note' maxLength={250} />
                </div>
              </div>
              <div className='field-title'>History Logs</div>
              <ReactTableFixedColumns
                showPaginationBottom={false}
                data={history_details}
                defaultPageSize={10}
                columns={columns}
                style={{
                  height: '100vh'
                }}
              />
            </div>
            <div className='modal__footer'>
              <MyGButton
                customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
                onClick={(e) => handleModalToggle(true)}
                text='Cancel'
              />
              <button type='button' onClick={this.handleSave}>
                Save
              </button>
            </div>
            <div className='modal__close' onClick={(e) => handleModalToggle(true)}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
        </div>
      </MyGModal>
    )
  }
}

export default injectIntl(PlayerHistroyModal)
