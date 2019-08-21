import * as core from '@actions/core';

async function run() {
  try {
    const name = core.getInput('name');
    const path = core.getInput('path');
    core.debug(`Uploading ${path} to ${name}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
