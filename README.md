# JSON-dereference-online

Derefence your JSON schema on the fly. App is live. [Try now 🚀](https://fcmtest1-2ba38.web.app)

### Build Instructions:

#### Prerequisite
- yarn v1.19.1

#### Setup instructions
1. Clone the repo
2. `yarn install`
3. `yarn start` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Contribution
- Have a nice feature or UI suggestion in mind 🎉? please create an issue !
- Did you just broke this app 🤨? Please raise an issue !

#### Features planned
- [ ] Editor support

### FAQ
- Will this app store my data?
  - No, this app doesn't store or sell your personal data in any way. (Or send to a server in N.Korea/China for that matter)

- What tools does this app use?
  - This app uses the [json-schema-deref](https://github.com/cvent/json-schema-deref) to perform the said job.


##### Sample input to try !

```json
{
  "paths": {
    "/class_definitions": {
      "get": {
        "description": "Get all class definitions",
        "produces": [
          "application/json"
        ],
        "tags": [
          "Class Definitions"
        ],
        "summary": "Get class definitions",
        "operationId": "get-class-definitions",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ClassDefinition"
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "ClassDefinition": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "created_at": {
          "type": "string"
        },
        "created_by": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "updated_by": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "creator_team": {
          "type": "string"
        }
      }
    }
  }
}
```
