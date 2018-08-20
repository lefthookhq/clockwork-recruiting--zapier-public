const findPeople = async (z, bundle) => {
  let response = await z.request({
    url: 'https://api.clockworkrecruiting.com/v1/{firm_subdomain}/people/{{bundle.inputData.id_value}}/people',
    method: 'GET',
    params: {
      detail: 'full',
      sort: '-loadedAt'
    }
  })
  if (response.status_code === 404) {
    return []
  }
  if (response.data && response.data.people && response.data.people.records) {
    return response.data.people.records
  } else {
    return []
  }
}

const getList = (z, bundle) => {
  const scripting = require('../scripting')
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting)

  // We're cloning bundle to re-use it when mimicking a "fetch resource" that happened in WB
  const resourceBundle = _.cloneDeep(bundle)

  bundle._legacyUrl = 'https://api.clockworkrecruiting.com/v1/{{firm_subdomain}}/people/{{id_value}}?detail=summary'
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle)
  bundle.request = { url: bundle._legacyUrl }

  resourceBundle._legacyUrl = 'https://api.clockworkrecruiting.com/v1/{{firm_subdomain}}/people/{{id}}'

  return runBeforeMiddlewares(bundle.request, z, bundle)
    .then(request => {
      bundle.request = request

      // Do a _search() from scripting.
      const fullSearchEvent = {
        name: 'search.search',
        key: 'person'
      }
      return legacyScriptingRunner.runEvent(fullSearchEvent, z, bundle)
    })

    .then(fullSearchResult => {
      // Mimick the "fetch resource" that happened in WB
      const results = fullSearchResult

      // Do a _pre_read_resource() from scripting.
      const preResourceEvent = {
        name: 'search.resource.pre',
        key: 'person',
        results
      }
      resourceBundle._legacyUrl = replaceVars(resourceBundle._legacyUrl, resourceBundle, _.get(results, 0))
      return legacyScriptingRunner.runEvent(preResourceEvent, z, resourceBundle)
    })
    .then(preResourceResult => z.request(preResourceResult))
    .then(response => {
      response.throwForStatus()

      // Do a _post_read_resource() from scripting.
      const postResourceEvent = {
        name: 'search.resource.post',
        key: 'person',
        response,
        results: resourceBundle.results
      }
      return legacyScriptingRunner.runEvent(postResourceEvent, z, resourceBundle)
    })
    .then(results => {
      // WB would return a single record, but in CLI we expect an array
      if (_.isArray(results)) {
        return results
      } else {
        return [results]
      }
    })
};

module.exports = {
  key: 'person',
  noun: 'Person',

  display: {
    label: 'Find or Create Person',
    description: 'Find an existing person.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'id_value',
        label: 'Search Key',
        helpText:
          'A unique identifier for the person, one of:\n\n1. Unique Clockwork internal integer identifier of a person\n1. Email address of person\n1. URL of LinkedIn profile page for person\n1. External reference key from another system, prefixed with "REF-".',
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
    perform: getList,
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
