import React, { Component } from 'react'
import axios from 'axios'
import IndividualSearchResults from './IndividualSearchResults'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class AllSearchResults extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      getKeywordSearchResults: [],
      moreplease: true,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchMoreData()
  }

  fetchMoreData = () => {
    if (this.state.getKeywordSearchResults.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const self = this
    const { match } = this.props.routeProps

    const getKeywordSearchResults = async function () {
      try {
        const getKeywordSearchResults = await axios.post('/api/user/keywordSearchResults', {
          keywords: match.params.keywords,
          counter: self.state.counter ? self.state.counter : 1,
        })

        if (getKeywordSearchResults.data.playerSearchResults.data.length == 0) {
          self.state.moreplease = false
          return
        }

        self.setState({
          getKeywordSearchResults: self.state.getKeywordSearchResults.concat(getKeywordSearchResults.data.playerSearchResults.data),
        })
      } catch (error) {
        console.log(error)
      }
    }

    var myCounter = this.state.counter
    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        getKeywordSearchResults()
      }
    )

    if (myCounter != 1) {
      this.setState({
        show_top_btn: true,
      })
    }
  }

  showInvitations = () => {
    if (this.state.getKeywordSearchResults != undefined) {
      const rowLen = this.state.getKeywordSearchResults.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='invitation-info'>No Gamers found! Try again</div>
      }
      return this.state.getKeywordSearchResults.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualSearchResults searchResults={item} key={index} lastRow={lastRow} />
      })
    }
  }

  render() {
    return (
      <section id='invitation-page'>
        <div className='content-area invitation-page'>
          <div className='padding-container'>
            <div className='invitation-grey-container'>
              <h3>mySearch Results</h3>
              <div className='padding-container'></div>
              <div className='invitation-container'>
                <InfiniteScroll
                  dataLength={this.state.getKeywordSearchResults.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.moreplease}>
                  {this.showInvitations()}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
