import * as path from 'path';
import * as core from '@actions/core';
import * as slack from './slack';

async function run() {
  const token = core.getInput('token') || '';
  const channels = core.getInput('channels') || '';
  const filePath = core.getInput('file-path') || '';

  if (!token || !channels || !filePath) {
    console.log('token: ', token);
    console.log('channels: ', channels);
    console.log('file-path: ', filePath);
    core.setFailed('token, channels and file-path must be specified.');
  }

  var fileName = core.getInput('file-name') || path.parse(filePath).name;
  var fileType = core.getInput('file-type') || path.parse(filePath).ext;
  const title = core.getInput('title') || 'New Slack Upload from Github Action';

  slack.upload(token, channels, filePath, fileName, fileType, title);
}

run();
