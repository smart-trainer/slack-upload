import * as core from '@actions/core';
import * as slack from '@slack/web-api';
import * as fs from 'fs';

export const slackUrl = 'https://slack.com/api/files.upload';

export async function upload(
  slackToken: string,
  channels: string,
  fileName: string,
  fileType: string,
  filePath: string,
  title: string
) {
  try {
    const client = new slack.WebClient(slackToken, {slackApiUrl: slackUrl});

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
