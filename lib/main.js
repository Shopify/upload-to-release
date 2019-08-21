const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {
    const payload = process.env.GITHUB_EVENT_PATH ? require(process.env.GITHUB_EVENT_PATH) : {}
    const { release: { id: release_id, draft: isDraft }} = payload
    if (isDraft) {
        // Only upload to non-draft releases
        return
    }

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

    const token = core.getInput('repo-token', { required: true });
    const octokit = new github.GitHub(token);

    const name = core.getInput('name', { required: true });
    const path = core.getInput('path', { required: true });
    const contentType = core.getInput('content-type', { required: true });

    console.log(`Uploading ${path} to ${name} on release ${release_id} as Content-Type '${contentType}'`);

    const { data: { upload_url: url } } = await octokit.repos.getRelease({owner, repo, release_id})
    console.log(`Upload URL: ${url}`)

    const headers = {
        'content-type': contentType,
        'content-length': fs.statSync(path).size,
    }
    const file = fs.createReadStream(path)

    // console.log(octokit.users.getAuthenticated())
    const { data: { browser_download_url: browser_download_url }} = await octokit.repos.uploadReleaseAsset({url, headers, name, file})
    console.log(`Download URL: ${browser_download_url}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
