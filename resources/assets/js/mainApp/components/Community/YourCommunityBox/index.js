import React, { Fragment } from 'react'

// import styles
import '../../../styles/Community/AddCommunityStyles.scss'

const YourCommunityBox = (props) => {
  const redirect2Group = () => {
    props.routeProps.routeProps.history.push(`/community/${encodeURI(props.data.name.trim())}`)
  }
  let members_txt = 'Members'
  if (props.data.no_of_peeps == '1') {
    members_txt = 'Member'
  }
  return (
    <Fragment>
      <div className='col-md-4'>
        <div className='community-card-box'>
          <div className='community-title'>
            <p>{props.data.name}</p>
          </div>
          <hr />
          <div className='members'>
            <h2>{props.data.no_of_peeps}</h2>
            <span>{members_txt}</span>
          </div>
          <div className='btn-show'>
            <button onClick={redirect2Group}>Show</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default YourCommunityBox
