---
title: Database
description: Perk database API documentation.
date: 2016-02-15
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [Migrations](#migrations)
	* [Creating new migrations](#creating-new-migrations)
	* [Creating tables](#creating-tables)
	* [Adding foreign keys](#adding-foreign-keys)
	* [Adding columns](#adding-columns)
	* [Renaming columns](#renaming-columns)
	* [Modifying column types](#modifying-column-types)
	* [Migration methods](#migration-methods)
	* [Running migrations](#running-migrations)
	* [Rolling back](#rolling-back)
1. [Models](#models)
	* [Defining models](#defining-models)
	* [Saving models](#saving-models)
	* [Fetching a single model](#fetching-a-single-model)
	* [Fetching a list of model](#fetching-a-list-of-models)
1. [Associations]()
	* [One to one]()
	* [One to many]()
	* [Many to many]()
1. [Seed data]()
1. [Configuration]()

## Overview

Perk uses [knex](http://knexjs.org/) as a query builder. Knex allows you to easily write database queries that are compatible with multiple relational database management systeams including PostgresSQL, MySQL, MariaDB among others. The documentation below outlines how to use knex to create database tables and track changes to those tables. Additionally, it covers how to fetch and save data to those tables. If you haven't already, the knex command line tool is very useful working with your database. To Install:

```
npm install -g knex
```

## Migrations

Because the structure of our database is not automatically tracked via git, developers have come up with concept of migrations to track changes to your database schema. Migrations are simply files that describe how to transition your database schema from one version of the database to another.

### Creating new migrations

To create a new migration using knex, simply run:

`knex migrate:make my_migration_name`

This will create a timestamped file name in your migrations directory. The locations of this directory is [configurable](/api/config.html#migrations-directory), but defaults to the `migrations` directory in the root of your project.

### Creating tables

Migrations allow you to manipulate your database schema in many ways. The most common is creating new database tables. To do that you can use the knex [createTable](http://knexjs.org/#Schema-createTable) method. See the example below:

```js
exports.up = function(knex, Promise) {
	// Create the table in the exports.up function
	return knex.schema.createTable('users', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('firstName').nullable();
		t.string('lastName').nullable();
		t.string('email').nullable();
	});
};

exports.down = function(knex, Promise) {
	// Drop the table in the exports.down function
	return knex.schema.dropTable('users');
};
```

### Adding foreign keys

Foreign keys are a powerful feature of relational databases that allow columns to reference rows in other tables. For example, a book row in the books table might reference an author row in the authors table.

```js
exports.up = function(knex, Promise) {
	return knex.schema.createTable('authors', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('firstName').nullable();
		t.string('lastName').nullable();
	}).then(function() {
		return knex.schema.createTable('books', function(t) {
			t.increments('id').unsigned().primary();
			t.dateTime('createdAt').notNull();
			t.dateTime('updatedAt').nullable();
			t.dateTime('deletedAt').nullable();

			t.string('title').nullable();
			t.integer('authorId') // authorId is a foreign key to the authors table
				.unsigned()
				.notNull()
				.references('id')
				.inTable('authors')
				.onDelete('CASCADE');
		})
	});
};

exports.down = function(knex, Promise) {
	// Drop the table in the exports.down function
	return knex.schema.dropTable('authors').then(function() {
		return knex.schema.dropTable('books');
	});
};
```

### Adding columns

Sometimes you'd like to add a column to a pre-existing table. To do that you can use the knex [table](http://knexjs.org/#Schema-table) method to reference the table and add the column as you would if you were creating the table for the first time. See the example below:

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.string('city');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.dropColumn('city');
	});
};
```

### Renaming columns

Sometimes you'd like to change the name of a column in a pre-existing table. To do that you can use the knex [table](http://knexjs.org/#Schema-table) method to reference the table and the knex [renameColumn](http://knexjs.org/#Schema-renameColumn) method. See the example below:

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.renameColumn('city', 'town');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.renameColumn('town', 'city');
	});
};
```

### Modifying column types

Unfortunately there is [not an easy way](https://github.com/tgriesser/knex/issues/46) to modify the type of columns. The currently recommended way is to drop the old column and re-create it with the appropriate type. For example:

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.dropColumn('town');
	})
	.then(function() {
		return knex.schema.table('users', function(t) {
			t.text('town');
		});
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.dropColumn('town');
	})
	.then(function() {
		return knex.schema.table('users', function(t) {
			t.string('town');
		});
	});
};
```

### Migration Methods

All of the [knex schema methods](http://knexjs.org/#Schema) are fair game when creating migrations.

### Running migrations

To upgrade to the newest version of your database schema, run:

`knex migrate:latest`

### Rolling back

Roll back to the previous version of your database schema, run:

`knex migrate:rollback`

## Models

Models allow us to more easily interact with database tables via a more abstract interface. Models can be associated with other models in many ways (belongsTo, hasOne, hasMany, belongsToMany, etc). Perk uses [Bookshelf.js](http://bookshelfjs.org/) models, which are always connected to a specific database table.

### Defining models

Bookshelf models should be created in the `/models` directory. Below is an example of a model file:

```js
require('./Book');
module.exports = bookshelf.model('Author', {
	tableName: 'authors',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt']
});
```

At their core, models are simply a way of associating a database table with an abstract class that can be instantied to more easily interact with that database table.

### Saving models

To save a model (ie. insert a new row into a database table) we instantiate that model with some data and call the [save](http://bookshelfjs.org/#Model-instance-save) method. This is often done inside of a route. For example:

```js
let author = new Author({
	name: 'Ernest Hemingway'
});

author
.save()
.then(function(author) {
	console.log('the author has been saved', author.id);
})
.catch(function(error) {
	console.log('something went wrong', error.toString());
});
```

### Fetching a single model

To retreive a single model we can use the [fetch](http://bookshelfjs.org/#Model-instance-fetch) method.

```js
Author.forge({id: 1}).fetch().then(function(author) {
	console.log('The author is', author.get('name'));
});
```

### Fetching a list of models

To retreive a list of models we can use the [fetchAll](http://bookshelfjs.org/#Model-instance-fetchAll) method. You can combine the [where](http://bookshelfjs.org/#Model-instance-where) method with fetch or fetchAll to limit your results.

```js
let author = new Author();

author
.where('age', '<', 45)
.fetchAll()
.then(function(authors) {
	console.log(`${authors.length} authors were found`);
});
```

## Associations

Associations allow developers to connect models. Models can be connected on one of the three ways listed below.

### One to one

One to one associations connect one model with a single other model. For example, a Person model may be associated with a single Address model. For example:

```js
// Associated models must be required in this file
require('./Address');
module.exports = bookshelf.model('Person', {
	tableName: 'people',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	// Add a method describing the associated data.
	address: function() {
		// That method returns the type of relationship 
		// this model shares with the associated model.
		// In this case our 'Person' has on 'Address'
		// because the addresses table has an associated
		// 'personId' column.
		return this.hasOne('Address', 'personId');
	}
});
```

```js
// Associated models must be required in this file
require('./Person');
module.exports = bookshelf.model('Address', {
	tableName: 'addresses',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	// Add a method describing the associated data.
	person: function() {
		// That method returns the type of relationship
		// this model shares with the associated model.
		// In this case our 'Address' belongs to a
		// 'Person' because the addresses table has an
		// associated 'personId' column.
		return this.belongsTo('Person', 'personId');
	}
});
```

To get the address for a given person we can use the bookshelf [related](http://bookshelfjs.org/#Model-instance-related) method.

```js
let bob = Person.forge({id: 3});
bob.related('address').then(function(address) {
	console.log(address);
});
```

Similarly, we can get the person for a given address.

```js
let mainSt = Address.forge({id: 18});
mainSt.related('person').then(function(person) {
	console.log(person);
});
```

### One to many

An example of a one to many relationship would be between authors and books. An author can have many books, but a book belongs to only one author.

```js
// Associated models must be required in this file
require('./Book');
module.exports = bookshelf.model('Author', {
	tableName: 'authors',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	books: function() {
		return this.hasMany('Book', 'authorId');
	}
});
```

```js
// Associated models must be required in this file
require('./Author');
module.exports = bookshelf.model('Book', {
	tableName: 'books',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	author: function() {
		return this.belongsTo('Author', 'authorId');
	}
});
```

For one to many relationships you may use the bookshelf [related](http://bookshelfjs.org/#Model-instance-related) method.

### Many to many

## Configuration