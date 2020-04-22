# Web Input Readline Hotkeys Extension

Chrome and Firefox extension to enable [readline](https://tiswww.case.edu/php/chet/readline/rltop.html) / emacs style keyboard shortcuts across the web. You can use these in the following places

- `<input>` elements
- `HTMLElement`s that have attribute `contenteditable` set to `true`

This covers the majority of cases - it works on Slack, Discord, Youtube

## Contributing

We use the [`pnpm`](https://pnpm.js.org) package manager. Extensions are created separately for both Chrome and Firefox

```sh
pnpm i

# build (to be loaded as unpacked extension)
pnpm run dev
# output in dist/chrome or dist/firefox

pnpm run package
# creates `dist/chrome.zip` and `dist/firefox.zip`
```
