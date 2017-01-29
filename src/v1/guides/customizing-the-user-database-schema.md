---
title: Customizing the User Database Schema
description: Learn how to safely rename columns on the user and authentication tables.
date: 2017-01-29
layout: topic.html
order: 700
---

> This guide will explain how to safely rename columns on the user and authentication tables.

Every new Perk app ships with a user authentication system. This means your app supports users registering, logging in and logging out right out of the box. This authentication system is based on two database tables, the users table and the authentications table.

You may not like the way that the columns in those particular tables are named. Luckily Perk gives you the flexibility to rename those columns however you choose.

One common example is developers who prefer to use snake_case for their database column names instead of camelCase. By default, all columns in the users and authentication tables are camelCase. Let's walk through changing them to snake_case. This only requires modifying a few files.

### Step 1: Modify `config/auth.js` to use the new column names. It should look like this when you are done:

```js
module.exports = {
	columns: {
		user: {
			email: 'email',
			firstName: 'first_name',
			lastName: 'last_name'
		},
		authentication: {
			type: 'type',
			identifier: 'identifier',
			password: 'password',
			data: 'data',
			userId: 'user_id'
		}
	},
	// ...
}
```
### Step 2: Modify the create_users and create_authentication database migrations to use snake_case columns.

```js
// 20151009115505_create_users.js
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('created_ad').notNull();
		t.dateTime('updated_at').nullable();
		t.dateTime('deleted_at').nullable();

		t.string('first_name').nullable();
		t.string('last_name').nullable();
		t.string('email').nullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};
```

```js
// migrations/20151009155020_create_authentication.js
exports.up = function(knex, Promise) {
	return knex.schema.createTable('authentication', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('created_at').notNull();
		t.dateTime('updated_at').nullable();

		t.string('type').notNull();
		t.string('identifier').notNull();
		t.string('password').nullable();
		t.json('data').nullable();
		t.integer('user_id')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('authentication');
};

```

### Step 3: Modify the models (`models/User.js` and `models/Authentication.js`) to use the newly names columns.

```js
// User.js
require('./Authentication');
module.exports = bookshelf.model('User', {
	tableName: 'users',
	hasTimestamps: ['created_at', 'updated_at', 'deleted_at'],
	authentication: function() {
		return this.hasMany('Authentication', 'user_id');
	}
});
```

```js
// Authentication.js
require('./User');
module.exports = bookshelf.model('Authentication', {
	tableName: 'authentication',
	hasTimestamps: ['created_at', 'updated_at'],
	user: function() {
		return this.belongsTo('User', 'user_id');
	}
});

```

### Step 4: Run the migration

```
knex migrate:latest
```

You should now be all set to register and log in with your newly names column names.