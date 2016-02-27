---
title: "Error: The `libsass` binding was not found"
date: 2016-02-21
layout: error.html
---

This error pops up if the version of libsass that you've installed via npm is out of date compared to your installed version of node.

### To fix

Re-install your node_modules.

1. Remove the entire node_modules directory from your project
1. `npm cache clean`
1. `npm install`

