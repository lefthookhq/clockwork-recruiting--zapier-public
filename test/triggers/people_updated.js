require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Triggers - New/Update Contact', () => {
  zapier.tools.env.inject();

  it('should get an array', done => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN
      },

      inputData: {
        // TODO: Pulled from input fields' default values. Edit if necessary.
        new_updated: null
      }
    };

    appTester(App.triggers['people_updated'].operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
