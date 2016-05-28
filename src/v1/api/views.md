---
title: Views
description: Perk views API documentation.
date: 2016-02-27
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [res.render](#res-render-view-data-)
1. [Dynamic data with ejs](#dynamic-data-with-ejs)
1. [Changing templating engines](#changing-templating-engines)

## Overview

Views provide the back-end with the means to serve up dynamically generated HTML and CSS based on data passed in from a route. All view files live in the `/views` directory and use the ejs templating engine by default (although this [can be changed](#changing-templating-engines)).


## res.render(view[, data])

Renders a view from a route or middleware. Similar to `res.send` or `res.json` but renders a view (HTML) instead of rendering plain text or JSON.

### Params

* `view` (string): The location of the view within the `/views` directory. No `/` or `/views` prefix is needed and the file extension suffix should also be omitted. For example: `index` and `auth/register` are both valid values for this parameter.

* `data` (object): An object whose keys will be translated to variables within the view. See examples below.

### Return

Returns undefined.

### Examples

#### without data
> ##### routes/index.js
> 
> ```js
> router.get('/', function(req, res, next) {
> 	res.render('index');
> });
> ```
> ##### views/index.html
> 
> ```html
> <!DOCTYPE html>
> <html>
> <head>
> 	<title>Home Page</title>
> </head>
> <body>
> 	<h1>This is the home page</h1>
> </body>
> </html>
> ```

#### with data
> ##### routes/index.js
> 
> ```js
> router.get('/', function(req, res, next) {
>	// This data could also come from the database
>	let data = {
>		words: ['one', 'two', 'red', 'blue'],
>		title: 'A dynamic home page'
>	}
> 	res.render('index', data);
> });
> ```
> ##### views/index.html
> 
> ```html
> <!DOCTYPE html>
> <html>
> <head>
> 	<title>Home Page</title>
> </head>
> <body>
> 	<h1><%= title %></h1>
>	<ul>
>	<% words.forEach(function(word) { %>
>		<li><%= word %> fish</li>
>	<% }) %>
> 	</ul>
> </body>
> </html>
> ```

## Dynamic data with ejs

Inside fo your view file you can render passed in data by using any valid JavaScript code or key of the data object inside of one of the following tags:

### <%= _expression_ %>

Evaluates the _expression_ and renders the result on the page. Automatically escapes the expression to prevent injection attacks.

### <% _expression_ %>

Runs the expression but does not display anything to the page. This is useful for boolean logic (if/else) and loops.

### <%- _expression_ %>

Evaluates the _expression_ and renders the result on the page. Does **not** escape the expression. Only use this technique when you trust the data being displayed.

## Changing templating engines

For this example we will be switching from ejs to handlebars, but you can substitute handlebars for any templating enging you wish.

1. Install a [supported](https://github.com/tj/consolidate.js#supported-template-engines) templating engine

	```
	npm install --save handlebars
	```

1. In your `/app.js` find the code below (near line 35). Replace `ejs` with the name of the new templating engine. In this case `handlebars`.

	```js
	app.engine('html', consolidate.ejs);
	```

1. Update the files in your `/views` directory to use handlebars syntax instead of ejs. No need to change the file extensions.