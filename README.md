# Upload to Release GitHub Action

A GitHub Action that uploads a file to a new release.

## Getting Started

```yml
jobs:
  build:
    # ...
    steps:
      - uses: Shopify/upload-to-release
        with:
          name: my-artifact
          path: build/a.out
```

## Shoulders

This was inspired by:

- https://github.com/actions/javascript-template
- https://github.com/JasonEtco/upload-to-release

