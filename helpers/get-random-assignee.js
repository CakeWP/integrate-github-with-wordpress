/**
 * Get random assignee from the action yml list.
 *
 * @param {string[]} assignees - List of possible assignees.
 *
 * @return string assignee - A randomly selected assignee.
 */
function getRandomAssignee(assignees) {
  //Removing empty spaces
  assignees = assignees.replace(/\s/g, "");

  const assigneesList = assignees.split(",");

  return assigneesList[Math.floor(Math.random() * assigneesList.length)];
}

module.exports = getRandomAssignee;
