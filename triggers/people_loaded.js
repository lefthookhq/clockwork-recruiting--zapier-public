const getLoadedPeople = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{bundle.authData.firm_subdomain}/people',
    method: 'GET',
    params: {
      detail: 'full',
      sort: '-loadedAt'
    }
  })
  if (response.data && response.data.people && response.data.people.records) {
    return response.data.people.records
  } else {
    return []
  }
}

module.exports = {
  key: 'people_loaded',
  noun: 'Person',

  display: {
    label: 'People Recently Loaded',
    description: 'Triggers when there are recently added or imported people.',
    hidden: true,
    important: false
  },

  operation: {
    inputFields: [
    ],
    outputFields: [],
    perform: getLoadedPeople,
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
