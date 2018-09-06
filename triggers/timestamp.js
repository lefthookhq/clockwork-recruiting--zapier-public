const getTimeStamp = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/support/timestamp',
    method: 'GET'
  })
  return {id: 'ok'}
}

module.exports = {
  key: 'timestamp',
  noun: 'Timestamp',

  display: {
    label: 'Get Timestamp',
    description: 'This is a hidden test triger',
    hidden: true,
    important: false
  },

  operation: {
    inputFields: [],
    outputFields: [],
    perform: getTimeStamp,
    sample: {
      id: 123
    }
  }
}
