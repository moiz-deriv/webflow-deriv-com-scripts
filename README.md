# Webflow Custom Scripts Management

This repository manages custom scripts for Webflow's header and footer. Instead of directly injecting the code into Webflow, you will create a pull request (PR) to this repository. Upon merging the PR, the scripts will be published to NPM, allowing you to update the version in Webflow headers and footers as needed.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)

## Getting Started

To get started with this project, you need to have Node.js and npm installed on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/deriv-com/webflow-custom-scripts.git
    cd webflow-custom-scripts
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

### Adding Custom Scripts

1. **Create a new directory** for your functionality inside the `src/js` or `src/css` directory.

2. **Add your custom scripts** inside the newly created directory.

3. **Import your scripts** into the barrel file (`js/index.js` or `css/index.css`):

    ```js
    // src/js/index.js
    import YourFunction from './your-new-directory/custom-script.js';
    ```

    ```css
    /* src/css/index.css */
    @import './your-new-directory/custom-style.css';
    ```
4. **Export your scripts (JS Only)** in the barrel file (`js/index.js`):

    ```js
    // src/js/index.js
    export {
        ...,
        YourFunction
        ...,
    } ;
    ```


### Publishing to NPM

After your PR is reviewed and merged, the new version will be generated automatically and then it will published to NPM.

### Updating Webflow

1. **Update the version** of the custom scripts in Webflow's header and footer settings.

    ```html
    <script src="https://cdn.jsdelivr.net/npm/your-package-name@version/dist/js/custom1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/your-package-name@version/dist/css/custom1.min.css">
    ```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Create a new branch.
2. Make your changes.
3. Commit your changes.
4. Push to the branch.
5. Create a new Pull Request on GitHub.

## Versioning

This project uses [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/yourusername/webflow-custom-scripts/tags).

