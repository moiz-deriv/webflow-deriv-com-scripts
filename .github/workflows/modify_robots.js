const fs = require('fs');
const yargs = require("yargs");


// Function to update Sitemap entry in robots.txt
function updateSitemap(inputFile, newSitemapUrl, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    let newContent;
    if (data.match(/^Sitemap:/m)) {
      newContent = data.replace(/^Sitemap: .*/m, `Sitemap: ${newSitemapUrl}`);
    } else {
      newContent = data + `\nSitemap: ${newSitemapUrl}`;
    }

    fs.writeFile(outputFile, newContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('Sitemap entry has been updated in', outputFile);
    });
  });
}

// Main function to execute the script
function main() {
  const argv = yargs
  .option("sitemap-url", {
    alias: "s",
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
  if (process.argv.length !== 4) {
    console.error('Usage: node update_robots.js <input_file> <new_sitemap_url>');
    process.exit(1);
  }

  const inputFile = process.argv['input-file'];
  const newSitemapUrl = process.argv['sitemap-url'];

  updateSitemap(inputFile, newSitemapUrl, inputFile);
}

main();