const core = require("@actions/core");
const github = require("@actions/github");
const { exec } = require("@actions/exec");

const USER_ID = 'briskhome-bot';
const USER_NAME = 'Briskhome Bot';
const USER_EMAIL = 'heuels+briskhome-bot+github.com@gmail.com';

async function run() {
  try {
    const token = core.getInput("token");
    const { ref, repo: { owner, repo } } = github.context;

    // Configure git
    const origin = `https://${USER_ID}:${token}@github.com/${owner}/${repo}.git`;
    await exec("git", ["remote", "set-url", "origin", origin]);
    await exec("git", ["config", "user.name", `"${USER_NAME}"`]);
    await exec("git", ["config", "user.email", `"${USER_EMAIL}"`]);

    // Bump version and push the commit and tag
    await exec("npm", ["version", "minor"]);
    await exec("git", ["push", "origin", `HEAD:${ref}`]);
    await exec("git", ["push", "origin", `HEAD:${ref}`, "--tags"]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
