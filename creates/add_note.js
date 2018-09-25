const {formatResponse, getFullDetialPerson} = require('../supporting_functions.js')

const addNoteToPerson = async (z, bundle) => {
  let data = {
    contentType: 'text/html',
    content: bundle.inputData.content,
    entityId: bundle.inputData.person_id
  }

  if (bundle.inputData.catagory !== undefined) {
    data.category = bundle.inputData.catagory
  }
  let person = {
    notes: [data]
  }
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{{bundle.authData.firm_subdomain}}/people/{{bundle.inputData.person_id}}',
    method: 'POST',
    json: person
  })

  let id = response.json.data.person.id

  let personResponse = await getFullDetialPerson(z, bundle, id)
  return formatResponse(personResponse)
}
// you need to define the fields for this it is taken from add attachment.

module.exports = {
  key: 'add_note',
  noun: 'Add_attachment',

  display: {
    label: 'Add Note to Person',
    description: 'Adds a note to a person.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'person_id',
        label: 'Person ID',
        helpText: 'Please enter the person Id. Note person can be found using a variety of fields by using the Find Person search.',
        type: 'string',
        search: 'person.id',
        required: true
      },
      {
        key: 'content',
        label: 'Content',
        type: 'text',
        required: true
      },
      {
        key: 'visible',
        label: 'Visible',
        type: 'boolean',
        required: true
      },
      {
        key: 'catagory',
        label: 'Category',
        type: 'string',
        required: false,
        choices: {
          'Call': 'Call',
          'Email': 'Email',
          'Follow Up': 'Follow Up',
          'Meeting': 'Meeting',
          'Next Steps': 'Next Steps',
          'Overview': 'Overview',
          'Assessment': 'Assessment',
          'Resume Text': 'Resume Text',
          'Reference': 'Reference',
          'Left Message': 'Left Message',
          'Internal': 'Internal',
          'Source': 'Source',
          'Feedback': 'Feedback'
        }
      }
    ],
    outputFields: [],
    perform: addNoteToPerson,
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
