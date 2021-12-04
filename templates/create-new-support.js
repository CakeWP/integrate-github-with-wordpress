/**
 * Will provide a ready-made template for creating a new support issue.
 *
 * @param support - Support details.
 */
module.exports = function createNewSupport(support, details) {
  return `
  ## Support
  ${details}
  ## Details
  - **Support Author**: ${support.createdBy}
  - **Support Link**: ${support.supportLink}
  - **Support Created At**: ${support.createdAt}
  
  **Note:** This support issue is created automatically via GitHub action.`;
};
