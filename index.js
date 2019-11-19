// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import moment from 'moment'

const styles = {
  app: {
    paddingTop: 40,
    textAlign: 'center',
  },
}

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      base_url : 'https://api.openaq.org/v1/',
      date: moment().format('YYYY-M-DD')
    }
  }

  componentDidMount()
  {
    let data = {
      'coordinates': "23.7197845,90.4211198",
      'radius' : 10000,
      'date_from': this.state.date,
      'date_to': this.state.date
    }
    axios.get(this.state.base_url+'measurements', {params: data}).then(response => {
      console.log(response.data.results);
  }).catch(function (error) {
      console.log(error);
  });
}
  

  render() {
    return (
      <div style={styles.app}>
        Welcome to AirChecker!
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)