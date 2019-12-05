# Clockwork Recruiting Zapier App

Clockwork Recruiting executive search software provides the tools you need to place candidates faster.

[API Docs](https://devdocs.clockworkrecruiting.com/cw-api-docs/)

## Changelog

:beetle: = Bug Fix

## [Unreleased]

- scripting.js -> Prettier
    -   "resource": "/Users/kellydavis/lefthook/zapier_clockwork_cli/scripting.js",
        "owner": "typescript",
        "code": "1005",
        "severity": 8,
        "message": "',' expected.",
        "source": "ts",
        "startLineNumber": 51,
        "startColumn": 129,
        "endLineNumber": 51,
        "endColumn": 138

- Delete unused authentication.js

## [1.0.2][November 2019]

### Updated

- Dependencies
 ~ ajv                      ^6.10.0  →   ^6.10.2
 async                      2.5.0  →     3.1.0
 lodash                  ^4.17.11  →  ^4.17.15
 moment                   ^2.22.2  →   ^2.24.0
 moment-timezone           0.5.13  →    0.5.27 ~
 zapier-platform-cli        8.2.0  →     9.0.0
 zapier-platform-core       8.2.0  →     9.0.0
 ~ eslint                   ^5.16.0  →    ^6.7.1
 eslint-config-standard   ^11.0.0  →   ^14.1.0
 eslint-plugin-import     ^2.14.0  →   ^2.18.2
 eslint-plugin-node        ^7.0.1  →   ^10.0.0
 eslint-plugin-promise     ^3.8.0  →    ^4.2.1
 eslint-plugin-standard    ^3.1.0  →    ^4.0.1
 mocha                      4.0.1  →     6.2.2
 should                    13.1.2  →    13.2.3 ~

- creates/add_attachment.js
    - :beetle: Added dynamic dropdown to "person_id"
    - Changed noun from 'Add_attachment' to 'Attachment'

- creates/add_note.js
    - :beetle: Added dynamic dropdown to "person_id"
    - Changed noun from 'Add_attachment' to 'Note"
    - Refactored choices
- Renamed repo

### Added

- README.md