---
title: Database Migrations with Knex
description: Learn how to migrate your Postgres database.
date: 2016-02-27
layout: topic.html
order: 500
---

> This guide will explain the purpose of database migrations and show you how to use migrations to create new database tables as well as modify existing tables.

Throughout the lifetime of a web application we often need to make changes to the database structure. Maybe we don't get it 100% right on the first try, or requirements change that necessitate storage of new types of data. If your app is running across multiple environments (development, testing, production, etc.) it can be difficult to keep track of the structural changes to your database because the structure of your database is not tracked in your version control system (e.g. git) by default. Database migrations solve this problem by defining each change made to your database in a migration file, that is tracked by version control.

## Where are migrations stored?

Migrations are simply files that live in the `/migrations` directory of your project. When you use the perk command line tool to create a new project you will notice that there are two migrations in that directory to being with:

* [20151009115505_create_users.js](https://github.com/alarner/perk/blob/master/migrations/20151009115505_create_users.js)
* [20151009155020_create_authentication.js](https://github.com/alarner/perk/blob/master/migrations/20151009155020_create_authentication.js)

> Notice how these files each start with a long number. This number is a timestamp representing when the migration was created. Migrations run in chronological order and this timestamp preserves the order.

These migrations define how user information is stored within Perk, but you can also create your own migrations.

## Creating a migration file

Perk uses [Knex](http://knexjs.org/) for all database related functionality. One of the best features of Knex is it's robust migration support. To create a new migration simply use the knex cli:

```
knex migrate:make migration_name
```

> Your migration name should be something descriptive, not simply the name of the table that you are creating / modifying. Remember that throughout the lifetime of your app there may be several migrations that all relate to the same database table, so you want your migrations names to inform other developers as to what that migration is doing.

After running this command you'll notice that a new file is created withing your migrations directory. This file will include a current timestamp as well as the name that you gave your migration. The file will look like this:

```js

exports.up = function(knex, Promise) {
  
};

exports.down = function(knex, Promise) {
  
};
```

## Structure of a migration file

There are two functions within your newly created migration file. The first is `exports.up`, which specifies which commands should be run to make the database change that you'd like to make. Usually you'll be running one or more commands found in the [schema builder](http://knexjs.org/#Schema) section of the Knex documentation. These are things like creating database tables, adding or removing a column from a table, changing indexes, etc.

The second function within your migration file is `exports.down`. This functions goal is to do the opposite of what `exports.up` did. If `exports.up` created a table, then `exports.down` will drop that table. If `exports.up` created a added a column, then `exports.down` will remove that column. The reason to include `exports.down` is so that you can quickly undo a migration should you need to.

## Creating a new database table

## Adding a column

## Removing a column

## Adding an index

## Removing an index