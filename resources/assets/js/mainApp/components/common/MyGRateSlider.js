import React from 'react'
import { getAssetUrl } from '../../../common/assets'

export default class MyGRateSlider extends React.PureComponent {
  state = {
    holdingSlider: false,
    focusedRating: 0
  }

  componentDidMount() {
    this.onMouseUpListener = addEventListener('mouseup', this.onMouseUp)
    this.setState({ focusedRating: this.props.rating || 0 })
  }

  componentWillUnmount() {
    if (this.onMouseUpListener) this.onMouseUpListener.remove()
  }

  onClick = (rating) => {
    this.setState({ focusedRating: rating })
    this.props.onRatingSelected(rating)
  }

  onMouseDown = () => {
    this.setState({ holdingSlider: true })
  }

  onMouseUp = () => {
    this.setState({ holdingSlider: false })
    this.props.onRatingSelected(this.state.focusedRating)
  }

  onMouseEnter = (rating) => {
    if (!this.state.holdingSlider) return
    this.setState({ focusedRating: rating })
  }

  renderRating = (rating) => {
    const style = rating === this.state.focusedRating ? 'rating selected' : 'rating'
    return (
      <div
        className='rating-container'
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={() => this.onMouseEnter(rating)}
        onClick={() => this.onClick(rating)}
      >
        <div className={style} />
      </div>
    )
  }

  getRatingIcon = () => {
    return `url(${getAssetUrl(icons[this.state.focusedRating])})`
  }

  render() {
    return (
      <div className='rate-slider'>
        <div className='slider'>{ratings.map(this.renderRating)}</div>
        <div className='rating-icon' style={{ backgroundImage: this.getRatingIcon() }} />
        <div className='rating-indicator' style={{ color: colors[this.state.focusedRating] }}>
          ({this.state.focusedRating})
        </div>
      </div>
    )
  }
}

const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const icons = {
  0: 'ic_rating_very_sad',
  1: 'ic_rating_very_sad',
  2: 'ic_rating_very_sad',
  3: 'ic_rating_sad',
  4: 'ic_rating_sad',
  5: 'ic_rating_neutral',
  6: 'ic_rating_neutral',
  7: 'ic_rating_happy',
  8: 'ic_rating_happy',
  9: 'ic_rating_very_happy',
  10: 'ic_rating_very_happy'
}

const colors = {
  0: '#8E00AA',
  1: '#8E00AA',
  2: '#8E00AA',
  3: '#7640E0',
  4: '#7640E0',
  5: '#55AEFF',
  6: '#55AEFF',
  7: '#04C1D7',
  8: '#04C1D7',
  9: '#00CF98',
  10: '#00CF98'
}
