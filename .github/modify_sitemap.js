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
  const locPattern = new RegExp(`https://${newDomain}\/[^\/]+\/locations`, "i"); // Matches URLs with an extra segment before /locations
  const locDirectPattern = new RegExp(`https://${newDomain}\/locations\/`, "i"); // Matches URLs directly starting with /locations

  let filteredContent = newContent.replace(urlBlockPattern, (match) => {
    if (/https:\/\/deriv\.com(\/[a-z-]{2,5})?\/eu(\/)?/.test(match)) {
      return "";
    }
    // Check if the <loc> tag itself contains an extra segment and should be removed
    if (locPattern.test(match) && !locDirectPattern.test(match)) {
      return ""; // Remove entire <url> block if <loc> contains an unwanted segment
    }
    const cleanedMatch = match.replace(xhtmlLinkPattern, (xhtmlLink) => {
      if (locPattern.test(xhtmlLink) && !locDirectPattern.test(xhtmlLink)) {
        return ""; // Remove <xhtml:link> element with extra segment before /locations
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
