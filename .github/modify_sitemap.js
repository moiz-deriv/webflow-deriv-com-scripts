const fs = require("fs");
const yargs = require("yargs");

// Define the input and output file
const argv = yargs
  .option("new-domain", {
    alias: "n",
    description: "The new domain to replace in the sitemap",
    type: "string",
    demandOption: true,
  })
  .option("input-file", {
    alias: "i",
    description: "The input sitemap file",
    type: "string",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv;

// Get the new domain and input file from command-line arguments
const newDomain = argv["new-domain"];
const inputFile = argv["input-file"];
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const pattern = /https:\/\/([^.]*\.)?deriv\.(com|be|me)/g;
  const newContent = data.replace(pattern, `https://${newDomain}`);

  const urlBlockPattern = /(<url>[\s\S]*?<\/url>)/g;
  const xhtmlLinkPattern =
    /(<xhtml:link[^>]*?href="https:\/\/[^\/]+\/[^\/]+\/locations[^"]*"[^>]*?>)/g;
  const linkPattern =
    /(<xhtml:link[^>]*?href="https:\/\/[^\/]+\/[^\/]+[^"]*"[^>]*?>)/g;
  const locPattern = new RegExp(`https://${newDomain}\/[^\/]+\/locations`, "i"); // Matches URLs with an extra segment before /locations
  const locDirectPattern = new RegExp(`https://${newDomain}\/locations\/`, "i"); // Matches URLs directly starting with /locations

  const staticDocUrls = [
    "/sw/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/bn/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/ko/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/pl/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/tr/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/it/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/bn/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/fr/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/th/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/zh-cn/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/si/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/fr/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/fr/blog/posts/trading-with-crypto-top-3-myths",
    "/blog/posts/eu-retail-sales-germany-inflation-rate",
    "/blog/posts/eur-usd-holds-strong-before-ecb-meeting",
    "/vi/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/tr/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/zh-cn/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/sw/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/fr/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/es/blog/posts/what-are-accumulator-options-a-beginners-guide-to-compounding-growth",
    "/vi/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/zh-tw/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/tr/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/it/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/si/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/zh-cn/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/pt/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/th/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/ar/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/pt/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/de/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/zh-tw/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/pl/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/pt/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/ru/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/pl/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/it/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/es/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/es/blog/posts/trading-with-crypto-top-3-myths",
    "/si/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/es/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/ar/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/ru/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/signup",
    "/ar/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/ko/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/bn/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/sw/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/es/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/ru/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/de/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "/th/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/de/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "/zh-tw/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/ko/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "/vi/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
  ];

  let filteredContent = newContent.replace(urlBlockPattern, (match) => {
    if (/https:\/\/deriv\.com(\/[a-z-]{2,5})?\/eu(\/)?/.test(match)) {
      return "";
    }
    // Check if the <loc> tag itself contains an extra segment and should be removed
    if (locPattern.test(match) && !locDirectPattern.test(match)) {
      return ""; // Remove entire <url> block if <loc> contains an unwanted segment
    }
    match.replace(linkPattern, (link) => {
      const containsExcludedUrl = staticDocUrls.some((url) =>
        link.includes(url)
      );
      if (containsExcludedUrl) {
        return "";
      }
    });
    const cleanedMatch = match.replace(xhtmlLinkPattern, (xhtmlLink) => {
      if (locPattern.test(xhtmlLink) && !locDirectPattern.test(xhtmlLink)) {
        return ""; // Remove <xhtml:link> element with extra segment before /locations
      }
      console.log("Checking link", xhtmlLink);
      if (staticDocUrls.includes(xhtmlLink)) {
        return "";
      }
      return xhtmlLink; // Keep valid <xhtml:link> elements
    });
    return cleanedMatch;
  });

  fs.writeFile(inputFile, filteredContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("URLs have been replaced successfully.");
  });
});
