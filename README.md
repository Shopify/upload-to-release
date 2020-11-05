# Upload to Release GitHub Action

A GitHub Action that uploads a file to a new release.

## Getting Started

```yml
jobs:
  build:
    # ...
    steps:
      - uses: Shopify/upload-to-release@v1
        with:
          name: my-artifact
          path: build/a.out
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          content-type: text/plain # Optional
```

## Shoulders

This was inspired by:

- https://github.com/actions/javascript-template
- https://github.com/JasonEtco/upload-to-release

