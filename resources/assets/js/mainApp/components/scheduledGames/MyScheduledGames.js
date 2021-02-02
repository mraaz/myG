/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'
import SingleGameDetails from './singlegameDetails.js'
import NoRecord from './NoRecord.js'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'
import axios from 'axios'
import Select from 'react-select'
import { prefilledFilter_option } from './option'
import MobileScheduledGames from '../MobileView/MobileScheduledGames'

export default class MyScheduledGames extends Component {
  constructor() {
    super()
    this.state = {
      show_full_games: false,
      singleScheduleGamesPayload: {},
      scheduleGames: [],
      selected_game: {},
      showRightSideInfo: false,
      commentData: {},
      singleView: false,
      moreplease: true,
      counter: 1,
      scheduleGamesView: {},
      showAllComment: false,
      fetching: false,
      exclude_expired: false,
      slideOptionText: 'Exclude expired games',
    }
  }

  handleShowAllComments = async (id) => {
    this.setState({ showAllComment: !this.state.showAllComment })
    const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
    if (allComments.data) {
      this.setState({ commentData: { ...allComments.data } })
    }
  }

  async componentDidMount() {
    document.title = 'myG - My Games'

    const scheduleGames = await axios.post(`/api/myScheduledGames`, {
      counter: 1,
      exclude_expired: false,
      filter: 0,
    })

    if (scheduleGames.data && scheduleGames.data.myScheduledGames && scheduleGames.data.myScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGames.data.myScheduledGames })
    }
    window.history.pushState('myG', 'myG', '/?at=mygames')
  }

  getSingleGameData = async (e, id, game) => {
    e.preventDefault()
    e.stopPropagation()
    const scheduleGames = await axios.get(`/api/ScheduleGame/additional_game_info/${id}`)
    const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
    if (allComments.data) {
      this.setState({ commentData: { ...allComments.data } })
    }
    if (scheduleGames.data && Object.keys(scheduleGames.data).length > 0) {
      this.setState({
        singleScheduleGamesPayload: scheduleGames.data,
        selected_game: { ...game },
        showRightSideInfo: true,
        showAllComment: false,
      })
    }
  }

  deSelectGame = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      singleScheduleGamesPayload: {},
      selected_game: {},
      showRightSideInfo: false,
      showAllComment: false,
    })
  }

  getScheduleGamesData = async (data = {}) => {
    const { counter, scheduleGames = [], exclude_expired, filter } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const scheduleGamesRes = await axios.post(`/api/myScheduledGames`, {
      counter: count,
      exclude_expired: exclude_expired,
      filter,
    })
    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length > 0) {
      if (count > 1) {
        this.setState({ scheduleGames: [...scheduleGames, ...scheduleGamesRes.data.myScheduledGames], counter: count, fetching: false })
      } else {
        this.setState({ scheduleGames: scheduleGamesRes.data.myScheduledGames, fetching: false })
      }
    }
  }
  handleExcludesFullGames = async (e, _filter = '') => {
    const checked = e ? e.target.checked : this.state.exclude_expired
    const filter = _filter !== '' ? _filter : this.state.filter
    const scheduleGamesRes = await axios.post(`/api/myScheduledGames`, {
      counter: 1,
      exclude_expired: checked,
      filter,
    })

    this.setState({ slideOptionText: checked ? 'Show expired games': 'Exclude expired games' })

    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGamesRes.data.myScheduledGames, fetching: false, exclude_expired: checked, filter })
    } else {
      this.setState({
        moreplease: false,
        fetching: false,
        exclude_expired: checked,
        filter,
        scheduleGames: [],
      })
    }
  }
  handleChangeFilter = (prefilledFilter) => {
    this.setState({ prefilledFilter }, () => {
      this.handleExcludesFullGames(null, prefilledFilter.value)
    })
  }

  render() {
    const { routeProps = {} } = this.props
    const { match = {} } = routeProps
    const { params = {} } = match
    const { id = '' } = params
    const {
      savedFilter,
      addFilter,
      scheduleGames = [],
      show_full_games,
      singleScheduleGamesPayload,
      selected_game,
      showRightSideInfo,
      commentData,
      singleView,
      scheduleGamesView = {},
      showAllComment,
      fetching,
      prefilledFilter,
    } = this.state
    const { latestScheduledGames = [] } = scheduleGamesView

    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <Fragment>
        <section className='viewGame__container desktopView'>
          <div className='myGame__filter-section'>
            <div className='viewGame__gameName game-title-select'>
              <Select
                onChange={(data) => this.handleChangeFilter(data)}
                options={prefilledFilter_option}
                placeholder='Select your filter'
                name='prefilledFilter'
                className='viewGame__name'
                classNamePrefix='filter'
                value={prefilledFilter}
              />
            </div>
          </div>
          <div className={`gameList__section ${singleView ? 'singleGameView__container' : 'GameView__container'}`}>
            {scheduleGames.length > 0 ? (
              <Fragment>
                <div style={{ flex: 1 }}>
                  <GameList
                    scheduleGames={scheduleGames}
                    show_full_games={show_full_games}
                    handleExcludesFullGames={this.handleExcludesFullGames}
                    slideOptionLabel={this.state.slideOptionText}
                    getSingleGameData={this.getSingleGameData}
                    next={this.getScheduleGamesData}
                    hasMore={this.state.moreplease}
                    fetching={fetching}
                    copyClipboardEnable={true}
                    showPrefilledFilter={true}
                    {...this.props}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <GameDetails
                    singleScheduleGamesPayload={singleScheduleGamesPayload}
                    selected_game={selected_game}
                    showRightSideInfo={showRightSideInfo}
                    commentData={commentData}
                    handleShowAllComments={this.handleShowAllComments}
                    showAllComment={showAllComment}
                    {...this.props}
                  />
                </div>
              </Fragment>
            ) : (
              <NoRecord />
            )}
          </div>
        </section>
        <section className='viewGame__container__mobile mobileView'>
          <MobileScheduledGames
            scheduleGames={scheduleGames}
            selectedGame={selected_game}
            singleScheduleGamesPayload={singleScheduleGamesPayload}
            showFullGames={show_full_games}
            handleExcludesFullGames={this.handleExcludesFullGames}
            slideOptionLabel={this.state.slideOptionText}
            copyClipboardEnable={true}
            prefilledFilter={prefilledFilter}
            showPrefilledFilter={true}
            getSingleGameData={this.getSingleGameData}
            deSelectGame={this.deSelectGame}
            showRightSideInfo={showRightSideInfo}
            routeProps={this.props.routeProps}
            commentData={commentData}
            showAllComment={showAllComment}
            handleShowAllComments={this.handleShowAllComments}
            user={this.props.initialData}
            handleChangeFilter={this.handleChangeFilter}
          />
        </section>
      </Fragment>
    )
  }
}
