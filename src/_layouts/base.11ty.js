// Import lit-html-server to render templates
const { html, renderToString } = require("@popeindustries/lit-html-server");

// Import path for building pageFullUrl
const urlJoin = require("url-join");

// Export class for layout rendering
module.exports = class {
  // Set layout data defaults
  async data() {
    return {
      description:
        "Jordan Thornquest maps his mindstate with theatrical relish & a form of punk-informed power pop that's both candidly introspective and fearlessly extroverted.",
      eleventyComputed: {
        pageFullUrl: (data) => urlJoin(data.head.siteUrl, data.page.url),
        socialImage: (data) => data.head.socialImage,
      },
      ogType: "website",
    };
  }

  // Check current page url for page title
  async titleBuilder(url, title) {
    if (url == "/") {
      return "It's Jordan Thornquest!";
    } else {
      return `${title} | Jordan Thornquest`;
    }
  }

  // Render the page
  async render({
    assets,
    content,
    description,
    ogType,
    page,
    pageFullUrl,
    socialImage,
    title,
  }) {
    // Get page url
    const pagePath = page.url;

    // Get CSS hash
    const hashString = assets.hashString;

    // Get page title
    const pageTitle = await this.titleBuilder(pagePath, title);

    // Lit-HTML output
    const layoutTemplate = html`
      <!DOCTYPE html>
      <html class="text-gray-900 dark:text-gray-50" lang="en">
        <head>
          <!-- Start with these -->
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <!-- The basics -->
          <title>${pageTitle}</title>
          <meta name="description" content="${description}" />
          <link rel="canonical" href="${pageFullUrl}" />

          <!-- Facebook Open Graph -->
          <meta property="og:title" content="${pageTitle}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:url" content="${pageFullUrl}" />
          <meta property="og:image" content="${socialImage}" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="${ogType}" />

          <!-- Twitter Open Graph -->
          <meta name="twitter:url" content="${pageFullUrl}" />
          <meta name="twitter:title" content="${pageTitle}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${socialImage}" />
          <meta name="twitter:card" content="summary_large_image" />

          <!-- Icons -->
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/_static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/_static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/_static/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/_static/site.webmanifest" />
          <meta
            name="msapplication-config"
            content="/_static/browserconfig.xml"
          />
          <meta name="theme-color" content="#F75E3C" />

          <!-- RSS -->
          <link
            type="application/atom+xml"
            rel="alternate"
            href="/feed.xml"
            title="Jordan Thornquest"
          />

          <!-- CSS -->
          <link
            href="/_assets/styles/styles.${hashString}.css"
            rel="stylesheet"
          />
        </head>

        <!-- Site content -->
        <body class="bg-gray-50 dark:bg-gray-900">
          ${content}

          <script
            async="async"
            defer="defer"
            src="/_assets/javascript/scripts.${hashString}.js"
          ></script>
        </body>
      </html>
    `;

    // Render Lit-HTML content to string
    const renderedLayout = await renderToString(layoutTemplate);

    // Return rendered layout
    return renderedLayout;
  }
};
