import nock = require('nock');
import path = require('path');

import * as slack from '../src/slack';

describe('slack tests', () => {
  beforeEach(() => {
    nock('https://slack.com', {allowUnmocked: true})
      .post('/api/files.upload')
      .reply(200, '{status: ok}');
  });

  afterEach(async () => {
    nock.cleanAll();
    nock.enableNetConnect();
  }, 100000);

  it('Upload file', async () => {
    const filePath = path.resolve(__dirname, './test.txt');
    const result = await slack.upload(
      'token',
      'channel',
      filePath,
      'file',
      'txt',
      'message'
    );

    expect(result).toContain('status: ok');
  }, 300000);
});
