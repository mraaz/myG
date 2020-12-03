import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { logToElasticsearch } from '../../integration/http/logger'

//File: File path to upload
//Name: File name (Doesn't need to be unique, backend will handle that)
//Type: 3= Post, 4=Community, 5=Chat....etc If Left 0 it will be deleted in 24 hours
//Id: ID of the post, group, chat...etc
export async function Upload_to_S3(file, name, type = 0, id = null, chat = false) {
  const formData = new FormData()
  formData.append('upload_file', file)
  formData.append('filename', name)
  formData.append('type', type)
  formData.append('id', id)
  formData.append('chat', chat)

  console.log(chat, '<<<<CHAT!!!')

  try {
    const post = await axios.post('/api/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return post
  } catch (error) {
    toast.success(
      <Toast_style text={'Opps, something went wrong. Unable to upload your file. Refresh and try again or reduce the file size?'} />
    )
    logToElasticsearch('error', 'AWS_utilities', 'Upload_to_S3:' + ' ' + error)
    console.log(error, '<<<<ERROR!!!')
    //logger.log('RENDER', 'AWS upload')
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
    //logger.log('RENDER', 'AWS Delete ')
    logToElasticsearch('error', 'AWS_utilities', 'Remove_file:' + ' ' + error)
    return false
  }
}

export const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://mygame-media.s3.amazonaws.com/logos/Logo.png'}></img>
    <div>{props.text}</div>
  </div>
)
