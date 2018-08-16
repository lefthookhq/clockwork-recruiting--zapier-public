// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
const {
  replaceVars
} = require('../utils')

const makeRequest = (z, bundle) => {
  const scripting = require('../scripting')
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting)

  bundle._legacyUrl = 'https://api.clockworkrecruiting.com/v1/{{firm_subdomain}}/people'
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle)

  // Do a _pre_write() from scripting.
  const preWriteEvent = {
    name: 'create.pre',
    key: 'create_person'
  }
  return legacyScriptingRunner
    .runEvent(preWriteEvent, z, bundle)
    .then(preWriteResult => z.request(preWriteResult))
    .then(response => {
      response.throwForStatus()

      // Do a _post_write() from scripting.
      const postWriteEvent = {
        name: 'create.post',
        key: 'create_person',
        response
      }
      return legacyScriptingRunner.runEvent(postWriteEvent, z, bundle)
    })
};

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
    inputFields: [{
      key: 'emailAddress',
      label: 'Email Address',
      helpText: 'Primary email address of the person.',
      type: 'string',
      required: true
    },
    {
      key: 'externalRef',
      label: 'External Reference',
      helpText: 'Unique reference to person in an external system.',
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
      key: 'lastName',
      label: 'Last Name',
      helpText: 'Last name of person.',
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
      key: 'mobilePhoneNumber',
      label: 'Mobile Phone Number',
      helpText: 'Mobile phone number of person.',
      type: 'string',
      required: false
    },
    {
      key: 'name',
      label: 'Name',
      helpText: 'Full name of the person.',
      type: 'string',
      required: true
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
      helpText: 'End month and year of primary job position.',
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
    },
    {
      key: 'update_create',
      label: 'Update if Found?',
      helpText: 'If yes is chosen the action will update a contact if one exist with the email.\nIf no is chosen the action will throw on error if a contact exist with the same email.',
      type: 'boolean',
      required: true
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
    perform: makeRequest,
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
