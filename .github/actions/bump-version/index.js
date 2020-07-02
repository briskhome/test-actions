const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('@actions/exec');

async function run() {
  try {
    const actor = core.getInput('actor');
    const token = core.getInput('token');
    const context = github.context;

    // Configure git
    await exec('git', ['remote', 'add', 'github', `"${actor}:${token}@github.com/${context.repository}.git"`]);
    await exec('git', ['config', 'user.name', '"Osome Bot"']);
    await exec('git', ['config', 'user.email', '"heuels@osome.com"']);

    // Bump minor version
    await exec('npm', ['version', 'minor', '--no-git-tag-version']);
    const version = require('package.json').version;

    // Create a commit and push it
    await exec('git', ['add', 'package.json']);
    await exec('git', ['commit', `v${version}`]);
    await exec('git', ['push', 'github', `HEAD:${context.ref}`]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
