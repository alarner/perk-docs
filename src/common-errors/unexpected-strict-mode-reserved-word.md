---
title: Unexpected strict mode reserved word
description: Unexpected strict mode reserved word
date: 2016-02-21
layout: topic.html
order: 200
---

Newer versions of node support ES2015 syntax. This error tends to pop up if you are using an outdated version of node.

You can determine which version of node you are running by typing:

```
node -v
```

```
v5.5.0
```

If your version of node is less than v5.0.0 you should upgrade.

### To fix

```
brew update
brew upgrade node
```
