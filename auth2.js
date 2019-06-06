const authorize = (z, bundle) => {
      let url =  `https://${bundle.inputData.firm_subdomain}.clockworkrecruiting.com/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=people.*&redirect_uri=${bundle.inputData.redirect_uri}`;
      return url;
}


const getAccessToken = async (z, bundle) => {
    let options = {
        method: 'POST',
        url: `https://api.clockworkrecruiting.com/v1/${bundle.authData.firm_subdomain || bundle.inputData.firm_subdomain}/oauth/token`,
        body: {
            //extra data pulled from the users query string
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: bundle.inputData.redirect_uri,
            scope: "people.*",
            code: bundle.inputData.code,
        },
        headers: {
            'content-type': 'application/json',
            "X-Api-Key": process.env.API_KEY
        }
    };
  const response = await z.request(options);

  // Needs to return at minimum, `access_token`, and if your app also does refresh, then `refresh_token` too
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }

    const result = JSON.parse(response.content);
    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token
    };
};

const refreshAccessToken = async (z, bundle) => {
    let options = {
        method: 'POST',
        url: `https://api.clockworkrecruiting.com/v1/${bundle.authData.firm_subdomain || bundle.inputData.firm_subdomain}/oauth/token`,
        body: {
            //extra data pulled from the users query string
            grant_type: "refresh_token",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: bundle.authData.refresh_token
        },
        headers: {
            'content-type': 'application/json',
            "X-Api-Key": process.env.API_KEY
        }
    };
  const response = await z.request(options);

  // Needs to return at minimum, `access_token`, and if your app also does refresh, then `refresh_token` too
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }

    const result = JSON.parse(response.content);
    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token
    };
};

const testAuth = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/support/timestamp',
    method: 'GET'
  })
    if (response.status !== 200) {
      throw new Error('Auth Test Failed: ' + response.content);
    }
  return {
    id: 'ok',
    connectionLabel: bundle.authData.firm_subdomain
  }
}


module.exports = {
  type: 'oauth2',
  oauth2Config: {
    
    authorizeUrl: authorize,
    // Step 2 of the OAuth flow; Exchange a code for an access token.
    // This could also use the request shorthand.
    getAccessToken: getAccessToken,
    // (Optional) If the access token expires after a pre-defined amount of time, you can implement
    // this method to tell Zapier how to refresh it.
    refreshAccessToken: refreshAccessToken,
    // If you want Zapier to automatically invoke `refreshAccessToken` on a 401 response, set to true
    autoRefresh: true
    // If there is a specific scope you want to limit your Zapier app to, you can define it here.
    // Will get passed along to the authorizeUrl
    // scope: 'read,write'
  // The test method allows Zapier to verify that the access token is valid. We'll execute this
  // method after the OAuth flow is complete to ensure everything is setup properly.
  },
  test: testAuth,
  
    fields: [
    {
      key: 'firm_subdomain',
      type: 'string',
      required: true,
      helpText: 'Found in your browsers address bar after logging in.'
    }
  ],
  // assuming "username" is a key returned from the test
  connectionLabel: '{{connectionLabel}}'
};