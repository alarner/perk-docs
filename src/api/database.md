---
title: Database
description: Perk database API documentation.
date: 2016-02-15
layout: topic.html
---

## { Incomplete }

## Table of Contents

1. [Overview](#overview)
1. [Migrations]()
	* [Creating]()
	* [Running]()
	* [Rolling back]()
1. [Models]()
	* [Defining models]()
	* [Saving models]()
	* [Fetching models]()
1. [Collections]()
	* [Defining collections]()
	* [Saving collections]()
	* [Fetching collections]()
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

### Creating migrations

To create a new migration using knex, simply run:

```
knex migrate:make my_migration_name
```

This will create a timestamped file name in your migrations directory. This directory is [configurable](/api/config.html#migrations-directory), but defaults to the `migrations` directory in the root of your project.

### Running migrations

### Rolling back migrations

## Models

### Defining models

### Saving models

### Fetching models

## Collections

### Defining collections

### Saving collections

### Fetching collections

## Associations

### One to one

### One to many

### Many to many

## Configuration