const httpRequest = require('./http-request');
const baseUrlAddress = 'http://' + process.env.BASE_URL;

// function to call third party API
// LOOKUPS
const regions_mainframe = (callback) => {
	const query = '/regions-sa';
	const url = baseUrlAddress + query;
	console.log(url);
	const options = {
		method: 'GET',
		url: url,
		json: true,
	};
	callback = httpRequest('regions', -1, options, callback);
};

const citiesByRegion = (regionId, callback) => {
	console.log('get all cities by region Id');
	const query = '/cities-sa?regionid=' + regionId;

	const url = baseUrlAddress + query;
	console.log(url);
	const options = {
		method: 'GET',
		url: url,
		json: true,
	};
	callback = httpRequest('cities', regionId, options, callback);
};

const districts = (cityId, callback) => {
	console.log('get all districts by city Id');
	const query = '/districts-sa?cityId=' + cityId;

	const url = baseUrlAddress + query;
	console.log(url);
	const options = {
		method: 'GET',
		url: url,
		json: true,
	};
	callback = httpRequest('districts', cityId, options, callback);
};

const addressbyGeoCode_mainframe = (lat, long, callback) => {
	console.log('get address by geocode.');
	const query = '/address-sa?lat=' + lat + '&long=' + long;

	const url = baseUrlAddress + query;
	console.log(url);
	const options = {
		method: 'GET',
		url: url,
		json: true,
	};
	callback = httpRequest('address-geocode', -1, options, callback);
};

const postcode_mainframe = (postcode, callback) => {
	console.log('get postcode details.');
	const query = '/postalcodes-sa?postalcode=' + postcode;

	const url = baseUrlAddress + query;
	console.log(url);
	const options = {
		method: 'GET',
		url: url,
		json: true,
	};
	callback = httpRequest('post-code', -1, options, callback);
};

module.exports = {
	regions_mainframe,
	citiesByRegion,
	districts,
	addressbyGeoCode_mainframe,
	postcode_mainframe,
};
