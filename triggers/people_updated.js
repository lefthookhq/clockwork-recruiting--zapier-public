const {formatResponse} = require('../supporting_functions.js')
const _ = require('underscore')

const getUpdatedPeople = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/people',
    method: 'GET',
    params: {
      detail: 'full',
      sort: '-updatedAt',
      tags: bundle.inputData.tags || ''
    }
  })
  if (response.json.data && response.json.data.people && response.json.data.people.records) {
    let mappedResponse = _.map(response.json.data.people.records, (record) => {
      if (bundle.inputData.new_updated === 'New & Updated') {
        record.contactId = record.id
        record.id = record.conactId + record.updatedAt
      }
      return formatResponse(record)
    })
    // await z.request({
    //   url: 'https://lefthook-requestbin.herokuapp.com/1iqebsq1',
    //   method: 'POST',
    //   json: mappedResponse
    // })
    return mappedResponse
  } else {
    return []
  }
}

module.exports = {
  key: 'people_updated',
  noun: 'Person',

  display: {
    label: 'New/Update Contact',
    description: 'Triggers when there are new or updated person.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'new_updated',
        label: 'New/Updated',
        type: 'string',
        required: true,
        choices: { new: 'New People', both: 'New & Updated' }
      },
      {
        key: 'tag',
        label: 'Tag',
        helpText:
          'Please enter a comma separated list of tags',
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
        label: 'updatedId',
        type: 'string'
      },
      {
        key: 'contactId',
        label: 'id',
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
    perform: getUpdatedPeople,
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
