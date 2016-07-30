---
title: Creating a dynamic view with ejs
description: Learn how to pass data from a router to a view with ejs.
date: 2016-03-19
layout: topic.html
order: 120
---

Building [static pages](/v1/guides/creating-a-static-home-page.html) is great, but sometimes we need to feed dynamic content into our templates. Because Perk is built on top of Express, it supports all the templating engines and ships with [ejs](http://www.embeddedjs.com/). In this guide we'll cover how to pass data from a route to an ejs template.

### Passing data from your route

Imagine we have a `/blog` route and we would like to pass an array of blog posts to our blog home page template. Here's what our route may look like:

```js
let router = require('express').Router();

/* GET blog home page. */
router.get('/', function(req, res, next) {
	res.render('blog/index');
});

module.exports = router;
```

If this looks unfamiliar, you might want to check out the guide on [creating new pages and routes](/v1/guides/creating-new-pages-and-routes.html).

We're going to add a few lines of code to pass an array of blog posts to the blog home page.

```js
let router = require('express').Router();

/* GET blog home page. */
router.get('/', function(req, res, next) {
	let blogPosts = [
		{
			title: 'Perk is for real!',
			body: '...',
			author: 'Aaron Larner',
			publishedAt: new Date('2016-03-19'),
			createdAt: new Date('2016-03-19')
		},
		{
			title: 'Development continues...',
			body: '...',
			author: 'Aaron Larner',
			publishedAt: new Date('2016-03-18'),
			createdAt: new Date('2016-03-18')
		},
		{
			title: 'Welcome to Perk!',
			body: '...',
			author: 'Aaron Larner',
			publishedAt: new Date('2016-03-17'),
			createdAt: new Date('2016-03-17')
		}
	]
	res.render('blog/index', { posts: blogPosts });
});

module.exports = router;
```

Notice we've created an array of posts and assigned it to the variable `blogPosts`. Additionally, we are now passing a second argument to our `res.render` method. The second argument is an object that stores all of the information we wish to pass to the view. You can imagine that instead of being hard-coded in our route, the array of posts could have been fetched from our database.

### Rendering data in your view

Now we need to actually use that data and display it within our view. Inside of the view that's getting loaded (`/views/blog/index.html`) we're going to iterate over the array of posts, and render them within the HTML:

```html
<!DOCTYPE html>
<html>
<head>
	<title>Welcome to my blog</title>
</head>
<body>
	<h1>Recent Blog Posts</h1>
	<% for(var i = 0; i < posts.length; i++) { %>
		<article>
			<h2><%= posts[i].title %></h1>
			<p><%= posts[i].body %></p>
		</article>
	<% } %>
</body>
</html>
```

We are using special *ejs* tags above to inject the dymanic content. *ejs* templates support the following tags:

<hr>
`<% ... %>` - anything inside of this tag will be evaluated as JavaScript code.

```js
<% var message = 'ejs is <strong>cool</strong>'; %>
```
<hr>
`<%= ... %>` - anything inside of this tag will be evaluated as JavaScript code and escaped before being inserted into the page.

```html
<h1><%= message %></h1>
```
will render
```html
<h1>ejs is &lt;strong&gt;cool&lt;/strong&gt;</h1>
```
<hr>
`<%- ... %>` - anything inside of this tag will be evaluated as JavaScript code and inserted into the page without being escaped.

```html
<span><%= message %></span>
```
will render
```html
<span>ejs is <strong>cool</strong></span>
```

### Next steps...

Learn how to [query and display](/v1/guides/querying-and-displaying-data-with-models.html) data with models.