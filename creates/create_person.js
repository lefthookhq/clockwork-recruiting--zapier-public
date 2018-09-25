const _ = require('underscore')
const {formatResponse, getFullDetialPerson, searchPerson} = require('../supporting_functions.js')

const createPerson = async (z, bundle) => {
  let body = JSON.parse(JSON.stringify(bundle.inputData))

  var addresses = []

  // check for address fields for home address
  if (bundle.inputData.home_address_street1 !== undefined) {
    var homeAddress = {}
    homeAddress.street = bundle.inputData.home_address_street1
    homeAddress.location = 'home'

    if (bundle.inputData.home_address_street2 !== undefined) {
      homeAddress.street2 = bundle.inputData.home_address_street2
    }

    if (bundle.inputData.home_address_city !== undefined) {
      homeAddress.city = bundle.inputData.home_address_city
    }

    if (bundle.inputData.home_address_state !== undefined) {
      homeAddress.state = bundle.inputData.home_address_state
    }

    if (bundle.inputData.home_address_postal_code !== undefined) {
      homeAddress.postalCode = bundle.inputData.home_address_postal_code
    }

    if (bundle.inputData.home_address_country !== undefined) {
      homeAddress.country = bundle.inputData.home_address_country
    }

    addresses.push(homeAddress)
  }
  // check for address fields for work address
  if (bundle.inputData.work_address_street1 !== undefined) {
    var workAddress = {}
    workAddress.street = bundle.inputData.work_address_street1
    workAddress.location = 'work'

    if (bundle.inputData.work_address_street2 !== undefined) {
      workAddress.street2 = bundle.inputData.work_address_street2
    }

    if (bundle.inputData.work_address_city !== undefined) {
      workAddress.city = bundle.inputData.work_address_city
    }

    if (bundle.inputData.work_address_state !== undefined) {
      workAddress.state = bundle.inputData.work_address_state
    }

    if (bundle.inputData.work_address_postal_code !== undefined) {
      workAddress.postalCode = bundle.inputData.home_address_postal_code
    }

    if (bundle.inputData.work_address_country !== undefined) {
      workAddress.country = bundle.inputData.work_address_country
    }

    addresses.push(workAddress)
  }
  // check for address fields for other address
  if (bundle.inputData.other_address_street1 !== undefined) {
    var otherAddress = {}
    otherAddress.street = bundle.inputData.other_address_street1
    otherAddress.location = 'other'

    if (bundle.inputData.other_address_street2 !== undefined) {
      otherAddress.street2 = bundle.inputData.other_address_street2
    }

    if (bundle.inputData.other_address_city !== undefined) {
      otherAddress.city = bundle.inputData.other_address_city
    }

    if (bundle.inputData.other_address_state !== undefined) {
      otherAddress.state = bundle.inputData.other_address_state
    }

    if (bundle.inputData.other_address_postal_code !== undefined) {
      otherAddress.postalCode = bundle.inputData.other_address_postal_code
    }

    if (bundle.inputData.other_address_country !== undefined) {
      otherAddress.country = bundle.inputData.other_address_country
    }

    addresses.push(otherAddress)
  }

  if (addresses.length !== 0) {
    body.addresses = addresses
  }

  let url = 'https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/people'
  let search = await searchPerson(z, bundle)
  // may not throw the correct error.
  if (search.status === 200 && bundle.inputData.update_create === true) {
    url += '/' + search.json.data.person.id
  }
  if (search.status !== 404 && bundle.inputData.update_create === false) {
    throw new z.errors.HaltedError('Person with email exists with the given email and update if found is set to no.')
  }
  // clean body of non api fields
  let finalBody = _.omit(body, ['update_create', 'home_address_city', 'home_address_country', 'home_address_location', 'home_address_postal_code', 'home_address_state', 'home_address_street1', 'other_address_street1', 'home_address_street2', 'work_address_street1', 'home_address_street', 'other_address_city', 'other_address_country', 'other_address_location', 'other_address_postal_code', 'other_address_state', 'other_address_street2', 'other_address_street', 'work_address_city', 'work_address_country', 'work_address_location', 'work_address_postal_code', 'work_address_state', 'work_address_street2', 'work_address_street'])
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
  key: 'create_person',
  noun: 'Person',

  display: {
    label: 'Create/Update Person Advanced',
    description: 'Create a new person.',
    hidden: false,
    important: false
  },

  operation: {
    inputFields: [
      {
        key: 'update_create',
        label: 'Update if Found?',
        helpText: 'If yes is chosen the action will update a contact if one exist with the email.\nIf no is chosen the action will throw on error if a contact exist with the same email.',
        type: 'boolean',
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
        key: 'name',
        label: 'Name',
        helpText: 'Full name of the person.',
        type: 'string',
        required: false
      },
      {
        key: 'firstName',
        label: 'First Name',
        helpText: 'First name of person.',
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
        key: 'lastName',
        label: 'Last Name',
        helpText: 'Last name of person.',
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
        key: 'homeEmailAddress',
        label: 'Home Email Address',
        helpText: 'Home email address.',
        type: 'string',
        required: false
      },
      {
        key: 'homePhoneNumber',
        label: 'Home Phone Number',
        helpText: 'Home phone number of person.',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_city',
        label: 'Home Address City',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_country',
        label: 'Home Address Country',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_postal_code',
        label: 'Home Address Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_state',
        label: 'Home Address State',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_street1',
        label: 'Home Address Street1',
        helpText: 'Home of person.',
        type: 'string',
        required: false
      },
      {
        key: 'home_address_street2',
        label: 'Home Address Street2',
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
        key: 'mobilePhoneNumber',
        label: 'Mobile Phone Number',
        helpText: 'Mobile phone number of person.',
        type: 'string',
        required: false
      },
      {
        key: 'otherEmailAddress',
        label: 'Other Email Address',
        helpText: 'Other email address.',
        type: 'string',
        required: false
      },
      {
        key: 'otherPhoneNumber',
        label: 'Other Phone Number',
        helpText: 'Other phone number of person.',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_city',
        label: 'Other Address City',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_country',
        label: 'Other Address Country',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_postal_code',
        label: 'Other Address Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_state',
        label: 'Other Address State',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_street1',
        label: 'Other Address Street1',
        helpText: 'Other of person.',
        type: 'string',
        required: false
      },
      {
        key: 'other_address_street2',
        label: 'Other Address Street2',
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
        helpText: 'Description of the current position held by person.',
        type: 'text',
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
        key: 'positionCompany',
        label: 'Position Company',
        helpText: 'Company name of primary job position.',
        type: 'string',
        required: false
      },
      {
        key: 'positionStart',
        label: 'Position Start',
        helpText: 'Start month and year of primary job position.',
        type: 'string',
        required: false
      },
      {
        key: 'positionEnd',
        label: 'Position End',
        helpText: 'End month and year of primary job position.',
        type: 'string',
        required: false
      },
      {
        key: 'tag',
        label: 'Tags',
        helpText: 'Semi-colon delimited list of keyword tag values associated with this person.',
        type: 'string',
        required: false
      },
      {
        key: 'workEmailAddress',
        label: 'Work Email Address',
        helpText: 'Work email address.',
        type: 'string',
        required: false
      },
      {
        key: 'workPhoneNumber',
        label: 'Work Phone Number',
        helpText: 'Work phone number of person.',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_city',
        label: 'Work Address City',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_country',
        label: 'Work Address Country',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_postal_code',
        label: 'Work Address Postal Code',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_state',
        label: 'Work Address State',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_street1',
        label: 'Work Address Street1',
        type: 'string',
        required: false
      },
      {
        key: 'work_address_street2',
        label: 'Work Address Street2',
        type: 'string',
        required: false
      }
    ],
    outputFields: [{
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
      address: '2030 Franklin St, Suite 202, Oakland, CA, 94612',
      emailAddress: 'christian@clockworkrecruiting.com',
      externalRef: null,
      firstName: 'Christian',
      homeAddress: null,
      homeEmailAddress: null,
      homePhoneNumber: null,
      id: 885944,
      initials: 'CS',
      lastName: 'Spletzer',
      linkedinUrl: 'https://www.linkedin.com/in/christianspletzer',
      middleName: null,
      mobilePhoneNumber: null,
      name: 'Christian Spletzer',
      otherAddress: null,
      otherEmailAddress: 'christian@clockworkrecruiting.com',
      otherPhoneNumber: null,
      phoneNumber: '(510) 629-4494',
      pictureUrl: 'https://clockwork-images.s3-us-west-2.amazonaws.com/person_image/000/000/002/430/1fb2a1c/182b641_wide_large_icon.jpg?1440877787',
      position: 'Founder / CEO at Clockwork Recruiting, 1/2010 to present',
      positionCompany: 'Clockwork Recruiting',
      positionEnd: null,
      positionStart: '1/2010',
      positionTitle: 'Founder / CEO',
      prefix: null,
      suffix: null,
      tag: 'CEO;Clockwork Recruiting',
      updatedAt: 1479372140,
      version: 4,
      workAddress: '2030 Franklin St, Suite 202, Oakland, CA, 94612',
      workEmailAddress: null,
      workPhoneNumber: '(510) 629-4494'
    }
  }
}
