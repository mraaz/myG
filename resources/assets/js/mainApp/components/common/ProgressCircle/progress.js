import React from 'react'
import styles from './progress.module.css'

function useAnimateValue(value, duration) {
  const [current, setCurrent] = React.useState(value)
  React.useLayoutEffect(() => {
    const stepDuration = 1 / 50
    const totalSteps = duration / stepDuration
    const stepSize = (value - current) / totalSteps
    let currentStep = 0
    const interval = setInterval(
      () =>
        setCurrent((current) => {
          currentStep++

          if (currentStep >= totalSteps) {
            clearInterval(interval)
            return value
          }

          return current + stepSize
        }),
      stepDuration * 1000
    )
    return () => clearInterval(interval)
  }, [value, duration])
  return current
}

const AnimatePercentage = React.memo(({ value, duration }) => {
  const v = useAnimateValue(value, duration)
  return Math.round(v * 100) / 100
})

function _Progress({
  progress,
  strokeWidth = 4,
  ballStrokeWidth = 16,
  reduction = 0.25,
  transitionDuration = 0.5,
  transitionTimingFunction = 'ease',
  background = '#dde2e9',
  hideBall = false,
  hideValue = false,
  gradient = [
    {
      stop: 0.0,
      color: '#00bc9b',
    },
    {
      stop: 1,
      color: '#5eaefd',
    },
  ],
  subtitle = '',
  style,
  className,
  borderColor,
  value,
}) {
  progress = Math.round(progress * 100) / 100
  const width = 200
  const center = width / 2
  const height = 200 || center + center * Math.cos(reduction * Math.PI)
  const [unique] = React.useState(() => Math.random().toString())
  const rotate = 90 + 180 * reduction
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2
  const circumference = progress * 6.5
  const offset = (circumference * (100 - progress * (1 - reduction))) / 100
  console.log('circumference   ', circumference)

  return React.createElement(
    'div',
    {
      className: `${className} ${styles.progress}`,
      style: style,
    },
    React.createElement(
      'svg',
      {
        viewBox: `0 0 ${width} ${height}`,
        className: styles.svg,
      },
      React.createElement(
        'defs',
        null,
        React.createElement(
          'linearGradient',
          {
            id: 'gradient' + unique,
            x1: '0%',
            y1: '0%',
            x2: '0%',
            y2: '100%',
          },
          gradient.map(({ stop, color }) =>
            React.createElement('stop', {
              key: stop,
              offset: stop * 100 + '%',
              stopColor: color,
            })
          )
        )
      ),
      !hideValue &&
        React.createElement(
          'text',
          {
            x: center,
            y: 90,
            textAnchor: 'middle',
            fill: '#9c9c9c',
            fontSize: '20',
          },
          subtitle
        ),
      React.createElement(
        'text',
        {
          x: center,
          y: 135,
          textAnchor: 'middle',
          fontSize: '50',
          fill: '#ffffff',
        },
        value,
        ''
      ),

      React.createElement('circle', {
        transform: `rotate(${rotate} ${center} ${center})`,
        id: 'path',
        cx: center,
        cy: center,
        r: r,
        strokeWidth: strokeWidth,
        strokeDasharray: circumference,
        strokeDashoffset: circumference * reduction,
        fill: 'none',
        stroke: background,
        strokeLinecap: 'round',
      }),
      React.createElement('circle', {
        style: {
          transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
        },
        transform: `rotate(273 100 100)`,
        id: 'path',
        cx: center,
        cy: center,
        r: r,
        strokeWidth: strokeWidth,
        strokeDasharray: `${circumference}`,
        strokeDashoffset: 100,
        fill: 'none',
        stroke: `${borderColor}`,
        strokeLinecap: 'round',
      }),
      !hideBall &&
        React.createElement('circle', {
          style: {
            transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
          },
          transform: `rotate(${rotate} ${center} ${center})`,
          id: 'path',
          cx: center,
          cy: center,
          r: r,
          strokeWidth: ballStrokeWidth,
          strokeDasharray: `1 ${circumference}`,
          strokeDashoffset: 100,
          fill: 'none',
          stroke: `url(#gradient${unique})`,
          strokeLinecap: 'round',
        })
    )
  )
}

export const Progress = React.memo(_Progress)
Progress.displayName = 'Progress'
export default Progress
