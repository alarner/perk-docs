---
title: Creating a static home page
description: Create a basic static HTML page
date: 2016-02-09
layout: topic.html
order: 100
---

When you first create a Perk project you will be set up with a few basic pages, one of which is the basic Express home page. This guide will walk you through modifying that file.

![Basic Express Homepage](/assets/images/guides/creating-a-static-home-page/basic-express.png)

HTML files in Express (and by association Perk) are stored in the `/views` directory. When a page is requested by the client the flow looks like:

`client request` > `route` > `view`

To modify our homepage we're going to open up `/views/index.ejs`. By default Perk views use the *ejs* templating engine, however just like any express app, you can use [whichever templating engine you like](http://expressjs.com/en/guide/using-template-engines.html). You can learn more about creating dynamic views with ejs by reading [the guide](/v1/guides/creating-a-dynamic-view-with-ejs.html).

By default `/views/index.ejs` looks like this:

```html
<!DOCTYPE html>
<html>
	<head>
		<title><%= title %></title>
		<link rel="stylesheet" href="<%= env === 'development' ? '/styles/main.scss.css' : '/styles/main.scss.min.css?'+version %>" />

	</head>
	<body>
		<h1><%= title %></h1>
		<p>Welcome to <%= title %></p>
		<script type="text/javascript" src="<%= env === 'development' ? '/scripts/bundle.js' : '/scripts/bundle.min.js?'+version %>"></script>
	</body>
</html>
```

To modify our home page we can simply modify the html in this file. For example, you could change the contents of the body element:

```html
<body>
	<h1>Welcome to my Perk Homepage</h1>
	<h2>Perk is an exceptionally well documented set of tools for building node web applications.</h2>
	<p>The goal of Perk is first and foremost to provide a well documented set of tools for building node web applications. Perk also aims to get you up and running quickly, while still providing you the flexibility to build production ready node apps. With these goals in mind, Perk is built on top of Passport, Express, Redis, and Knex and doesn't try to hide it. This provides node newbies with a sane set of default tools while still giving more seasoned developers the opportunity to switch out a library here or there if they choose.</p>
</body>
```

Save the file and then load up the home page in your browser to see the new content.