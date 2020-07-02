const core = require("@actions/core");
const github = require("@actions/github");
const { exec } = require("@actions/exec");

async function run() {
  try {
    const actor = core.getInput("actor");
    const token = core.getInput("token");
    const context = github.context;
    const { owner, repo } = context.repo;
    core.debug(`${actor}:${token}@github.com/${owner}/${repo}.git`)
    // Configure git
    await exec("git", [
      "remote",
      "add",
      "github",
      `${actor}:${token}@github.com/${owner}/${repo}.git`,
    ]);
    await exec("git", ["config", "user.name", '"Osome Bot"']);
    await exec("git", ["config", "user.email", '"heuels@osome.com"']);

    // Bump minor version and capture it
    let version = "";
    await exec("npm", ["version", "minor", "--no-git-tag-version"], {
      listeners: { stdout: (data) => version += data.toString() },
    });

    core.debug(version);

    // Create a commit and push it
    await exec("git", ["add", "package.json"]);
    await exec("git", ["commit", "-m", `"v1.2.3"`]);
    await exec("git", ["push", "github", `HEAD:${context.ref}`]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
