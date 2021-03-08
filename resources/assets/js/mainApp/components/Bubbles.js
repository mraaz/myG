import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { loadAnimation } from 'lottie-web'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'

const getAnimationContainer = (key) => {
  const first = Math.floor(Math.random() * 96) + 1
  const second = Math.floor(Math.random() * 96) + 1
  const third = Math.floor(Math.random() * 96) + 1
  const fourth = Math.floor(Math.random() * 96) + 1
  const animation = keyframes`
    0% { transform: translateX(${first}px) translateY(0); };
    33% { transform: translateX(${second}px) translateY(-50px); };
    66% { transform: translateX(${third}px) translateY(-100px); };
    100% { transform: translateX(${fourth}px) translateY(-150px); };
  `
  const AnimationContainer = styled.div`
    width: 164px;
    height: 164px;
    position: fixed;
    left: -64px;
    bottom: 0;
    animation: ${animation} 5s linear;
  `
  return <AnimationContainer key={key} id={`xp-animation-container-${key}`} />
}

class Bubbles extends React.Component {
  state = {
    animationIds: [],
    animations: [],
  }

  componentDidUpdate(previous) {
    const experienceDelta = parseInt(this.props.experience, 10) - parseInt(previous.experience, 10)
    if (experienceDelta >= 100) return this.animateXpGain('/animations/experienceBubble100.json')
    if (experienceDelta >= 30) return this.animateXpGain('/animations/experienceBubble30json')
    if (experienceDelta >= 20) return this.animateXpGain('/animations/experienceBubble20.json')
    if (experienceDelta >= 15) return this.animateXpGain('/animations/experienceBubble15.json')
    if (experienceDelta >= 12) return this.animateXpGain('/animations/experienceBubble12.json')
    if (experienceDelta >= 10) return this.animateXpGain('/animations/experienceBubble10.json')
    if (experienceDelta >= 5) return this.animateXpGain('/animations/experienceBubble5.json')
    if (experienceDelta >= 1) return this.animateXpGain('/animations/experienceBubble1.json')
  }

  animateXpGain = (path) => {
    const animationId = uuidv4()
    const animation = getAnimationContainer(animationId)
    this.setState(
      (previous) => {
        previous.animations.push({ animation, id: animationId })
        return { animations: previous.animations, animationIds: [...previous.animationIds, animationId] }
      },
      () => this.loadBubbleAnimation(path, animationId)
    )
    setTimeout(
      () =>
        this.setState((previous) => ({
          animations: previous.animations.filter(({ id }) => id !== animationId),
          animationIds: [...previous.animationIds.filter((id) => id !== animationId)],
        })),
      5000
    )
  }

  loadBubbleAnimation = (path, animationId) => {
    loadAnimation({
      container: document.getElementById(`xp-animation-container-${animationId}`),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: path,
    })
  }

  render() {
    return <div id='bubbles'>{this.state.animations.map(({ animation }) => animation)}</div>
  }
}

function mapStateToProps(state) {
  return {
    experience: (state.user.userTransactionStates || {}).user_experience,
  }
}

export default connect(mapStateToProps)(Bubbles)
