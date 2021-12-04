/**
 * Will provide a ready-made template for creating a new support issue.
 *
 * @param support - Support details.
 */
module.exports = function createNewSupport(support, details, pluginSlug) {
  return `
  ## Support
  ${details}
  ## Details
  - **Support Author**: ${support.createdBy}
  - **Support Link**: ${support.supportLink}
  - **Support Created At**: ${support.createdAt}
  - **Spinup Sandbox Site: https://tastewp.com/new/?pre-installed-plugin-slug=${pluginSlug} 
  
  **Note:** This support issue is created automatically via GitHub action.`;
};
