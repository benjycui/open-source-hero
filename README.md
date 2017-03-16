# open-source-hero

A CLI tool to get how many repositories a user had contributed to.

## Usage

Install:

```bash
npm i -g open-source-hero
```

Check user who you are interested in:

```bash
open-source-hero benjycui
```

## Known Issues

* It cannot list all the repositories that a user had contributed to, for we can only get 1,000 commits from GitHub.
* If someone just `git clone` and `git push` a repository, instead of forking. `open-source-hero` cannot tell which is fork from which, so it just list both of them.

## License

GPL-3.0
