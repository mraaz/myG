import React from 'react'
import { toast } from 'react-toastify'
import { Toast_style } from '../mainApp/components/Utility_Function'

export default function notifyToast(text, title, onClick = () => {}) {
  toast.success(<Toast_style title={title} text={text} onClick={onClick} />)
}
