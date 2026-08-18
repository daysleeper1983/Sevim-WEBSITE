const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true, breaks: false, linkify: true });

module.exports = function (eleventyConfig) {
  // Static passthrough
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ admin: "admin" });
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Render an i18n text field (markdown or plain) to safe HTML
  eleventyConfig.addFilter("markdown", (value) => {
    if (!value) return "";
    return md.render(String(value));
  });

  eleventyConfig.addFilter("markdownInline", (value) => {
    if (!value) return "";
    return md.renderInline(String(value));
  });

  // Locale-aware date formatting: {{ post.data.date | localeDate: "tr" }}
  eleventyConfig.addFilter("localeDate", (dateValue, locale) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (isNaN(d)) return "";
    const loc = locale === "en" ? "en-GB" : "tr-TR";
    return d.toLocaleDateString(loc, { year: "numeric", month: "long", day: "numeric" });
  });

  // Sort a collection array (of Eleventy items) newest date first
  eleventyConfig.addFilter("sortByDateDesc", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return [...arr].sort((a, b) => {
      const ad = new Date(a.data.date || 0).getTime();
      const bd = new Date(b.data.date || 0).getTime();
      return bd - ad;
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, n);
  });

  eleventyConfig.addFilter("featuredOnly", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return arr.filter((item) => item.data && item.data.featured);
  });

  eleventyConfig.addFilter("byCategory", (arr, cat) => {
    if (!Array.isArray(arr)) return arr;
    if (!cat || cat === "all") return arr;
    return arr.filter((item) => item.data && item.data.category === cat);
  });

  // Merge the journal and events collections into one reverse-chronological
  // newsfeed, so the homepage can show both blog posts and event updates
  // together. Each item gets a feedType ("journal" | "event") and a
  // feedDate used for sorting, since the two content types keep their date
  // in differently-named fields (date vs event_date).
  eleventyConfig.addFilter("mergeFeed", (journalArr, eventsArr) => {
    const journalItems = (Array.isArray(journalArr) ? journalArr : []).map((item) => ({
      ...item,
      feedType: "journal",
      feedDate: item.data.date,
    }));
    const eventItems = (Array.isArray(eventsArr) ? eventsArr : []).map((item) => ({
      ...item,
      feedType: "event",
      feedDate: item.data.event_date,
    }));
    return [...journalItems, ...eventItems].sort((a, b) => {
      const ad = new Date(a.feedDate || 0).getTime();
      const bd = new Date(b.feedDate || 0).getTime();
      return bd - ad;
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
