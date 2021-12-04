const axios = require("axios").default;
const { parse } = require("node-html-parser");
const { isEmpty } = require("lodash");
const TurndownService = require("turndown");

/**
 * This class is responsible for fetching all the plugin details.
 */

class WordPressPlugin {
  constructor(pluginSlug) {
    this.pluginSlug = pluginSlug;
  }

  /**
   * Will fetch additional support details from the permalink
   *
   * @param {string} permalink - Support permalink.
   * @return {string} content - Support content.
   */
  async getSupportDetails(permalink) {
    const response = await axios.get(permalink);
    const parser = parse(response.data);
    const service = new TurndownService();

    const issueDescription =
      parser.querySelector(".bbp-topic-content").innerHTML;

    const markdown = service.turndown(issueDescription);

    return markdown;
  }

  /**
   * Will fetch all the unresolved supports of the required plugin.
   *
   * @return {array} - Plugin details.
   */
  async getUnresolvedPluginSupport() {
    const { pluginSlug } = this;

    const supportEndpoint =
      "https://wordpress.org/support/plugin/" + pluginSlug;

    const response = await axios.get(supportEndpoint);
    const parser = parse(response.data);

    let unResolvedtopics = parser.querySelectorAll(".topic.type-topic");

    // Filtering out unresolved topics.
    unResolvedtopics = unResolvedtopics.filter((node) =>
      isEmpty(node.querySelector(".resolved"))
    );

    // Leaving only relevant data.
    unResolvedtopics = unResolvedtopics.map((node) => {
      return {
        title: node.querySelector(".bbp-topic-permalink").innerText,
        createdAt: node.querySelector(".bbp-topic-freshness a").innerText,
        createdBy: node.querySelector(".bbp-author-name").innerText,
        supportLink: node
          .querySelector(".bbp-topic-permalink")
          .getAttribute("href"),
      };
    });

    return unResolvedtopics;
  }
}

module.exports = WordPressPlugin;
