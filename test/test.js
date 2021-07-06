require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

require('dotenv').config();

// let bundle = {};
describe('Auth', () => {
	let bundle = {
		inputData: {
			redirect_uri: process.env.REDIRECT_URI,
			firm_subdomain: process.env.FIRM_SUBDOMAIN,
		},
		authData: {
			access_token: 'd5cefa3b7c3924e7df1fb42abe01b8699c74f71782bcfe9507d300040282503e',
			refresh_token: '90be5da8ff2adbbd2fcb04fff43cd28bb41acafff26f9a8e9ba6eabd5d83b579',
			firm_subdomain: process.env.FIRM_SUBDOMAIN,
		},
	};
	it('should get an auth url', done => {
		appTester(App.authentication.oauth2Config.authorizeUrl, bundle)
			.then(result => {
				console.log(result);
				done();
			})
			.catch(done);
	});
	it('should test auth', done => {
		// 'd5cefa3b7c3924e7df1fb42abe01b8699c74f71782bcfe9507d300040282503e';
		appTester(App.authentication.test, bundle)
			.then(result => {
				// console.log(result);
				result.id.should.equal('ok');
				done();
			})
			.catch(done);
	});
});

//  ============ Triggers ================

describe('Triggers - New/Update Contact', () => {
	zapier.tools.env.inject();

	it('should get an array', done => {
		const bundle = {
			authData: {
				access_token: process.env.ACCESS_TOKEN,
				refresh_token: process.env.REFRESH_TOKEN,
			},

			inputData: {
				// TODO: Pulled from input fields' default values. Edit if necessary.
				new_updated: null,
			},
		};

		appTester(App.triggers['people_updated'].operation.perform, bundle)
			.then(results => {
				console.log(results);
				results.should.be.an.Array();
				done();
			})
			.catch(done);
	});
});
