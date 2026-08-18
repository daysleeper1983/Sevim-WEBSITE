// Exposes site-wide metadata (currently just the canonical site URL) as
// Eleventy global data `meta`, used by base.njk for canonical/hreflang tags.
// Keep this in sync with site_url in admin/config.yml.
module.exports = function () {
  return {
      site_url: "https://sevimelmas.com.tr",
        };
        };
        
