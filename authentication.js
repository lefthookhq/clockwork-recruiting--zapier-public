
const testAuth = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/support/timestamp',
    method: 'GET'
  })
  return {id: 'ok'}
}
const getSessionKey = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://api.clockworkrecruiting.com/v1/lefthook/oauth/token',
    body: {
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'grant_type': 'password',
      'username': bundle.authData.username,
      'password': bundle.authData.password,
      'scope': 'people.*'
    }
  })

  if (response.status === 401) {
    throw new Error('The username/password you supplied is invalid')
  }
  return {
    sessionKey: response.json.access_token,
    firm_subdomain: bundle.authData.firm
  }
}

const authentication = {
  type: 'session',
  // "test" could also be a function
  test: testAuth,
  fields: [
    {
      key: 'username',
      type: 'string',
      required: true,
      helpText: 'Your login username.'
    },
    {
      key: 'password',
      type: 'password',
      required: true,
      helpText: 'Your login password.'
    },
    {
      key: 'firm',
      label: 'Firm Subdomain',
      type: 'string',
      required: true,
      helpText: 'Subdomain for your firm'
    },
    {
      key: 'firm_subdomain',
      type: 'string',
      required: false,
      computed: true
    }
  ],
  sessionConfig: {
    perform: getSessionKey
  }
}

module.exports = authentication
