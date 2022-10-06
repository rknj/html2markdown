# Convert a HTML page to Markdown

Based on [turndown NPM package](https://www.npmjs.com/package/turndown)

## Usage

```yml
name: Convert report
on:
  - pull_request

jobs:
  get-unused-dependencies:
    runs-on: ubuntu-latest
    steps:
      - name: Look for unused librairies
        run: |
          mvn dependency:analyze-report --no-transfer-progress
      - name: Convert HTML to Markdown
        id: html2markdown
        if: always()
        uses: rknj/html2markdown@v0.1.0
        with:
          html-file: "target/dependency-analysis.html"
      - name: Create issue with report
        if: always()
        uses: dacbd/create-issue-action@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          title: Maven dependency reports (unused dependencies)
          body: |
            ${{ steps.html2markdown.outputs.markdown-content }}
          assignees: rknj
```

### Build

Build the typescript and package it for distribution

```
$ npm run all
```

## License

This project is released under the MIT License.
