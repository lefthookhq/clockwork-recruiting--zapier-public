const moment = require('moment')
const _ = require('underscore')

const formatResponse = (response) => {
  let newResponse = JSON.parse(JSON.stringify(response))
  newResponse.loadedAt = moment.unix(newResponse.loadedAt).format()
  newResponse.createdAt = moment.unix(newResponse.createdAt).format()
  newResponse.updatedAt = moment.unix(newResponse.updatedAt).format()
  newResponse.emailAddresses = formatDateFieldsInSubObjectArray(newResponse.emailAddresses)
  if (newResponse.addresses) {
    newResponse.addresses = formatDateFieldsInSubObjectArray(newResponse.addresses)
  }
  if (newResponse.phoneNumbers) {
    newResponse.phoneNumbers = formatDateFieldsInSubObjectArray(newResponse.phoneNumbers)
  }
  if (newResponse.externalRefs) {
    newResponse.externalRefs = formatDateFieldsInSubObjectArray(newResponse.externalRefs)
  }
  if (newResponse.tags) {
    newResponse.tags = formatDateFieldsInSubObjectArray(newResponse.tags)
  }
  if (newResponse.positions) {
    newResponse.positions = formatDateFieldsInSubObjectArray(newResponse.positions)
  }
  if (newResponse.attachments) {
    newResponse.attachments = formatDateFieldsInSubObjectArray(newResponse.attachments)
  }
  return newResponse
}

const formatDateFieldsInSubObjectArray = (array) => {
  let finalArray = _.map(array, (arrayObject) => {
    arrayObject.updatedAt = moment.unix(arrayObject.updatedAt).format()
    arrayObject.createdAt = moment.unix(arrayObject.createdAt).format()
    return arrayObject
  })
  return finalArray
}

const getFullDetialPerson = async (z, bundle, id) => {
  let response = await z.request({
    url: `https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/people/${id}`,
    method: 'GET',
    params: {
      detail: 'full'
    }
  })

  return response.json.data.person
}

const searchPerson = async (z, bundle) => {
  let response = await z.request({
    url: `https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/people/${encodeURIComponent(bundle.inputData.emailAddress)}`,
    method: 'GET',
    params: {
      detail: 'full'
    }
  })

  return response
}

module.exports = {
  formatResponse: formatResponse,
  formatDateFieldsInSubObjectArray: formatDateFieldsInSubObjectArray,
  getFullDetialPerson: getFullDetialPerson,
  searchPerson: searchPerson
}
