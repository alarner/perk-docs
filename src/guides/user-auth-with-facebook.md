---
title: User authentication with Facebook
date: 2016-02-09
layout: tutorial.html
---

Building your own Facebook login with Perk is super easy. It's a three step process:

1. Get the necessary API keys from Facebook (or whichever other supported third pary service you want).
1. Update your `config/auth.js` file or `config/local.js` file.
1. Create a login button.

### 1. Get API Keys

1. Log in to [Facebook](https://facebook.com).
2. Go to the [Facebook for Developers](https://developers.facebook.com/).
3. Click "Add a New App."
	
	![Add a New App](/assets/images/guides/user-auth-with-facebook/add-a-new-app.jpg)

4. Click on the small link that says "Basic Setup."

	![Basic Setup](/assets/images/guides/user-auth-with-facebook/basic-setup.jpg)

5. Fill out a Display Name and Category for your app. The rest can be left unchanged. Then click the "Create App ID" button.

	![Create App ID](/assets/images/guides/user-auth-with-facebook/create-app-id.jpg)

6. Click on the "Settings" link on the left and then fill in your app domain (probably localhost for your dev environment) and site url. Click "Save Changes".
	
	![Save](/assets/images/guides/user-auth-with-facebook/save.jpg)

7. Stay on this page, we are going to use the "App Id" and "App Secret."

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

Click on that button! That's all folks.
