require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Searches - Find or Create Person', () => {
  zapier.tools.env.inject();

  it('should get an object', done => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN
      },

      inputData: {}
    };

    appTester(App.searches['person'].operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        results.length.should.be.aboveOrEqual(1);
        results[0].should.have.property('id');
        done();
      })
      .catch(done);
  });
});
