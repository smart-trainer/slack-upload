import * as core from '@actions/core';
import * as upload from './upload';
import * as path from 'path';

async function run() {
  const token = core.getInput('token') || '';
  const channels = core.getInput('channels') || '';
  const filePath = core.getInput('file-path') || '';
  var fileName = core.getInput('file-name') || '';
  var fileType = core.getInput('file-type') || '';
  const title = core.getInput('title') || 'New Slack Upload from Github Action';

  if (!token || !channels || !filePath) {
    core.setFailed('token and/or file-path must be specified.');
  }

  if (!fileName) {
    fileName = path.parse(filePath).name;
  }

  if (!fileType) {
    fileType = path.parse(filePath).ext;
  }

  upload.upload(token, channels, fileName, fileType, filePath, title);
}

run();
