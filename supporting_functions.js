const moment = require('moment')
const formatDateFieldsCreateInResponse = (response) => {
  let newResponse = JSON.parse(JSON.stringify(response))
  newResponse.loadedAt = moment.unix(newResponse.loadedAt).format()
  newResponse.createdAt = moment.unix(newResponse.createdAt).format()
  newResponse.updatedAt = moment.unix(newResponse.updatedAt).format()
  return newResponse
}

const getFullDetialPerson = async (z, bundle, id) => {
  let response = await z.request({
    url: `https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/people/${id}`,
    method: 'GET',
    params: {
      detail: 'full'
    }
  })

  return response.json.data.person
}

const searchPerson = async (z, bundle, id) => {
  let response = await z.request({
    url: `https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/people/${encodeURIComponent(bundle.inputData.emailAddress)}`,
    method: 'GET',
    params: {
      detail: 'full'
    }
  })

  return response
}

module.exports = {
  formatDateFieldsCreateInResponse: formatDateFieldsCreateInResponse,
  getFullDetialPerson: getFullDetialPerson,
  searchPerson: searchPerson
}
