const generateCategoryPages = require('../eleventy-plugin-github-repos.js');

console.log('Starting test...');

GithubRepos({
  accountName: 'johnwargo',
  apiKey: 'YOUR_API_KEY',
  quitOnError: true,
  debugMode: false,
});
