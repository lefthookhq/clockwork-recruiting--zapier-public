const { replaceVars } = require('./utils')
const testTrigger = require('./triggers/timestamp')

const getAccessToken = (z, bundle) => {
  const scripting = require('./scripting')
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting)

  bundle._legacyUrl = 'https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/oauth/token'
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle)

  // Do a pre_oauthv2_token() from scripting.
  const preOAuth2TokenEvent = {
    name: 'auth.oauth2.token.pre'
  }
  return legacyScriptingRunner
    .runEvent(preOAuth2TokenEvent, z, bundle)
    .then(preOAuth2TokenResult => z.request(preOAuth2TokenResult))
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Unable to fetch access token: ${response.content}`)
      }
      return z.JSON.parse(response.content)
    })
}

const refreshAccessToken = (z, bundle) => {
  const scripting = require('./scripting')
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting)

  bundle._legacyUrl = 'https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/oauth/token'
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle)

  // Do a pre_oauthv2_refresh() from scripting.
  const preOAuth2RefreshEvent = {
    name: 'auth.oauth2.refresh.pre'
  }
  return legacyScriptingRunner
    .runEvent(preOAuth2RefreshEvent, z, bundle)
    .then(preOAuth2RefreshResult => z.request(preOAuth2RefreshResult))
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Unable to fetch access token: ${response.content}`)
      }

      return z.JSON.parse(response.content)
    })
}

const authentication = {
  // TODO: just an example stub - you'll need to complete
  type: 'oauth2',
  test: testTrigger.operation.perform,
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'http://{{bundle.authData.firm_subdomain}}.clockworkrecruiting.com/oauth/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code'
      }
    },

    getAccessToken: getAccessToken,

    refreshAccessToken: refreshAccessToken,
    fields: [
      { key: 'firm_subdomain', type: 'string', required: true, default: 'app' }
    ],

    scope: 'people.*',

    autoRefresh: true
  },

  connectionLabel: ''
}

module.exports = authentication
