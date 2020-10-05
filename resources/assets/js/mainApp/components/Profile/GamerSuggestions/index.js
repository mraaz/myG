import React from 'react';
import { connect } from 'react-redux'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { fetchGamerSuggestionsAction } from '../../../../redux/actions/profileAction';

export class GamerSuggestions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    page: 0,
  }

  componentDidMount() {
    this.props.fetchGamerSuggestions();
  }

  renderHeaders = () => {
    return(
      <div className='headers'>
        <div className='header'>Gamer Suggestions</div>
      </div>
    );
  }

  renderGamerSuggestion = (profile) => {
    return(
      <div className="game-experience" 
      onMouseEnter={() => this.setState({ hovering: profile.alias })}
      onMouseLeave={() => this.setState({ hovering: null })}
    >
      <div className="image absolute-top" style={{ backgroundImage: `url(${profile.background}), url(https://mygame-media.s3.amazonaws.com/default_user/myG_bg.png)` }} />
      <div className='icon' style={{ backgroundImage: `url(${profile.image}), url(https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png)` }} />
      <span className="name">{profile.alias}</span>
      <div className="field center">
          <span className="field-title space-right">Level</span>
          <span className="field-value">{profile.level}</span>
      </div>
      {profile.mostPlayedGames.map(game => <div className="field center"><span className="field-value">{game}</span></div>)}
      {this.state.hovering === profile.alias && (
        <div className="edit-button clickable" onClick={() => window.location.href = `/profile/${profile.alias}`}>
          View
        </div>
      )}
    </div>
    );
  }

  changePage = (direction) => {
    const page = this.state.page;
    if (direction === 'left') return this.setState({ page: (page - 1) < 0 ? page : page - 1 });
    if (direction === 'right') return this.setState({ page: (page + 1) > this.props.gamerSuggestions.length - 4 ? page : page + 1 });
  }

  renderPageButtons = () => {
    const fitsAllInScreen = this.props.gamerSuggestions.length <= 4;
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0;
    const contentToTheRight = !fitsAllInScreen && this.state.page < this.props.gamerSuggestions.length - 4;
    return(
      <React.Fragment>
        {contentToTheLeft && (
          <div
            className={`go-left clickable`}
            onClick={() => this.changePage('left')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
          />
        )}
        {contentToTheRight && (
          <div
            className={`go-right clickable`}
            onClick={() => this.changePage('right')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.gamerSuggestions.length) return null;
    return(
      <div id="profile">
        <div id="profile-game-experiences">
          {this.renderHeaders()}
          <div className="scroll">
            {this.renderPageButtons()}
            {this.props.gamerSuggestions.slice(this.state.page, this.state.page + 4).map(this.renderGamerSuggestion)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gamerSuggestions: state.profile.gamerSuggestions || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGamerSuggestions: () => dispatch(fetchGamerSuggestionsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamerSuggestions)
