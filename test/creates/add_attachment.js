require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Creates - Add Attachment to Person', () => {
  zapier.tools.env.inject();

  it('should create an object', done => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN
      },

      inputData: {
        // TODO: Pulled from input fields' default values. Edit if necessary.
        attachment_type: null,
        person_id: null,
        url: null
      }
    };

    appTester(App.creates['add_attachment'].operation.perform, bundle)
      .then(result => {
        result.should.not.be.an.Array();
        done();
      })
      .catch(done);
  });
});
