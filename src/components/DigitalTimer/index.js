// Write your code here
import {Component} from 'react'
import './index.css'



class DigitalTimer extends Component {
  state = {isShow: false, timeLimit: 25, timeElapse: 0}

 clearTimerInterval = () => this.clearInterval(this.timerId)

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  onDecreaseTimer = () => {
    const {timeLimit} = this.state
    if (timeLimit > 1) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
    }
  }

  onIncreaseTimer = () => {
    const {timeLimit} = this.state
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  rendertimerLimitController = () => {
    const {timeElapse, timeLimit} = this.state
    const isBtnDisable = timeElapse > 0
    return (
      <div>
      <p>Set Timer limit</p>

            <div className="set-timer-container">
              <button
                type="button"
                className="btn"
                onClick={this.onDecreaseTimer}
                disabled={isBtnDisable}
              >
                -
              </button>
              <p>{timeLimit}</p>
              <button
                type="button"
                className="btn"
                onClick={this.onIncreaseTimer}
                disabled={isBtnDisable}
              >
                +
              </button>
            </div>
            </div>
    )
  }

  timerReset = () => {
    this.clearTimerInterval()
    this.setState({isShow: false, timeLimit: 25, timeElapse: 0})
  }


  incrementTimeElapsed = () => {
    const {timeElapse, timeLimit} = this.state
    const timeComplete = timeElapse === timeLimit * 60
    if (timeComplete) {
      this.clearTimerInterval()
      this.setState({isShow: false})
    } else {
      this.setState(prevState => ({timeElapse: prevState.timeElapse + 1}))
    }
  }

  onStartOrPause = () => {
    const {isShow, timeElapse, timeLimit} = this.state
    const timeComplete = timeElapse === timeLimit * 60

    if (timeComplete) {
      this.setState({timeElapse: 0})
    }

    if (isShow) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeElapsed, 1000)
    }

    this.setState(prevState => {
      const {isShow} = prevState 
      return {isShow: !isShow}
    })
  }

  renderTimeControllerShow =() =>{
    const {isShow} = this.state
    return (
<div className="settings-section">
              <div className="btn-section">
                <div className="pause-section">
                  <button type="button" className="btn" onClick={this.onStartOrPause}>
                    {isShow ? (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                        alt="pause icon"
                        className="image"
                      />
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                        alt="play icon"
                        className="image"
                      />
                    )}
                  </button>
                  {isShow ? <p>Pause</p> : <p>Start</p>}
                </div>
              </div>

              <div className="btn-section">
                <button type="button" className="btn" onClick={this.timerReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset"
                    className="image"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
    )
  }

  getElapsed = () => {
    const {timeElapse, timeLimit} = this.state
    const totalRemainingSeconds = timeLimit * 60 - timeElapse
    const min = Math.floor(totalRemainingSeconds / 60)
    const sec = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMin = min > 9 ? min : `0${min}`
    const stringifiedSec = sec > 9 ? sec : `0${sec}`
    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {isShow, timeLimit, timeElapse} = this.state
   
    return (
      <div className="bg-clock-container">
        <h1>Digital Timer</h1>
        <div className="time">
          <div className="clock-container">
            <div className="timer-container">
              {this.getElapsed()}
              {isShow ? <p>Running</p> : <p>Paused</p>}
            </div>
          </div>

          <div className="time-settings--container">
            {this.renderTimeControllerShow()}
            {this.rendertimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
