const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {
    const token = core.getInput('repo-token', { required: true });
    const octokit = new github.GitHub(token);

    const name = core.getInput('name', { required: true });
    const path = core.getInput('path', { required: true });
    const contentType = core.getInput('content-type', { required: true });

    core.info(`Uploading ${path} to ${name}. Content-Type: ${contentType}`);

    const url = `https://uploads.github.com/repos/Shopify/upload-to-release/releases/1.0.0/assets{?name}`
    const headers = {
        'content-type': contentType,
        'content-length': fs.statSync(path).size,
    }
    const file = fs.createReadStream(path)

    const upload = await octokit.repos.uploadReleaseAsset({url, headers, name, file})
    core.info(upload)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
