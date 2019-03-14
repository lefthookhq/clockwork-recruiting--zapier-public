const _ = require('underscore')
const {formatResponse, getFullDetialPerson, searchPerson} = require('../supporting_functions.js')

const createPerson = async (z, bundle) => {
  let body = JSON.parse(JSON.stringify(bundle.inputData))

  if (bundle.inputData.address_street) {
    var addresses = []
    var address = {}
    address.street = bundle.inputData.address_street

    if (bundle.inputData.address_location) {
      address.location = bundle.inputData.address_location
    }

    if (bundle.inputData.address_street2) {
      address.street2 = bundle.inputData.address_street2
    }

    if (bundle.inputData.address_city) {
      address.city = bundle.inputData.address_city
    }

    if (bundle.inputData.address_state) {
      address.state = bundle.inputData.address_state
    }

    if (bundle.inputData.address_postal_code) {
      address.postalCode = bundle.inputData.address_postal_code
    }

    if (bundle.inputData.address_country) {
      address.country = bundle.inputData.address_country
    }

    addresses.push(address)
    body.addresses = addresses
  }
  let finalBody = _.omit(body, ['address_city', 'address_country', 'update_create', 'address_location', 'address_postal_code', 'address_state', 'address_street2', 'address_street'])
  let url = `https://api.clockworkrecruiting.com/v1/${bundle.authData.firm_subdomain}/people`
  let search = await searchPerson(z, bundle)
  if (search.status === 200 && bundle.inputData.update_create === true) {
    url += '/' + search.json.data.person.id
  }
  if (search.status !== 404 && bundle.inputData.update_create === false) {
    throw new z.errors.HaltedError('Person with email exists with the given email and update if found is set to no.')
  }

  let response = await z.request({
    url: url,
    method: 'POST',
    json: finalBody
  })

  let id = response.json.data.person.id

  let fullDetailResponse = await getFullDetialPerson(z, bundle, id)
  return formatResponse(fullDetailResponse)
}

