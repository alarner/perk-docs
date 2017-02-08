---
title: User authentication with Facebook
description: Learn how to integrate Facebook login into your Perk app.
date: 2016-02-09
layout: topic.html
order: 300
---

Building your own Facebook login with Perk is super easy. It's a four step process:

1. Get the necessary API keys from Facebook (or whichever other supported third party service you want).
1. Update your `config/auth.js` file or `config/local.js` file.
1. Create a login button.
1. Deploy to Production

### 1. Get API Keys

1. Log in to [Facebook](https://facebook.com).
2. Go to the [Facebook for Developers](https://developers.facebook.com/).
3. Click _Add a New App._

	![Add a New App](/assets/images/guides/user-auth-with-facebook/add-a-new-app.jpg)

4. Click on the small link that says "Basic Setup."

	![Basic Setup](/assets/images/guides/user-auth-with-facebook/basic-setup.jpg)

5. Fill out a Display Name and Category for your app. The rest can be left unchanged. Then click the "Create App ID" button.

	![Create App ID](/assets/images/guides/user-auth-with-facebook/create-app-id.jpg)

6. Click on the _Settings_ link on the left and then fill in your app domain (probably localhost for your dev environment) and site url. Click _Save Changes_.

	![Save](/assets/images/guides/user-auth-with-facebook/save.jpg)

7. Stay on this page, we are going to use the _App Id_ and _App Secret._

### 2. Update your `config/auth.js`

Open up your `config/auth.js` file in a text editor. In the section that looks like this:

```js
facebook: {
	clientID: '{{ Facebook OAuth2 Client ID }}',
	clientSecret: '{{ Facebook OAuth2 Client Secret }}',
	// https://developers.facebook.com/docs/facebook-login/permissions
	scope: [
		// 'email'
	],
	requireEmail: true
},
```

1. Replace `{{ Facebook OAuth2 Client ID }}` with the *App Id* that you just created.
1. Replace `{{ Facebook OAuth2 Client Secret }}` with the *App Secret* that you just created.
1. Specify any permissions that you want to request from your users and put then in the `scope` section. A full list of possible permissions for Facebook can be found [here](https://developers.facebook.com/docs/facebook-login/permissions).

### 3. Create a login button

The last step is to create the actual login button. You can do this in any of your views. The only important part is that you redirect to `/auth/facebook/login`. For example:

```html
<a href="/auth/facebook/login">Log in with Facebook</a>
```

Click on that button! You should be redirected to Facebook and asked to authorize the app.

### 4. Deploy to Production

Before you launch you app, you'll need to set up a few more configuration settings on the Facebook side. Go to [developers.facebook.com](https://developers.facebook.com) and select your app.

1. Click on _Settings_ on the left
1. Select the _Advanced_ tab at the top
1. Specify an _Update Notification Email_
1. Specify _Valid OAuth redirect URIs_
	* This will be something like _yourdomain.com_/auth/facebook/callback
1. Click _Save Changes_ at the bottom of the page.

![Deploy 1](/assets/images/guides/user-auth-with-facebook/deploy1.jpg)

Finally click on the _App Review_ tab and toggle on the button next to the text _Do you want to make this app and all its live features available to the general public?_

![Deploy 2](/assets/images/guides/user-auth-with-facebook/deploy1.jpg)


