import React from 'react'
import { toast } from 'react-toastify'
import { Toast_style } from '../mainApp/components/Utility_Function'

export default function notifyToast(content) {
  toast.success(<Toast_style text={content} />)
}
