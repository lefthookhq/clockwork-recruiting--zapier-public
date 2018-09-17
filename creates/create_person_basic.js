const getPerson = async (z, bundle, id) => {
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

const createPerson = async (z, bundle) => {
  let body = JSON.parse(JSON.stringify(bundle.inputData))

  if (bundle.inputData.address_street !== undefined) {
    var addresses = []
    var address = {}
    address.street = bundle.inputData.address_street

    if (bundle.inputData.address_location !== undefined) {
      address.location = bundle.inputData.address_location
    }

    if (bundle.inputData.address_street2 !== undefined) {
      address.street2 = bundle.inputData.address_street2
    }

    if (bundle.inputData.home_address_city !== undefined) {
      address.city = bundle.inputData.address_city
    }

    if (bundle.inputData.address_state !== undefined) {
      address.state = bundle.inputData.address_state
    }

    if (bundle.inputData.address_postal_code !== undefined) {
      address.postalCode = bundle.inputData.address_postal_code
    }

    if (bundle.inputData.address_country !== undefined) {
      address.country = bundle.inputData.address_country
    }

    addresses.push(address)
    body.addresses = addresses
  }
  delete body.update_create
  /*
  // format email address
  body.emailAddresses = [{
    location: 'work',
    address: bundle.inputData.emailAddress,
    isPreferred: true
  }]
  delete body.emailAddress
*/
  let url = 'https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/people'
  let search = await searchPerson(z, bundle)
  if (search.status === 200 && bundle.inputData.update_create) {
    url += '/' + search.json.data.person.id
  }
  if (search.status === 404 && bundle.inputData.update_create) {
    throw new z.errors.HaltedError('Person with email exists with the given email and update if found is set to no.')
  }

  let response = await z.request({
    url: url,
    method: 'POST',
    json: body
  })

  let id = response.json.data.person.id

  let fullDetailResponse = await getPerson(z, bundle, id)
  return fullDetailResponse
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
        helpText: 'Current position held by person.',
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
        key: 'positionEnd',
        label: 'Position End',
        helpText: 'End month and year of primary job position. Format YYYY/MM',
        type: 'string',
        required: false
      },
      {
        key: 'positionStart',
        label: 'Position Start',
        helpText: 'Start month and year of primary job position. Format YYYY/MM',
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
      pictureUrl:
        'https://clockwork-images.s3-us-west-2.amazonaws.com/person_image/000/000/002/430/1fb2a1c/182b641_wide_large_icon.jpg?1440877787',
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
