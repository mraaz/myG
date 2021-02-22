import React from 'react'
import styles from './progress.module.css'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function _Progress({ progress, reduction = 0, borderColor, value, label, labelStyle, valueStyle, strokeWidth = 4 }) {
  let __progress = Math.round(progress * 100) / 100

  return (
    <CircularProgressbarWithChildren
      value={__progress}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0,
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
        // Text size
        textSize: '12px',
        // Colors
        pathColor: borderColor,
        textColor: '#fff',
        trailColor: '#fff',
        backgroundColor: borderColor,
        strokeWidth: 2,
      })}>
      <div style={{ fontSize: 12, marginTop: -5, ...(labelStyle || {}) }}>
        <strong>{label || `Level`}</strong>
      </div>
      <div style={{ fontSize: 12, marginTop: -5, ...(valueStyle || {}) }}>
        <strong>{value}</strong>
      </div>
    </CircularProgressbarWithChildren>
  )
}

export const Progress = React.memo(_Progress)
Progress.displayName = 'Progress'
export default Progress
