import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    str: '',
    arr: []
  }
  render () {
    return (
      <div className='App'>
        <input type='text' onChange={this.handleChange} value={this.state.str} />
        <button onClick={this.handleClick}>postData</button>
        <button onClick={this.getData}>getData</button>
        <ul>
          {this.state.arr.map(e => <li key={e._id}>{e.name}</li>)}
        </ul>
      </div>
    )
  }
  handleChange = e => {
    this.setState({
      str: e.target.value
    })
  }
  handleClick = () => {
    window
      .fetch('http://localhost:5000/post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.str })
      })
      .then(res => res.json())
      .then(res => {
        this.setState(s => ({
          arr: s.arr.concat({name: s.str, _id: res._id}),
          str: ''
        }))
      })
  }
  getData = () => {
    window
      .fetch('http://localhost:5000/get')
      .then(res => res.json())
      .then(data =>
        this.setState({
          arr: data
        })
      )
  }
  componentDidMount () {
    this.getData()
  }
}

export default App
