---
title: Flash Messages
description: Perk flash messages API documentation.
date: 2016-02-27
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [req.flash(type, message)](#req-flash-type-message-)
1. [Displaying flash messages](displaying-flash-messages)

## Overview

Flash messages allow you to send non-error messages in between HTTP requests. For example, if you want to redirect to a dashboard page upon successful submission of a form, and want to show a success message on the dashboard page.

<<<<<<< HEAD
## req.flash(type, message)
=======
### req.flash(type, message)
>>>>>>> dc2e9f749b9aff33fbdaf0fb3eb686736b683c0f

Creates a message to be used in the next page view.

### Params

* `type` (string or object): The type of message to be created. For example 'success'.

* `message` (string): The message to send to the next page.

### Return

Returns undefined.

### Examples

```js
req.flash('success', 'The form was submitted successfully');
res.redirect('/dashboard');
```

## Displaying flash messages

Flash messages are passed to subsequent views via a `messages` variable.

```html
<main>
	<% if(messages.success) { %>
		<div class="alert alert-success">
			<%= messages.success %>
		</div>
	<% } %>
	<!-- other code goes here -->
</main>
```