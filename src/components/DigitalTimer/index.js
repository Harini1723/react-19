// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRunning: false,
  setMinutes: 25,
  setSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {setMinutes} = this.state
    if (setMinutes > 1) {
      this.setState(prevState => ({setMinutes: prevState.setMinutes - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({setMinutes: prevState.setMinutes + 1}))
  }

  renderButton = () => {
    const {setMinutes} = this.state
    return (
      <div className="device-container">
        <p className="result-set">Set Timer Limit</p>
        <div className="increment-container">
          <button className="button1" type="button" onClick={this.onDecrement}>
            -
          </button>
          <p className="card-para">{setMinutes}</p>
          <button className="button1" type="button" onClick={this.onIncrement}>
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementSeconds = () => {
    const {setMinutes, setSeconds} = this.state
    const isTimerCompleted = setSeconds === setMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        setSeconds: prevState.setSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {isTimeRunning, setMinutes, setSeconds} = this.state
    const isTimerCompleted = setSeconds === setMinutes * 60
    if (isTimerCompleted) {
      this.setState({setSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  render() {
    const {isTimeRunning, setMinutes, setSeconds} = this.state
    const image = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const para = isTimeRunning ? 'Pause-icon' : 'Play-icon'
    const method = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="head">Digital Timer</h1>
        <div className="app-container">
          <div className="container">
            <div className="card">
              <h5 className="head-time">
                {setMinutes}:{setSeconds}
              </h5>
              <p className="para">{method}</p>
            </div>
          </div>
          <div className="device-container">
            <div className="text-container">
              <div className="start-pause-container">
                <button
                  className="button"
                  type="button"
                  onClick={this.onStartOrPause}
                >
                  <img src={image} alt={para} className="start-img" />
                </button>
                <p className="para-set">{isTimeRunning ? 'Start' : 'Pause'}</p>
              </div>
              <div className="rest-container">
                <button
                  className="button"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="start-img"
                  />
                </button>
                <p className="para-set">Reset</p>
              </div>
            </div>
            {this.renderButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
