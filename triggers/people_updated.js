const _ = require('underscore')

const getUpdatedPeople = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{firm_subdomain}/people',
    method: 'GET',
    params: {
      detail: 'full',
      sort: '-updatedAt'
    }
  })
  let people = response.data.people.records
  let mappedResponse = _.map(people, (person) => {
    person.contactId = person.id
    person.id = person.id + person.updatedAt
    return person
  })

  return mappedResponse
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
          'Please enter a comma separated list of tags. Note: If multiple tags are used this trigger will only return contacts that contain all the tags in the list.',
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
      address: null,
      emailAddress: 'example_user@clockworkrecruiting.com',
      externalRef: null,
      firstName: 'Jane',
      homeAddress: null,
      homeEmailAddress: null,
      homePhoneNumber: null,
      id: 885944,
      initials: 'CS',
      lastName: 'Doe',
      linkedinUrl: null,
      middleName: null,
      mobilePhoneNumber: null,
      name: 'Jane Doe',
      otherAddress: null,
      otherEmailAddress: 'example_user@clockworkrecruiting.com',
      otherPhoneNumber: null,
      phoneNumber: null,
      pictureUrl: null,
      position: 'VP of Important Things at Clockwork Recruiting, 1/2010 to present',
      positionCompany: 'Clockwork Recruiting',
      positionEnd: null,
      positionStart: '1/2010',
      positionTitle: 'VP of Important Things',
      prefix: null,
      suffix: null,
      tag: 'Example;Legal;Industry: Software',
      updatedAt: 1479236235,
      version: 74,
      workAddress: null,
      workEmailAddress: null,
      workPhoneNumber: null
    }
  }
}