module.exports = {
  key: 'create_person_basic',
  noun: 'Person',

  display: {
    label: 'Create/Update Person Basic',
    description: 'Create a new person.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Name',
        helpText: 'Full name of the person.',
        type: 'string',
        required: true
      },
      {
        key: 'emailAddress',
        label: 'Email Address',
        helpText: 'Primary email address of the person.',
        type: 'string',
        required: true
      },
      {
        key: 'update_create',
        label: 'Update if Found?',
        helpText:
          'If yes is chosen the action will update a contact if one exist with the email.\nIf no is chosen the action will throw on error if a contact exist with the same email.',
        type: 'boolean',
        required: true
      },
      {
        key: 'firstName',
        label: 'First Name',
        helpText: 'First name of person.',
        type: 'string',
        required: false
      },
      {
        key: 'lastName',
        label: 'Last Name',
        helpText: 'Last name of person.',
        type: 'string',
        required: false
      },
      {
        key: 'address_city',
        label: 'Address City',
        type: 'string',
        required: false
      },
      {
        key: 'address_country',
        label: 'Address Country',
        type: 'string',
        required: false
      },
      {
        key: 'address_location',
        label: 'Address Location',
        helpText: 'Location of address.',
        type: 'string',
        required: false,
        choices: { work: 'work', home: 'home', other: 'other' }
      },
      {
        key: 'address_postal_code',
        label: 'Address Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'address_state',
        label: 'Address State',
        type: 'string',
        required: false
      },
      {
        key: 'address_street',
        label: 'Address Street',
        type: 'string',
        required: false
      },
      {
        key: 'address_street2',
        label: 'Address Street2',
        type: 'string',
        required: false
      },
      {
        key: 'externalRef',
        label: 'External Reference',
        helpText: 'Unique reference to person in an external system.',
        type: 'string',
        required: false
      },
      {
        key: 'linkedinUrl',
        label: 'LinkedIn URL',
        helpText: 'URL for LinkedIn profile page of person.',
        type: 'string',
        required: false
      },
      {
        key: 'middleName',
        label: 'Middle Name',
        helpText: 'Middle name of person.',
        type: 'string',
        required: false
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        helpText: 'Phone number of person.',
        type: 'string',
        required: false
      },
      {
        key: 'pictureUrl',
        label: 'Picture URL',
        helpText: 'URL of profile picture for person.',
        type: 'string',
        required: false
      },
      {
        key: 'position',
        label: 'Position',
        helpText: 'Description of the position as a summary string.',
        type: 'text',
        required: false
      },
      {
        key: 'positionCompany',
        label: 'Position Company',
        helpText: 'Company name of primary job position.',
        type: 'string',
        required: false
      },
      {
        key: 'positionEnd',
        label: 'Position End',
        helpText: 'End month and year of primary job position. Format MM/YYYY',
        type: 'string',
        required: false
      },
      {
        key: 'positionStart',
        label: 'Position Start',
        helpText: 'Start month and year of primary job position. Format MM/YYYY',
        type: 'string',
        required: false
      },
      {
        key: 'positionTitle',
        label: 'Position Title',
        helpText: 'Title of the primary job position.',
        type: 'string',
        required: false
      },
      {
        key: 'prefix',
        label: 'Prefix',
        helpText: 'Prefix before name of person.',
        type: 'string',
        required: false
      },
      {
        key: 'suffix',
        label: 'Suffix',
        helpText: 'Suffix after name of person.',
        type: 'string',
        required: false
      },
      {
        key: 'tag',
        label: 'Tags',
        helpText: 'Semi-colon delimited list of keyword tag values associated with this person.',
        type: 'string',
        required: false
      }
    ],
    outputFields: [
      {
        key: 'address',
        type: 'string'
      },
      {
        key: 'emailAddress',
        type: 'string'
      },
      {
        key: 'externalRef',
        type: 'string'
      },
      {
        key: 'firstName',
        type: 'string'
      },
      {
        key: 'homeAddress',
        type: 'string'
      },
      {
        key: 'homeEmailAddress',
        type: 'string'
      },
      {
        key: 'homePhoneNumber',
        type: 'string'
      },
      {
        key: 'id',
        type: 'string'
      },
      {
        key: 'initials',
        type: 'string'
      },
      {
        key: 'lastName',
        type: 'string'
      },
      {
        key: 'linkedinUrl',
        type: 'string'
      },
      {
        key: 'middleName',
        type: 'string'
      },
      {
        key: 'mobilePhoneNumber',
        type: 'string'
      },
      {
        key: 'name',
        type: 'string'
      },
      {
        key: 'otherAddress',
        type: 'string'
      },
      {
        key: 'otherEmailAddress',
        type: 'string'
      },
      {
        key: 'otherPhoneNumber',
        type: 'string'
      },
      {
        key: 'phoneNumber',
        type: 'string'
      },
      {
        key: 'pictureUrl',
        type: 'string'
      },
      {
        key: 'position',
        type: 'string'
      },
      {
        key: 'positionCompany',
        type: 'string'
      },
      {
        key: 'positionEnd',
        type: 'string'
      },
      {
        key: 'positionStart',
        type: 'string'
      },
      {
        key: 'positionTitle',
        type: 'string'
      },
      {
        key: 'prefix',
        type: 'string'
      },
      {
        key: 'suffix',
        type: 'string'
      },
      {
        key: 'tag',
        type: 'string'
      },
      {
        key: 'updatedAt',
        type: 'string'
      },
      {
        key: 'version',
        type: 'string'
      },
      {
        key: 'workAddress',
        type: 'string'
      },
      {
        key: 'workEmailAddress',
        type: 'string'
      },
      {
        key: 'workPhoneNumber',
        type: 'string'
      }
    ],
    perform: createPerson,
    sample: {
      'id': 4456601,
      'version': 9,
      'name': 'Test Person',
      'prefix': 'Mr',
      'firstName': 'Test',
      'middleName': 'Danger',
      'lastName': 'Person',
      'suffix': 'Jr',
      'initials': 'TDP',
      'biography': 'A well known international spy',
      'assistantName': 'Assistant Placeholder',
      'skypeName': 'test_danger_person',
      'doNotContact': false,
      'noRelocation': false,
      'createdAt': '2018-09-13T06:35:09+00:00',
      'updatedAt': '2018-09-24T16:05:44+00:00',
      'loadedAt': '2018-09-13T06:35:09+00:00',
      'pictureUrls': 'http://www.pictureUrls.com',
      'externalRefs': [{
        'id': 2402742,
        'externalRef': 'External Ref',
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'tags': [{
        'id': 3203905,
        'tagId': 36614,
        'name': 'tag1',
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }, {
        'id': 3203906,
        'tagId': 36700,
        'name': 'tag2',
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }, {
        'id': 3203907,
        'tagId': 36701,
        'name': 'tag3',
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'emailAddresses': [{
        'id': 2076493,
        'address': 'testPerson@email.com',
        'location': 'home',
        'isPreferred': false,
        'createdAt': '2018-09-13T06:35:09+00:00',
        'updatedAt': '2018-09-13T06:35:09+00:00'
      }],
      'linkedinUrls': [{
        'id': 1911381,
        'url': 'https://www.linkedin.com/in/test-person-b33bb7169',
        'isPreferred': true,
        'createdAt': '2018-09-13T06:35:09+00:00',
        'updatedAt': '2018-09-13T06:35:09+00:00'
      }],
      'addresses': [{
        'id': 2774126,
        'street': '123 Fake Home St',
        'street2': 'Apt2',
        'city': 'Home City',
        'state': 'NH',
        'postalCode': '03824',
        'country': 'Home Country',
        'location': 'home',
        'isPreferred': false,
        'regionName': null,
        'createdAt': '2018-09-20T17:50:41+00:00',
        'updatedAt': '2018-09-20T17:50:41+00:00'
      }, {
        'id': 2774127,
        'street': '234 Fake Street',
        'street2': 'Work Apt',
        'city': 'Work City',
        'state': 'NH',
        'postalCode': '03824',
        'country': 'Work Country',
        'location': 'work',
        'isPreferred': false,
        'regionName': null,
        'createdAt': '2018-09-20T17:50:41+00:00',
        'updatedAt': '2018-09-20T17:50:41+00:00'
      }, {
        'id': 2774128,
        'street': '123 Other fake st',
        'street2': '123 Other Address Street',
        'city': 'Other City',
        'state': 'NH',
        'postalCode': '04029',
        'country': 'Other Country',
        'location': 'other',
        'isPreferred': false,
        'regionName': null,
        'createdAt': '2018-09-20T17:50:41+00:00',
        'updatedAt': '2018-09-20T17:50:41+00:00'
      }],
      'phoneNumbers': [{
        'id': 2373347,
        'digits': '5555555555',
        'extension': null,
        'location': 'other',
        'isPreferred': true,
        'createdAt': '2018-09-20T17:50:41+00:00',
        'updatedAt': '2018-09-20T17:50:41+00:00'
      }],
      'positions': [{
        'id': 18412546,
        'title': 'Position Title',
        'startMonth': 12,
        'startYear': 2009,
        'endMonth': 12,
        'endYear': 2012,
        'isCurrent': false,
        'companyAliasId': 8807124,
        'company': {
          'id': 7943136,
          'name': 'Position Company',
          'aliases': [{
            'id': 8807124,
            'name': 'Position Company'
          }]
        },
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'education': [{
        'id': 63,
        'degree': 'JD',
        'startYear': 1996,
        'endYear': 1999,
        'school': {
          'id': 251,
          'name': 'Brooklyn Law School'
        },
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'compensation': [{
        'id': 3,
        'description': 'Compensation at McCorp',
        'isCurrent': false,
        'startYear': 2012,
        'endYear': 2014,
        'salary': 200000,
        'bonus': 5,
        'bonusType': 'percent',
        'equity': '5.0',
        'equityType': 'percent',
        'currencyCode': 'USD',
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'webSites': [{
        'id': 15,
        'url': 'http://www.clockworkrecruiting.com',
        'location': 'work',
        'isPreferred': true,
        'createdAt': '2018-09-20T17:55:09+00:00',
        'updatedAt': '2018-09-20T17:55:09+00:00'
      }],
      'attachments': [{
        'id': 1684294,
        'attachmentType': 'references',
        'fileName': 'Filename',
        'fileSize': 16195,
        'contentType': 'application/octet-stream',
        'url': 'https://clockwork-attachments.s3-us-west-2.amazonaws.com/f170/person_references/000/001/684/294/0a5da29/VINsolutions%20Private%20App%20for%20Curaytor.docx?AWSAccessKeyId=AKIAJK7QI6GEUCKB4B4Q&Expires=1537888730&Signature=FPDywAULr7%2B29c6oEPZSOk3hprU%3D',
        'createdAt': '2018-09-24T14:52:26+00:00',
        'updatedAt': '2018-09-24T14:52:26+00:00'
      }]
    }
  }
}
