import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import logger from '../../common/logger'

export async function Upload_to_S3(file, name, type = 0, id = null) {
  const formData = new FormData()
  formData.append('upload_file', file)
  formData.append('filename', name)
  formData.append('type', type)
  formData.append('id', id)

  try {
    const post = await axios.post('/api/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return post
  } catch (error) {
    toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Refresh and try again???'} />)
    logger.log('RENDER', 'AWS upload')
    return false
  }
}

export async function Remove_file(key, aws_key_id) {
  const formData = new FormData()
  formData.append('key', key)
  formData.append('aws_key_id', aws_key_id)

  try {
    const post = axios.post('/api/deleteFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return post
  } catch (error) {
    toast.success(<Toast_style text={"Hmmmm, something went wrong. Unable to remove your file. No issue, I'll look into it...."} />)
    logger.log('RENDER', 'AWS Delete ')
    return false
  }
}

export const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Logo.png'}></img>
    <div>{props.text}</div>
  </div>
)
