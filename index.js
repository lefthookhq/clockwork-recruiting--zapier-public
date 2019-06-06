// Created by 'zapier convert'. This is just a stub - you will need to edit!

const authentication = require('./auth2')
const PeopleloadedTrigger = require('./triggers/people_loaded')
const PeopleupdatedTrigger = require('./triggers/people_updated')
const TimestampTrigger = require('./triggers/timestamp')
const PersonSearch = require('./searches/person')
const AddattachmentCreate = require('./creates/add_attachment')
const AddnoteCreate = require('./creates/add_note')
const CreatepersonCreate = require('./creates/create_person')
const CreatepersonbasicCreate = require('./creates/create_person_basic')

const formatForClockwork = (request, z, bundle) => {
  if (!request.url.includes("/oauth/token") && !request.url.includes("/oauth/authorize") ) {
    request.headers.Authorization = `bearer ${bundle.authData.access_token}`;
    request.headers['content-type'] = 'application/json';
    request.headers['X-API-KEY'] = process.env.API_KEY;
    return request;
  } else {
    return request;
  }
}

const checkForError = (response, z, bundle) => {
  if (response.status === 500) {
    throw Error('Internal error')
  }
  if (response.status === 400) {
    let error = response.json.data.message
    throw new Error(error)
  }
  return response
}

// after app to look for error codes and format.
const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [formatForClockwork],

  afterResponse: [
    checkForError
  ],

  resources: {},

  triggers: {
    [PeopleloadedTrigger.key]: PeopleloadedTrigger,
    [PeopleupdatedTrigger.key]: PeopleupdatedTrigger,
    [TimestampTrigger.key]: TimestampTrigger
  },

  searches: {
    [PersonSearch.key]: PersonSearch
  },

  creates: {
    [AddattachmentCreate.key]: AddattachmentCreate,
    [AddnoteCreate.key]: AddnoteCreate,
    [CreatepersonCreate.key]: CreatepersonCreate,
    [CreatepersonbasicCreate.key]: CreatepersonbasicCreate
  },

  searchOrCreates: {
    person: {
      key: 'person',
      display: {
        label: 'Find or Create Person',
        description: 'Find or Create Person'
      },
      search: 'person',
      create: 'create_person_basic'
    }
  }
}

module.exports = App
