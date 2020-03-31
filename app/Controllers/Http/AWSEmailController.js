'use strict'

const Env = use('Env')
const AWS = require('aws-sdk')

const SESConfig = {
  apiVersion: '2010-12-01',
  accessKeyId: Env.get('AWS_SES_SMTP_USERNAME'),
  accessSecretKey: Env.get('AWS_SES_SMTP_PASSWORD'),
  region: Env.get('AWS_SES_REGION'),
}

class AWSEmailController {
  async sendEmail(params) {
    new AWS.SES(SESConfig)
      .sendEmail(params)
      .promise()
      .then((res) => {
        //console.log(res)
      })
  }

  async createEmailnSend(toAddress, subject, body) {
    var params = {
      Source: 'myG <' + Env.get('SMTP_FROM_ADDRESS') + '>',
      Destination: {
        ToAddresses: [toAddress],
      },
      ReplyToAddresses: [Env.get('SMTP_FROM_ADDRESS')],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    }

    this.sendEmail(params)
  }
}

module.exports = AWSEmailController
