/**
 * Github dependencies
 */
const core = require("@actions/core");
const github = require("@actions/github");

/**
 * Custom dependencies
 */
const WordPressPlugin = require("./classes/wordpress-plugin");
const issueAlreadyExists = require("./helpers/github-issue-exists");
const getRandomAssignee = require("./helpers/get-random-assignee");
const getSupportTemplate = require("./templates/create-new-support");

/**
 * External dependencies
 */
const { isEmpty } = require("lodash");

/**
 * Main action.
 */
async function main() {
  try {
    const token = core.getInput("github-token"); // github token.
    const pluginSlug = core.getInput("plugin-slug");
    const possibleAssignees = core.getInput("random-assignees");

    const repo = github.context.repo;
    const owner = "CakeWP"; // TODO: currently hardcoded.
    const octokit = github.getOctokit(token);

    const plugin = new WordPressPlugin(pluginSlug);
    const unresolvedSupports = await plugin.getUnresolvedPluginSupport();

    if (isEmpty(unresolvedSupports)) {
      core.setOutput(
        "status",
        "👏 No unresolved support found on the Wordpress Repository."
      );

      return true;
    }

    // Creating a new issue for each unresolved support.
    for (const support of unresolvedSupports) {
      const issueTitle = "WordPress Suppport: " + support.title;
      const issueExists = await issueAlreadyExists(issueTitle);

      if (issueExists) {
        continue;
      }

      const supportDetails = await plugin.getSupportDetails(
        support.supportLink
      );

      // Creating a new issue.
      const createdIssue = await octokit.rest.issues.create({
        owner,
        title: issueTitle,
        labels: ["wordpress-support", "needs-testing"],
        repo,
        assignee: getRandomAssignee(possibleAssignees),
        body: getSupportTemplate(support, supportDetails),
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
