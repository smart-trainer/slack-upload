import * as core from '@actions/core';
import * as fs from 'fs';

import {WebClient, LogLevel} from '@slack/web-api';

export async function upload(
  slackToken: string,
  channels: string,
  fileName: string,
  fileType: string,
  filePath: string,
  title: string
) {
  try {
    const client = new WebClient(slackToken, {logLevel: LogLevel.DEBUG});

    const result = await client.files.upload({
      channels: channels,
      file: fs.readFileSync(filePath),
      filename: fileName,
      filetype: fileType,
      title: title
    });
    if (result.ok == false) {
      core.setFailed(result.error ?? 'unknown error');
      return;
    }
    core.setOutput('response', JSON.stringify(result));
  } catch (error) {
    core.setFailed(error.message);
  }
}
