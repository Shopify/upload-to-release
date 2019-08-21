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

    console.log(`Uploading ${path} to ${name}. Content-Type: ${contentType}`);

    const { data: { upload_url: url } } = await octokit.repos.getLatestRelease({owner: "Shopify", repo: "upload-to-release"})
    console.log(`Upload URL: ${url}`)

    const headers = {
        'content-type': contentType,
        'content-length': fs.statSync(path).size,
    }
    const file = fs.createReadStream(path)

    // console.log(octokit.users.getAuthenticated())
    const upload = await octokit.repos.uploadReleaseAsset({url, headers, name, file})
    console.log(upload)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
