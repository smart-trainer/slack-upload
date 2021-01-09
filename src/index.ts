import * as path from 'path';
import * as core from '@actions/core';
import * as slack from './slack';

async function run() {
  const token = core.getInput('token') || '';
  const channels = core.getInput('channels') || '';
  const filePath = core.getInput('file-path') || '';
  var fileName = core.getInput('file-name') || '';
  var fileType = core.getInput('file-type') || '';
  const title = core.getInput('title') || 'New Slack Upload from Github Action';

  if (!token || !channels || !filePath) {
    console.log('token: ', token);
    console.log('channels: ', channels);
    console.log('file-path: ', filePath);
    core.setFailed('token, channels and file-path must be specified.');
  }

  if (!fileName) {
    fileName = path.parse(filePath).name;
  }

  if (!fileType) {
    fileType = path.parse(filePath).ext;
  }

  slack.upload(token, channels, fileName, fileType, filePath, title);
}

run();
