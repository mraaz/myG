import React, { Component } from 'react'
import CustomCron from './lib'
import './lib/cron-builder.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.cronStyle = `
    .cron_builder {
      width: 422px;
      background-color: #2D363A;
      margin-top: 10px;
      border-radius: 4px;
      border: none;
      font-family: Roboto, sans-serif;
    }
    .text_align_left > input {
      display: inline;
      margin: 0;
    }
  
    .cron_builder_bordering {
      text-align: left;
    }
    .well-small > input {
      display: inline;
      margin: 0;
    }
    #DailyHours {
      display: none;
    }
    #DailyMinutes {
      display: none;
    }`
  }

  render() {
    return (
      <div>
        <CustomCron
          tabs={['Daily', 'Weekly', 'Monthly']}
          onChange={(e) => {
            this.setState({ value: e })
            console.log(e)
          }}
          hours={2}
          minutes={15}
          style={this.cronStyle}
          value={this.state.value}
          showResultText={true}
          showResultCron={true}
        />
      </div>
    )
  }
}

export default App
