---
title: "Webpack vs. Browserify: The Ultimate Showdown"
description: "When using perk you have the option of either Webpack or Browserify. This in itself isn't that different from other frameworks, but my reasoning for including both might be. For other technology decisions I picked what I thought was the best tool for the job. I chose knex over sequelize. I chose Sass over Less or Stylus. For the module loader, specifically, I thought it was important to use both."
date: 2016-11-27
layout: blog.html
author: "Aaron Larner"
---

When using perk you have the option of either Webpack or Browserify. This in itself isn't that different from other frameworks, but my reasoning for including both might be. For other technology decisions I picked what I thought was the best tool for the job. I chose knex over sequelize. I chose Sass over Less or Stylus. For the module loader, specifically, I thought it was important to use both.

When creating Perk I wanted it to be the most enjoyable framework for developers to use. This guided my decisions for many of the technical choices. When choosing a module loader there were a couple important factors that I took into account when evaluating different options.

1. **Speed** - bundling my front-end javascript assets should be fast during development so that I'm not sitting around twiddling my thumbs while I wait for a small change to be re-bundled.
2. **Size** - when I deploy my code, I want my javascript bundle to be as small as possible so that it downloads quickly for visitors to my website.

### The Test

When deciding whether to pick Browserify or Webpack I ran some tests to determine which tool best fulfilled those requirements. Here are some details of the test that I ran:

* Test ran on my 2.7 GHz MacBook Pro (Retina, 13-inch, Early 2015, 8 GB of memory) while it was plugged in. 
* Used a real codebase that included React with JSX and a few external modules ([moment](https://www.npmjs.com/package/moment), [howhap-fetch](https://www.npmjs.com/package/howhap-fetch), [react](https://www.npmjs.com/package/react), [react-dom](https://www.npmjs.com/package/react-dom), [react-router](https://www.npmjs.com/package/react-router)).
* Had a total of 36 front-end JavaScript files.
* I invoked both Webpack and Browserify programatically, not via their respective cli tools.

For each test I ran the bundler 100 times and recorded the amount of time each bundle took to build and the final bundle size. Here are my results:


<table>
    <thead>
        <tr>
            <th>Bundler</th>
            <th>Minify</th>
            <th>Type</th>
            <th>Fastest (ms)</th>
            <th>Slowest (ms)</th>
            <th>Mean (ms)</th>
            <th>Median (ms)</th>
            <th>Bundle Size (bytes)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Webpack</td>
            <td>No</td>
            <td>Fresh</td>
            <td>2780</td>
            <td>4485</td>
            <td>3333</td>
            <td>3351</td>
            <td>8883424</td>
        </tr>
        <tr>
            <td>Webpack</td>
            <td>No</td>
            <td>Rebuild</td>
            <td class="best">1321</td>
            <td class="best">1874</td>
            <td class="best">1597</td>
            <td class="best">1604</td>
            <td>8890934</td>
        </tr>
        <tr>
            <td>Webpack</td>
            <td>Yes</td>
            <td>Fresh</td>
            <td>2724</td>
            <td>5254</td>
            <td>2976</td>
            <td>2944</td>
            <td>3397280</td>
        </tr>
        <tr>
            <td>Browserify</td>
            <td>No</td>
            <td>Fresh</td>
            <td>2288</td>
            <td>4921</td>
            <td>2493</td>
            <td>2451</td>
            <td>3015873</td>
        </tr>
        <tr>
            <td>Browserify</td>
            <td>No</td>
            <td>Rebuild</td>
            <td>2226</td>
            <td>2903</td>
            <td>2444</td>
            <td>2428</td>
            <td>3015640</td>
        </tr>
        <tr>
            <td>Browserify</td>
            <td>Yes</td>
            <td>Fresh</td>
            <td>10721</td>
            <td>13905</td>
            <td>11755</td>
            <td>11794</td>
            <td class="best">2227159</td>
        </tr>
    </tbody>
</table>


> The **type** column represents whether the bundle was created from scratch (Fresh) with no pre-existing bundle or if it was created from a pre-existing bundle (Rebuild). For speed implications I mostly ignored the "Fresh" bundles because that will only ever happen on the first bundle. Every subsequent bundle will be working from the previous bundle.

### Conclusions

By running this simple little experiment it was clear to me that I needed both Browserify and Webpack. Webpack is insanely fast, making for a fantastic developer experience. When webpack re-builds a pre-existing bundle it does it on average **42% faster** than Browserify, meaning that you're not sitting around refreshing the page waiting to see your change while you're developing.

However, Browserify wins hands down in terms of an optimized final bundle. Minified Browserify bundles are **42% smaller** than minified Webpack bundles.

For these reasons Perk uses Webpack by default in development environments and Browserify by default for production builds.

### Try it yourself

The code that I used to run these tests [can be found here](https://github.com/alarner/perk/blob/master/build/test.js). To run your own test on your own machine with your own project files:

1. Clone the repo
2. Put your front-end JavaScript files into /public/scripts. The main entry point of the app should be called `main.js`
3. Install any necessary dependencies via npm
4. Run the following commands to run the tests. Adjust the n parameter to change the number of runs.
    * `node --use_strict build/test.js --loader=webpack -n=100` (Webpack, not minified, fresh)
    * `node --use_strict build/test.js --loader=webpack -n=100 --watch` (Webpack, not minified, rebuild)
    * `node --use_strict build/test.js --loader=webpack -n=100 --minify` (Webpack, minified, fresh)
    * `node --use_strict build/test.js --loader=browserify -n=100` (Browserify, not minified, fresh)
    * `node --use_strict build/test.js --loader=browserify -n=100 --watch` (Browserify, not minified, rebuild)
    * `node --use_strict build/test.js --loader=browserify -n=100 --minify` (Browserify, minified, fresh)