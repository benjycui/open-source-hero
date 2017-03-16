#!/usr/bin/env node

const username = process.argv[2] || 'benjycui';

const GitHub = require('github');
const github = new GitHub();

async function getAllCommits(user) {
  let commits = [];
  let res = await github.search.commits({
    q: `author:${user} merge:false`,
    sort: 'author-date',
    'per_page': 100,
  });
  commits = commits.concat(res.data.items);

  while(github.hasNextPage(res)) {
    res = await github.getNextPage(res);
    commits = commits.concat(res.data.items);
  }

  return commits;
}

async function getAllReposContributed(user) {
  const commits = await getAllCommits(user);
  const repos = commits.map(({ repository }) => repository)
          .filter(repo => !repo.fork)
          .map(({ full_name }) => full_name)
  const unique = {};
  repos.forEach(r => unique[r] = true);
  return Object.keys(unique);
}

console.log('In progress...');
getAllReposContributed(username)
  .then(repos => {
    console.log(`${username} had contributed to ${repos.length} repositories.`);
    repos.forEach((r, i) => console.log(`${i + 1}. ${r}`));
  })
  .catch(e => console.error(e))
