import React, { Component } from 'react';

const API = 'https://openexchangerates.org/api/latest.json?app_id=';
const APP_ID = '85d5d8eae1dd4cf3b4d872ffeeda08f4';
const oneDay = 1000 * 60 * 60 * 24;

class App extends Component {
  constructor(){
    super();

    this.state = {
      currency: {}
    }
  }

  componentDidMount(){
		const getCurrency = () => {
			fetch(API + APP_ID)
        .then(response => response.json())
        .then(data => {
          this.setState({
            currency: data
          })
        });
		};

		setInterval(() => {
			getCurrency();
		}, oneDay);

		getCurrency();
  }

  render() {
    const { currency } = this.state;

		if (!Object.keys(currency).length) {
		  return (
        <div>Loading...</div>
      )
    }

		return (
      <div>
        <p>1 USD: = { currency.rates.USD.toFixed(2) } US dollar</p>
        <p>1 USD: = { currency.rates.EUR.toFixed(2) } Euro</p>
        <p>1 USD: = { currency.rates.CZK.toFixed(2) } Czech koruna</p>
        <p>1 USD: = { currency.rates.PLN.toFixed(2) } Polish złoty</p>
      </div>
    );
  }
}

export default App;
