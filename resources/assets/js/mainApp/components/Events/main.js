import React from 'react'

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Raaz: 'true'
    }
  }

  componentDidMount() {
    console.log('Nothing to see yet')
  }

  renderHeader = () => {
    return (
      <div className='viewGame__header'>
        <div className='title'>Events</div>
      </div>
    )
  }

  renderBody = () => {
    return (
      <div className='event-component-body'>
        <img
          src='https://myG.gg/user_files/1_1627863083435_4KmQXr_1_1622256315556_NoiJVh_IMG-20210529-WA0003.jpg'
          className='event-box-img'
        />
        <div className='event-component-body-border'></div>
        <div className='body-text'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='events-main'>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </React.Fragment>
    )
  }
}
