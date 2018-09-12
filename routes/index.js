const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cron = require('node-cron');
const API = 'https://openexchangerates.org/api/latest.json?app_id=';
const APP_ID = '85d5d8eae1dd4cf3b4d872ffeeda08f4';

router.get('/', function(req, res, next) {
	const getCurrencies = function () {
		fetch(API + APP_ID)
			.then(response => response.json())
			.then(data => {
				res.render('index', { currencies: data.rates });
			});
	};

	cron.schedule('0 0 1-31 * *', () => {
		getCurrencies();
	});

	getCurrencies();
});

module.exports = router;