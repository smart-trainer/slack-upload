import * as core from '@actions/core';
import * as fs from 'fs';
import * as slack from '@slack/web-api';

export async function upload(
  slackToken: string,
  channels: string,
  filePath: string,
  fileName: string,
  fileType: string,
  title: string
): Promise<String> {
  try {
    const client = new slack.WebClient(slackToken, {
      logLevel: slack.LogLevel.DEBUG
    });

    const file = fs.readFileSync(filePath);
    const result = await client.files.upload({
      channels: channels,
      file: file,
      filename: fileName,
      filetype: fileType,
      title: title
    });

    if (result.ok == false) {
      core.setFailed(result.error ?? 'unknown error');
      return Promise.resolve(result.error ?? 'unknown error');
    }
    const response = JSON.stringify(result);
    core.setOutput('response', response);

    return Promise.resolve(response);
  } catch (error) {
    core.setFailed(error.message);
    return Promise.resolve(error.message);
  }
}
