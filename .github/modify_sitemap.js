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
// Read the input file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Define the pattern to match the URLs
  const pattern = /https:\/\/([^.]*\.)?deriv\.(com|be|me)/g;
  const newContent = data.replace(pattern, `https://${newDomain}`);

  // Define the pattern to filter out unwanted URLs
  const unwantedPattern = /deriv\.com(\/eu\b|\/[a-z-]{2,5}\/eu\b)/g;

  // Check if there are unwanted URLs in the original content
  if (unwantedPattern.test(data)) {
    console.log("The file contains unwanted URLs. No changes were made.");
    return;
  }

  // Write the modified content to the input file
  fs.writeFile(inputFile, newContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("URLs have been replaced successfully.");
  });
});
