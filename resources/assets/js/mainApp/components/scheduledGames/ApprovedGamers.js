import React, { Fragment } from 'react'

const Approved_gamers = (props) => {
  const { approved_gamers = [] } = props
  return (
    <Fragment>
      <div className='gameTime__label'>Gamers</div>
      <div className='gamer__wraper'>
        {approved_gamers.length > 0 &&
          approved_gamers.map((gamer) => {
            return (
              <div className='single__gamer'>
                <div className='gamer__image '>
                  <img src={gamer.profile_img} />
                </div>
                <div className='gamer__alias ' title={gamer.alias}>
                  {gamer.alias}
                </div>
              </div>
            )
          })}
      </div>
    </Fragment>
  )
}

export default Approved_gamers
