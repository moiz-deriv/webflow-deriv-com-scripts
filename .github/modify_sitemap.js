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
    "https://deriv.com/sw/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/bn/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/ko/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/pl/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/tr/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/it/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/bn/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/fr/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/th/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/zh-cn/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/si/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/fr/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/fr/blog/posts/trading-with-crypto-top-3-myths",
    "https://deriv.com/blog/posts/eu-retail-sales-germany-inflation-rate",
    "https://deriv.com/blog/posts/eur-usd-holds-strong-before-ecb-meeting",
    "https://deriv.com/vi/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/tr/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/zh-cn/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/sw/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/fr/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/es/blog/posts/what-are-accumulator-options-a-beginners-guide-to-compounding-growth",
    "https://deriv.com/vi/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/zh-tw/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/tr/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/it/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/si/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/zh-cn/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/pt/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/th/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/ar/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/pt/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/de/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/zh-tw/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/pl/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/pt/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/ru/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/pl/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/it/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/es/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/es/blog/posts/trading-with-crypto-top-3-myths",
    "https://deriv.com/si/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/es/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/ar/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/ru/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/signup",
    "https://deriv.com/ar/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/ko/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/bn/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/sw/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/es/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/ru/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/de/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
    "https://deriv.com/th/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/de/blog/posts/the-truth-is-out-5-copy-trading-myths-debunked",
    "https://deriv.com/zh-tw/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/ko/blog/posts/what-are-interest-rates-and-why-do-they-matter-in-trading",
    "https://deriv.com/vi/blog/posts/why-beginners-need-to-have-an-online-trading-demo-account",
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
