/**
 * This helper will test if the github issue exists
 *
 * @param {Octokit} octokit
 * @param {string} query
 * @param {string} owner
 * @param {string} repo
 */
async function issueAlreadyExists(octokit, query, owner, repo) {
  try {
    const result = await octokit.rest.search.issuesAndPullRequests({
      q: `repo:${owner}/${repo}+is:issue+` + query.replace(/\s/g, "+"),
    });

    return result.data.total_count !== 0 ? true : false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

module.exports = issueAlreadyExists;
