# Github Action: slack-upload

This action uploads a file to slack using `slack/web-api`.

If you update the code run 

```
./git-commit "<your commit message>"
```

# Setting up slack 

**Required**: 
  - go to [slack apps](https://api.slack.com/apps)
  - click `Create New App`
    - set `App Name`
    - select your `Development Slack Workspace`
    - `Create App`
  - Select `OAuth & Permissions` from the sidebar 
    - scroll to `Scopes` 
      - add the `file:write` permission
    - scroll to `OAuth Tokens & Redirect URLs`
      - install the app to your workspace
    - copy the generated OAuth Access Token 
  - Setup a Secret on Github (Repository Secret or Organization Secret with selected repositories)
    - name: SLACK_UPLOAD_TOKEN
    - value: <generated Slack OAuth Access Token>
  - Invite the app to your channels 
    - type `/invite <app-name>`
  

# Usage

## Inputs

- `token`: set the Slack OAuth Access Token
  - required
- `channels`: comma separated list of strings
  - required
- `file-path`: path to the file to be uploaded 
  - required
- `file-name`: name of file to be uploaded 
  - defaults to the name of the provided file
- `file-type`: type of file to be uploaded 
  - defaults to the type of the provided file
- `title`: title of the message posted to slack 
  - defaults to `New Slack Upload from Github Action`

## Example 

```yaml
jobs:
  build:
    name: Upload to Slack
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - run: echo "Test file " > test.txt
      - name: Upload to slack step
        uses: smart-trainer/slack-upload@v1
        with:
          token: ${{ secrets.SLACK_UPLOAD_TOKEN }}
          channel: random
          file-path: test.txt
```