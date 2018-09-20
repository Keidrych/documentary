Documentary
===

[![npm version](https://badge.fury.io/js/documentary.svg)](https://npmjs.org/package/documentary)

<a href="https://github.com/artdecocode/documentary"><img src="images/LOGO.svg?sanitize=true" width="150" align="left"></a>

_Documentary_ is a command-line tool and a library to manage documentation of Node.js packages. Due to the fact that there is usually a lot of manual labour involved in creating and keeping up-to-date a README document, such as copying examples and the output they produce, there is a need for software that can help automate the process and focus on what is really important. _Documentary_ serves as a pre-processor of documentation and enhances every area of the task of making available quality docs for Node.js (and other languages) packages for fellow developers.

```sh
yarn add -DE documentary
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Key Features

This section has a quick look at the best features available in _Documentary_ and how they help the documentation process.

|                 Feature                 |                                                       Description                                                        |                                                                                                                                                                                                                                                                         Advantages                                                                                                                                                                                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *[Tables Of Contents](#toc-generation)* | Compiles an accurate table of contents for the content.                                                                  | 1. Makes the structure of the document immediately visible to the reader.<br/>2. Allows to navigate across the page easily.<br/>3. Shows problems with incorrect levels structure which otherwise might not be visible.<br/>4. Allows to place anchor links available from the TOC at any level in any place of the README.<br/>5. Can insert section breaks which visually divide the content and allow to navigate back to the top.                                                                                                                       |
| *[Examples](#examples-placement)*       | Allows to embed the source code into documentation.                                                                      | 1. Increases productivity by eliminating the need to copy and paste the source code manually.<br/>2. Developers can run examples as Node.js scripts to check that they are working correctly and debug them.<br/>3. Examples can also be forked (see below).<br/> 4. It is possible to imports and requires such as `../src` to be displayed as the name of the package.                                                                                                                                                      |
| *[Forks](#embedding-output)*            | Makes it possible to run an example and embed its `stdout` and `stderr` output directly into documentation. | 1. Enhances productivity by eliminating the need to copy and paste the output by hand.<br/>2. Makes sure the output is always up-to-date with the documented one.<br/>3. Will make it visible if a change to the code base lead to a different output (implicit regression testing).<br/>4. Ensures that examples are actually working.<br/>5. Can print usage of CLI tools by forking them with `-h` command.                                                                                                            |
| *[Tables](#simple-tables)*              | Compiles tables from arrays without having to write html or markdown.                                                    | 1. Removes the need to manually build tables either by hand, online or using other tools.<br/>2. Provides table macros to reduce repetitive information and substitute only the core data into templates.                                                                                                                                                                                                                                                                                                                                                   |
| *[Live Push](#automatic-push)*          | Detects changes to the source documentation files, re-compiles the output README.md and pushes to the remote repository. | 1. The preview is available on-line almost immediately after a change is made. <br/>2. Allows to skip writing a commit message and the push command every time a change is made.                                                                                                                                                                                                                                                                                                                                                                            |
| *[Typedefs](#typedef-organisation)*     | Maintains a types.xml file to place types definition in it, available both for source code and documentation.            | 1. Keeps the types declarations in one place, allowing to quickly update it both in JavaScript JSDoc, and in markdown README.<br/>2. Automatically constructs type tables for documentation.<br/>3. Expands the JSDoc config (options) argument for other developers to have a quick glance at possible options when calling a function.<br/>4. Links all types across the whole documentation for quick navigation.<br/>5. If the `types.xml` file or directory is published, other packages can embed it into documentation also, by using _Documentary_. |
| *[API Method Titles](#method-titles)*   | Creates good-looking headers for methods.                                                                                | 1. By writing each argument on new line, makes it easier to understand the signature of a function.<br/>2. Can maintain a separate title for the table of contents to keep things simple there.                                                                                                                                                                                                                                                                                                                                                             |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Table Of Contents

- [Key Features](#key-features)
- [Table Of Contents](#table-of-contents)
- [Installation & Usage](#installation--usage)
- [**TOC Generation**](#toc-generation)
  * [TOC Titles](#toc-titles)
  * [Level TOC Titles](#level-toc-titles)
  * [Section Breaks](#section-breaks)
- [**Simple Tables**](#simple-tables)
  * [Template Macros](#template-macros)
- [**Examples Placement**](#examples-placement)
  * [Partial Examples](#partial-examples)
- [**Embedding Output**](#embedding-output)
  * [Stderr](#stderr)
- [**Method Titles**](#method-titles)
  * [`async runSoftware(path: string, config: Config): string`](#async-runsoftwarepath-stringconfig-view-containeractions-objectstatic-boolean--truerender-function-string)
  * [`async runSoftware(path: string)`](#async-runsoftwarepath-string-void)
  * [`runSoftware(): string`](#runsoftware-string)
  * [`runSoftware()`](#runsoftware-void)
- [**Comments Stripping**](#comments-stripping)
- [**File Splitting**](#file-splitting)
- [**Replacement Rules**](#replacement-rules)
- [**Gif Detail**](#gif-detail)
  * [<code>yarn doc</code>](#yarn-doc)
- [**`Type` Definition**](#type-definition)
  * [Dedicated Example Row](#dedicated-example-row)
- [**`@typedef` Organisation**](#typedef-organisation)
  * [JS Placement](#js-placement)
    * [Expanded `@param`](#expanded-param)
  * [README placement](#readme-placement)
    * [`SetHeaders`](#setheaders)
    * [`RightsConfig`](#rightsconfig)
    * [`StaticConfig`](#staticconfig)
  * [Advanced Usage](#advanced-usage)
    * [Spread `@param`](#spread-param)
  * [Importing Types](#importing-types)
  * [XML Schema](#xml-schema)
  * [Migration](#migration)
- [CLI](#cli)
  * [Output Location](#output-location)
  * [Only TOC](#only-toc)
  * [Generate Types](#generate-types)
  * [Extract Types](#extract-types)
  * [Watch Mode](#watch-mode)
  * [Automatic Push](#automatic-push)
  * [h1 In Toc](#h1-in-toc)
  * [Reverse Order](#reverse-order)
  * [`NODE_DEBUG=doc`](#node_debugdoc)
- [API](#api)
  * [`Toc` Stream](#toc-stream)
  * [`TocConfig` Type](#tocconfig-type)
    * [<code>skipLevelOne</code>](#skiplevelone)
  * [`constructor(config?: TocConfig): Toc`](#constructorconfig-skiplevelone-boolean--true-toc)
- [#PRO<br/>Underlined<br/>`Titles`](#prounderlinedtitles)
- [Glossary](#glossary)
  * [Online Documentation](#online-documentation)
  * [Editor Documentation](#editor-documentation)
- [TODO](#todo)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Installation & Usage

The `doc` client is available after installation. It can be used in a `doc` script of `package.json`, as follows:

```json
{
  "scripts": {
    "doc": "doc documentary -o README.md"
  }
}
```

The first argument, `documentary` is a path to a directory containing source documentation files, or a path to a single file to be processed, e.g., `README-source.md`.

Therefore, to produce an output `README.md`, the following command will be used:

```sh
yarn doc
```

When actively working on documentation, it is possible to use the `watch` mode with `-w` flag, or `-p` flag to also automatically push changes to a remote git repository, merging them into a single commit every time.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## **TOC Generation**

Table of contents are useful for navigation in a README document. When a `%TOC%` placeholder is found in the file, it will be replaced with an extracted structure. Titles appearing in comments and code blocks will be skipped.

By default, top level `h1` headers written with `#` are ignored, but they can be added by passing `-h1` [CLI argument](#h1-in-toc).

```md
- [Table Of Contents](#table-of-contents)
- [CLI](#cli)
  * [`-j`, `--jsdoc`: Add JSDoc](#-j---jsdoc-add-jsdoc)
- [API](#api)
- [Copyright](#copyright)
```

### TOC Titles

To be able to include a link to a specific position in the text (i.e., create an "anchor"), _Documentary_ has a `TOC Titles` feature. Any text written as `[Toc Title](t)` will generate a relevant position in the table of contents. It will automatically detect the appropriate level and be contained inside the current section.

This feature can be useful when presenting some data in a table in a section, but wanting to include a link to each row in the table of contents so that the structure is immediately visible.

**<a name="level-toc-titles">Level TOC Titles</a>**: if required, the level can be specified with a number of `#` symbols, such as `[Specific Level](###)`.

### Section Breaks

A section break is a small image in the center of the page which indicates the end of a section. With larger sections which also include sub-sections, this feature can help to differentiate when the topic finishes and another one starts. They can also be used to navigate back to the table of contents, or a specified location.

At the moment, there is support for pre-installed section breaks. In future, more support of custom images will be included.

To insert a section brake, the following marker is used:

```
%~[, number[, attributes]]%
```

For example:

```md
%~%
%~ 15%
%~ -1%
%~ href="https://hello.world" width="200"%
```

```
<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>
<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/15.svg?sanitize=true"></a></p>
<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>
<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/16.svg?sanitize=true" href="https://hello.world" width="200"></a></p>
```

There are 23 available section breaks which will be inserted in incremental order in the document. When the end of the list is reached, the count restarts. There are also 3 ending breaks which can be inserted at the end and do not participate in the rotation, so that they must be inserted manually. To select a specific image, its number can be given.

<table>
 <thead>
  <tr>
   <th>0</th>
   <th>1</th>
   <th>2</th>
   <th>3</th>
   <th>4</th>
   <th>5</th>
   <th>6</th>
   <th>7</th>
   <th>8</th>
   <th>9</th>
   <th>10</th>
   <th>11</th>
  </tr>
 </thead>
 <tbody>
  <tr/>
  <tr>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/0.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/1.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/2.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/3.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/4.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/5.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/6.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/7.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/8.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/9.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/10.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/11.svg?sanitize=true"></td>
  </tr>
  <tr>
   <td align="center"><strong>12</strong></td>
   <td align="center"><strong>13</strong></td>
   <td align="center"><strong>14</strong></td>
   <td align="center"><strong>15</strong></td>
   <td align="center"><strong>16</strong></td>
   <td align="center"><strong>17</strong></td>
   <td align="center"><strong>18</strong></td>
   <td align="center"><strong>19</strong></td>
   <td align="center"><strong>20</strong></td>
   <td align="center"><strong>21</strong></td>
   <td align="center"><strong>22</strong></td>
  </tr>
  <tr>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/12.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/13.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/14.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/15.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/16.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/17.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/18.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/19.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/20.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/21.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/22.svg?sanitize=true"></td>
  </tr>
 </tbody>
</table>

<table>
 <thead>
  <tr>
   <th>-1</th>
   <th>-2</th>
   <th>-3</th>
  </tr>
 </thead>
 <tbody>
  <tr/>
  <tr>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/-1.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/-2.svg?sanitize=true"></td>
   <td><img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/-3.svg?sanitize=true"></td>
  </tr>
 </tbody>
</table>

By default, the section brake will link to the table of contents, however this can be changed by setting the `href` attribute. The images are also SVGs therefore it is possible to give them any width via the `width` attribute and they will stretch without any loss of quality. _Documentary_ will copy images from its source code to the `.documentary/section-breaks` directory in the repository. To control the destination, set the `to` attribute on section breaks.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## **Simple Tables**

One of the most common problem with markdown is that it is hard to write tables. They must be written either as html, or as markdown, which is troublesome and requires effort. Although there are online tools to build markdown tables, with _Documentary_ the process is even simpler: the data just needs to be put into a JSON array.

To describe tabular data (for example, a CLI tool arguments) in a table, but prepare them in a more readable format, _Documentary_ allows to write code blocks with the `table` language to be converted into a markdown table. The content of the blocks must be in `JSON` format and contain a single array of arrays which represent rows.

````m
```table
[
  ["arg", "description"],
  ["-f", "Display only free domains"],
  ["-z", "A list of zones to check"],
]
```
````

Result:

| arg | description |
| --- | ----------- |
| -f | Display only free domains |
| -z | A list of zones to check |

### Template Macros

Whenever there's a pattern for presenting data in a table, such as that input fields can be mapped to output columns, a table macro can be defined. The example below defines a macro to print a row containing a link, logo and description of a company. It is then used in a table, where only the actual values are entered, relying on _Documentary_ to substitute them in the template.

````markdown
%TABLE-MACRO Company
  <a href="$2">![$1 Logo](images/logos/$3)</a>, $4, $5\, $6
%

```table Company
[
  ["Company", "Tag Line", "Evaluation & Exit"],
  [
    "VWO", "https://vwo.com", "vwo.png", "A/B Testing and Conversion Optimization Platform™", "$10m", "2018"
  ]
]
```
````

```markdown
|                             Company                             |                     Tag Line                      | Evaluation & Exit |
| --------------------------------------------------------------- | ------------------------------------------------- | ----------------- |
| <a href="https://vwo.com">![VWO Logo](images/logos/vwo.png)</a> | A/B Testing and Conversion Optimization Platform™ | $10m, 2018        |
```

The values in the macro need to be separated with `,` which allows to substitute them into the correct column of the table row. When a `,` needs to be used as part of the column in the macro, it can be escaped with `\` such as `\,` as shown in the last column of the example.

| Company | Tag Line | Evaluation & Exit |
| ------- | -------- | ----------------- |
| <a href="https://vwo.com">![VWO Logo](images/logos/vwo.png)</a> | A/B Testing and Conversion Optimization Platform™ | $10m, 2018 |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## **Examples Placement**

_Documentary_ can be used to embed examples into the documentation. The example file needs to be specified with the following marker:

```
%EXAMPLE: example/example.js [, ../src => documentary] [, javascript]%
```

The first argument is the path to the example relative to the working directory of where the command was executed (normally, the project folder). The second optional argument is the replacement for the `import` statements (or `require` calls). The third optional argument is the markdown language to embed the example in and will be determined from the example extension if not specified.

Given the documentation section:

```md
## API Method

This method allows to generate documentation.

%EXAMPLE: example/example.js, ../src => documentary, javascript%
```

And the example file `examples/example.js`

```js
import documentary from '../src'
import Catchment from 'catchment'

(async () => {
  await documentary()
})()
```

The program will produce the following output:

````md
## API Method

This method allows to generate documentation.

```javascript
import documentary from 'documentary'
import Catchment from 'catchment'

(async () => {
  await documentary()
})()
```
````

### Partial Examples

Whenever only a part of an example needs to be shown (but the full code is still needed to be able to run it), _Documentary_ allows to use `start` and `end` comments to specify which part to print to the documentation. It will also make sure to adjust the indentation appropriately.

```js
import documentary from '../src'
import Catchment from 'catchment'

(async () => {
  /* start example */
  await documentary()
  /* end example */
})()
```

```js
await documentary()
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>

## **Embedding Output**

When placing examples, it is important to show the output that they produce. This can be achieved using the `FORK` marker.

```md
%FORK(-lang)? module ...args%
```

It will make _Documentary_ fork a Node.js module using the `child_process.fork` function. The output is printed in a code block, with optionally given language.

<table>
<thead>
 <tr>
  <th>Markdown</th><th>JavaScript</th>
 </tr>
</thead>
<tbody>
 <tr/>
 <tr>
  <td>

```markdown
The program will output:

%FORK-fs example/fork/fork%
```
  </td>

  <td>

```js
// Display a welcome message.
console.log('HELLO world')
```
  </td>
 </tr>
 <tr>
 <td colspan="2" align="center"><strong>Output<strong></td>
 </tr>
 <tr>
 <td colspan="2">

````
The program will output:

```fs
HELLO world
```
````
 </td>
 </tr>
</table>

### Stderr

By default, the `FORK` marker will print the `stdout` output. To print the `stderr` output, there is the `FORKERR` marker.

```md
%FORKERR(-lang)? module ...args%
```

It works exactly the same as `%FORK%` but will print the output of the process's `stderr` stream.


<table>
<thead>
 <tr>
  <th>Markdown</th><th>JavaScript</th>
 </tr>
</thead>
<tbody>
 <tr/>
 <tr>
  <td>

```markdown
In case of an error, the program will print:

%FORKERR-fs example/fork/fork-stderr%
```
  </td>

  <td>

```js
// Notify of an error.
console.error('An error has occurred.')
```
  </td>
 </tr>
 <tr>
 <td colspan="2" align="center"><strong>Output<strong></td>
 </tr>
 <tr>
 <td colspan="2">

````
In case of an error, the program will print:

```fs
An error has occurred.
```
````
 </td>
 </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true"></a></p>

## **Method Titles**

_Documentary_ can generate neat titles useful for API documentation. The method signature should be specified in a `JSON` array, where every member is an argument written as an array containing its name and type. The type can be either a string, or an object.

For object types, each value is an array which contains the property type and its default value. To mark a property as optional, the `?` symbol can be used at the end of the key.

The last item in the argument array is used when the argument is an object and is a short name to be place in the table of contents (so that a complex object can be referenced to its type).

### `async runSoftware(`<br/>&nbsp;&nbsp;`path: string,`<br/>&nbsp;&nbsp;`config: {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`View: Container,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`actions: object,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`static?: boolean = true,`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`render?: function,`<br/>&nbsp;&nbsp;`},`<br/>`): string`

Generated from

````m
```### async runSoftware => string
[
  ["path", "string"],
  ["config", {
    "View": ["Container"],
    "actions": ["object"],
    "static?": ["boolean", true],
    "render?": ["function"]
  }, "Config"]
]
```
````

### `async runSoftware(`<br/>&nbsp;&nbsp;`path: string,`<br/>`): void`

Generated from

````m
```### async runSoftware
[
  ["path", "string"]
]
```
````

### `runSoftware(): string`

Generated from

````m
```### runSoftware => string
```
````


### `runSoftware(): void`

Generated from

````m
```### runSoftware
```
````

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true"></a></p>

## **Comments Stripping**

Since comments found in `<!-- comment -->` sections are not visible to users, they will be removed from the compiled output document.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/9.svg?sanitize=true"></a></p>

## **File Splitting**

_Documentary_ can read a directory and put files together into a single `README` file. The files will be sorted in alphabetical order, and their content merged into a single stream. The `index.md` and `footer.md` are special in this respect, such that the `index.md` of a directory will always go first, and the `footer.md` will go last. To print in reverse order, for example when writing a blog and name files by their dates, the [`--reverse` flag](#reverse-order) can be passed to the CLI.

Example structure used in this documentation:

```m
documentary
├── 1-installation-and-usage
│   └── index.md
├── 2-features
│   ├── 1-toc.md
│   ├── 1-toc2-section-breaks.md
│   ├── 10-typedef
│   │   ├── 1-js.md
│   │   ├── 2-readme.md
│   │   ├── 3-advanced.md
│   │   ├── 3-imports.md
│   │   ├── 4-schema.md
│   │   ├── 9-migration.md
│   │   └── index.md
│   ├── 2-tables.md
│   ├── 3-examples.md
│   ├── 3-fork.md
│   ├── 3-method-title.md
│   ├── 4-comment-stripping.md
│   ├── 5-file-splitting.md
│   ├── 6-rules.md
│   ├── 8-gif.md
│   ├── 9-type.md
│   └── footer.md
├── 3-cli.md
├── 4-api
│   ├── 1-toc.md
│   ├── footer.md
│   └── index.md
├── footer.md
└── index.md
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/10.svg?sanitize=true"></a></p>

## **Replacement Rules**

There are some other built-in rules for replacements which are listed in this table.


|           Rule           |                                                          Description                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| %NPM: package-name%      | Adds an NPM badge, e.g., `[![npm version] (https://badge.fury.io/js/documentary.svg)] (https://npmjs.org/package/documentary)`                                                               |
| %TREE directory ...args% | Executes the `tree` command with given arguments. If `tree` is not installed, warns and does not replace the match. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/11.svg?sanitize=true"></a></p>

## **Gif Detail**

The `GIF` rule will inserts a gif animation inside of a `<detail>` block. To highlight the summary with background color, `<code>` should be used instead of back-ticks. [TOC title link](##toc-titles) also work inside the summary.

```
%GIF doc/doc.gif
Alt: Generating documentation.
Click to View: [<code>yarn doc</code>](t)
%
```

<details>
  <summary>Click to View: <a name="yarn-doc"><code>yarn doc</code></a></summary>
  <table>
  <tr><td>
    <img alt="Alt: Generating documentation." src="doc/doc.gif" />
  </td></tr>
  </table>
</details>
<br>

The actual html placed in the `README` looks like the one below:

```html
<details>
  <summary>Summary of the detail: <code>yarn doc</code></summary>
  <table>
  <tr><td>
    <img alt="Alt: Generating documentation." src="doc/doc.gif" />
  </td></tr>
  </table>
</details>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/12.svg?sanitize=true"></a></p>

## **`Type` Definition**

Often, it is required to document a type of an object, which methods can use. To display the information about type's properties in a table, the `TYPE` macro can be used. It allows to show all possible properties that an object can contain, show which ones are required, give examples and link them in the table of contents (disabled by default).

Its signature is as follows:

```xml
%TYPE addToToc(true|false)
<p name="propertyName" type="propertyType" required>
  <d>Property Description.</d>
  <d>Property Example.</d>
</p>
%
```

For example,

````xml
%TYPE
<p name="text" type="string" required>
  <d>Display text. Required.</d>
  <e>

```js
const q = {
  text: 'What is your name',
}
```
  </e>
</p>
<p name="validation" type="(async) function">
  <d>A function which needs to throw an error if validation does not pass.</d>
  <e>

```js
const q = {
  text: 'What is your name',
  validate(v) {
    if (!v.length) throw new Error('Name is required.')
  },
}
```
  </e>
</p>
%
````

will display the following table:

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><strong><code>text*</code></strong></td>
   <td><em>string</em></td>
   <td>Display text. Required.</td>
   <td>

```js
const q = {
  text: 'What is your name',
}
```
  </td>
  </tr>
  <tr>
   <td><code>validation</code></td>
   <td><em>(async) function</em></td>
   <td>A function which needs to throw an error if validation does not pass.</td>
   <td>

```js
const q = {
  text: 'What is your name',
  validate(v) {
    if (!v.length) throw new Error('Name is required.')
  },
}
```
  </td>
  </tr>
 </tbody>
</table>


When required to use the markdown syntax in tables (such as `__`, links, _etc_), an extra space should be left after the `d` or `e` tags like so:

```xml
%TYPE true
<p name="skipLevelOne" type="boolean">
  <d>

Start the table of contents from level 2, i.e., excluding the `#` title.</d>
</p>
%
```

Otherwise, the content will not be processed by `GitHub`. However, it will add an extra margin to the content of the cell as it will be transformed into a paragraph.

### Dedicated Example Row

Because examples occupy a lot of space which causes table squeezing on GitHub and scrolling on NPM, _Documentary_ allows to dedicate a special row to an example. It can be achieved by adding a `row` attribute to the `e` element, like so:

````xml
%TYPE
<p name="headers" type="object">
  <d>Incoming headers returned by the server.</d>
  <e row>

```json
{
  "server": "GitHub.com",
  "content-type": "application/json",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK"
}
```
  </e>
</p>
%
````

In addition, any properties which do not contain examples will not have an example column at all.

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>body</code></td>
   <td><em>string|object|Buffer</em></td>
   <td colspan="2">The return from the server.</td>
  </tr>
  <tr>
   <td><code>headers</code></td>
   <td><em>object</em></td>
   <td colspan="2">Incoming headers returned by the server.</td>
  </tr>
  <tr></tr>
  <tr>
   <td colspan="4">

```json
{
  "server": "GitHub.com",
  "content-type": "application/json",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK"
}
```
  </td>
  </tr>
  <tr>
   <td><code>statusCode</code></td>
   <td><em>number</em></td>
   <td>The status code returned by the server.</td>
   <td><code>200</code></td>
  </tr>
 </tbody>
</table>


Finally, when no examples which are not rows are given, there will be no `Example` heading.

````xml
%TYPE
<p name="data" type="object">
  <d>Optional data to send to the server with the request.</d>
  <e row>

```js
{
  name: 'test',
}
```
  </e>
</p>
<p name="method" type="string">
  <d>What HTTP method to use to send data (only works when <code>data</code> is set).</d>
</p>
%
````

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>data</code></td>
   <td><em>object</em></td>
   <td>Optional data to send to the server with the request.</td>
  </tr>
  <tr></tr>
  <tr>
   <td colspan="3">

```js
{
  name: 'test',
}
```
  </td>
  </tr>
  <tr>
   <td><code>method</code></td>
   <td><em>string</em></td>
   <td>What HTTP method to use to send data (only works when <code>data</code> is set).</td>
  </tr>
 </tbody>
</table>


<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/13.svg?sanitize=true"></a></p>

## **`@typedef` Organisation**

For the purpose of easier maintenance of _JSDoc_ `@typedef` declarations, _Documentary_ allows to keep them in a separate XML file, and then place compiled versions into both source code as well as documentation. By doing this, more flexibility is achieved as types are kept in one place but can be reused for various purposes across multiple files. It is different from _TypeScript_ type declarations as _Documentary_ will generate _JSDoc_ comments rather than type definitions which means that a project does not have to be written in _TypeScript_.

Types are kept in a separate `xml` file, for example:

```xml
<types>
  <import name="ServerResponse" from="http"
    link="https://nodejs.org/api/http.html#http_class_http_serverresponse"
  />
  <type name="SetHeaders"
    type="(res: ServerResponse) => any"
    desc="Function to set custom headers on response." />
  <type name="RightsConfig"
    type="{ location: string, rights: number }[]"
    desc="Configuration of read and write access rights." />
  <type name="StaticConfig" desc="Options to setup `koa-static`.">
    <prop string name="root">
      Root directory string.
    </prop>
    <prop number name="maxage" default="0">
      Browser cache max-age in milliseconds.
    </prop>
    <prop boolean name="hidden" default="false">
      Allow transfer of hidden files.
    </prop>
    <prop string name="index" default="index.html">
      Default file name.
    </prop>
    <prop opt type="SetHeaders" name="setHeaders">
      Function to set custom headers on response.
    </prop>
    <prop opt type="Promise.<RightsConfig>" name="rightsPromise">
      The promise which will be resolved with access rights to files.
    </prop>
  </type>
</types>
```

They are then included in both JavaScript source code and markdown documentation.

### JS Placement

To include a compiled declaration into the source code, the following line should be placed in the `.js` file (where the `types/static.xml` file exists in the project directory from which the `doc` command will be run):

```js
/* documentary types/static.xml */
```

For example, an unprocessed _JavaScript_ file can look like this:

```js
/* src/config-static.js */
import Static from 'koa-static'

/**
 * Configure the middleware.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}

/* documentary types/static.xml */

export default configure
```

> Please note that the types marker must be placed before `export default` is done (or just `export`) as there's currently a bug in VS Code.

The file is then processed with [`doc src/config-static.js -g`](#generate-types) command and updated in place, unless `-` is given as an argument, which will print the output to _stdout_, or the path to the output file is specified. After the processing is done, the source code will be transformed to include all types specified in the XML file. This routine can be repeated whenever types are updated.

```js
/* src/config-static.js */
import Static from 'koa-static'

/**
 * Configure the middleware.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}

/* documentary types/static.xml */
/**
 * @typedef {import('http').ServerResponse} ServerResponse
 *
 * @typedef {(res: ServerResponse) => any} SetHeaders Function to set custom headers on response.
 *
 * @typedef {{ location: string, rights: number }[]} RightsConfig Configuration of read and write access rights.
 *
 * @typedef {Object} StaticConfig Options to setup `koa-static`.
 * @prop {string} root Root directory string.
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 * @prop {string} [index="index.html"] Default file name. Default `index.html`.
 * @prop {SetHeaders} [setHeaders] Function to set custom headers on response.
 * @prop {Promise.<RightsConfig>} [rightsPromise] The promise which will be resolved with access rights to files.
 */

export default configure
```

#### Expanded `@param`

In addition, _JSDoc_ for any method that has got an included type as one of its parameters will be updated to its expanded form so that a preview of options is available.

Therefore, a raw function _JSDoc_ of a function written as

```js
/**
 * Configure the middleware.
 * @param {StaticConfig} config Options to setup `koa-static`.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}
```

will be expanded to include the properties of the type:

```js
/**
 * Configure the middleware.
 * @param {StaticConfig} config Options to setup `koa-static`.
 * @param {string} config.root Root directory string.
 * @param {number} [config.maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @param {boolean} [config.hidden=false] Allow transfer of hidden files. Default `false`.
 * @param {string} [config.index="index.html"] Default file name. Default `index.html`.
 * @param {SetHeaders} [config.setHeaders] Function to set custom headers on response.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}
```

This makes it possible to see the properties of the argument to the `configure` function fully:

![preview of the configure function](doc/typedef-config.gif)

And the description of each property will be available when passing an argument to the function:

![preview of a property description](doc/desc.gif)

Compare that to the preview without _JSDoc_ expansion:

![preview of the configure function without expanded params](doc/no-expansion.gif)

To prevent the expansion, the `noExpand` attribute should be added to the type.

### README placement

To place a type definition as a table into a `README` file, the `TYPEDEF` marker can be used, where the first argument is the path to the `xml` file containing definitions, and the second one is the name of the type to embed. Moreover, links to the type descriptions will be created in the table of contents using the [__TOC Titles__](#toc-titles), but to prevent this, the `noToc` attribute should be set for a type.

```
%TYPEDEF path/definitions.xml [TypeName]%
```

For example, using the previously defined `StaticConfig` type from `types/static.xml` file, _Documentary_ will process the following markers:

```
%TYPEDEF types/static.xml ServerResponse%
%TYPEDEF types/static.xml SetHeaders%
%TYPEDEF types/static.xml StaticConfig%
```

or a single marker to include all types in order in which they appear in the `xml` file:

```
%TYPEDEF types/static.xml%
```

and embed resulting type definitions (with the imported type linked to the Node.js documentation due to its `link` attribute):

[`import('http').ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) __<a name="serverresponse">`ServerResponse`</a>__

`(res: ServerResponse) => any` __<a name="setheaders">`SetHeaders`</a>__: Function to set custom headers on response.

`{ location: string, rights: number }[]` __<a name="rightsconfig">`RightsConfig`</a>__: Configuration of read and write access rights.

__<a name="staticconfig">`StaticConfig`</a>__: Options to setup `koa-static`.

|     Name      |                      Type                       |                           Description                           |   Default    |
| ------------- | ----------------------------------------------- | --------------------------------------------------------------- | ------------ |
| __root*__     | _string_                                        | Root directory string.                                          | -            |
| maxage        | _number_                                        | Browser cache max-age in milliseconds.                          | `0`          |
| hidden        | _boolean_                                       | Allow transfer of hidden files.                                 | `false`      |
| index         | _string_                                        | Default file name.                                              | `index.html` |
| setHeaders    | _[SetHeaders](#setheaders)_                     | Function to set custom headers on response.                     | -            |
| rightsPromise | _Promise.&lt;[RightsConfig](#rightsconfig)&gt;_ | The promise which will be resolved with access rights to files. | -            |

_Documentary_ wil scan each source file of the documentation first to build a map of all types. Whenever a property appears to be of a known type, it will be automatically linked to the location where it was defined. It is also true for properties described as generic types, such as `Promise.<Type>`. This makes it possible to define all types in one place, and then reference them in the API documentation.

### Advanced Usage

The basic functionality of maintaining types in the source `JavaScript` and `MarkDown` files is mostly enough. In addition, there are some advanced patterns which can be used in JavaScript.

#### Spread `@param`

When a type is just an object, it can be spread into a notation which contains its properties for even better visibility. To do that, the `spread` attribute must be added to the type definition in the `xml` file.

Again, a raw function with JSDoc:

```js
/**
 * Configure the middleware.
 * @param {StaticConfig} config Options to setup `koa-static`.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}
```

Can be re-written as spread notation of a type.

```js
/**
 * Configure the middleware.
 * @param {{ root: string, maxage?: number, hidden?: boolean, index?: string, setHeaders?: SetHeaders }} config Options to setup `koa-static`.
 * @param {string} config.root Root directory string.
 * @param {number} [config.maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @param {boolean} [config.hidden=false] Allow transfer of hidden files. Default `false`.
 * @param {string} [config.index="index.html"] Default file name. Default `index.html`.
 * @param {SetHeaders} [config.setHeaders] Function to set custom headers on response.
 */
function configure(config) {
  const middleware = Static(config)
  return middleware
}
```

The properties will be visible in the preview:

![preview of the configure function with stread params](doc/spread.gif)

However, this method has one disadvantage as there will be no descriptions of the properties when trying to use them in a call to function:

![spread will not have a description](doc/no-desc.gif)

Therefore, it must be considered what is the best for developers -- to see descriptions of properties when passing a configuration object to a function, but not see all possible properties, or to see the full list of properties, but have no visibility of what they mean.

It is also not possible to automatically update the spread type in place, because the information about the original type is lost after its converted into the object notation.

Generally, this feature should not be used, because the autocompletion list can be summoned by hitting <kbd>ctrl</kbd><kbd>     </kbd>.

### Importing Types

A special `import` element can be used to import a type using _VS Code_'s _TypeScript_ engine. An import is just a typedef which looks like `/** @typedef {import('package').Type} Type */`. This makes it easier to reference an external type later in the file. However, it is not supported in older versions of _VS Code_.

The import will never display in the Table of Contents as its an external type and should be used to document internal API. There are three attributes supported by the `import` element:

| Attribute |                  Meaning                   |
| --------- | ------------------------------------------ |
| from      | The package from which to import the type. |
| name      | The name of the type.                      |
| link      | The link to display in the documentation.  |

<table>
<thead>
<tr>
<th>Original Source</th>
<th>Types Definition</th>
</tr>
</thead>
<tbody>
<tr/>
<tr><td>

```js
async function example() {
  process.stdout.write('example\n')
}

/* documentary types/import.xml */

export default example
```
</td>
<td>

```xml
<types>
  <import name="IncomingMessage" from="http" />
  <import name="ServerResponse" from="http" />
  <import name="StorageEngine" from="koa-multer" />
  <import name="File" from="koa-multer" />
  <type type="(f: File) => void" name="Function"
    desc="A function to save a file." />
</types>
```
</td>
</tr>
<tr>
<td colspan="2" align="center">
<strong>Output</strong>
</td></tr>
<tr>
<td colspan="2">

```js
async function example() {
  process.stdout.write('example\n')
}

/* documentary types/import.xml */
/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {import('koa-multer').StorageEngine} StorageEngine
 * @typedef {import('koa-multer').File} File
 *
 * @typedef {(f: File) => void} Function A function to save a file.
 */

export default example
```
</td>
</tr>
</tbody>
</table>

### XML Schema

The XML file should have the following nodes and attributes:

<table>
<thead>
 <tr>
  <th>Node</th>
  <th>Description</th>
  <th>Attributes</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>

_types_</td>
  <td>A single root element.</td>
  <td></td>
 </tr>
 <tr>
  <td>

_import_</td>
  <td>An imported type definition.</th>
  <td>

- _name_: Name of the imported type.</li>
- _from_: The module from which the type is imported.</li>
- _link_: The link to a web page displayed in the documentation.</li>
  </td>
 </tr>
 <tr>
  <td>

_type_</td>
  <td>

A `@typedef` definition.</th>
  <td>

- _name_: A name of the type.</li>
- _desc_: A Description of the type.</li>
- _type_: A type of the type, if different from `Object`.</li>
- _noToc_: Do not include link to the type in the table of contents.</li>
- _spread_: Spread the type to the `{ prop: Type, prop2: Type2 }` notation when used as a `@param`.</li>
- _noExpand_: Do not expand the type when writing as a `@param` in _JSDoc_.</li>
  </td>
 </tr>
 <tr>
  <td>

_prop_</td>
  <td>

Property of a `@typedef` definition.</th>
  <td>

- _name_: Name of the property.</li>
- _string_: Whether the property is string.</li>
- _number_: Whether the property is number.</li>
- _boolean_: Whether the property is boolean.</li>
- _opt_: Whether the property is optional.</li>
- _default_: Default value of the property. When given, the property becomes optional.</li>
  </td>
 </tr>
</tbody>
</table>

### Migration

A JavaScript file can be scanned for the presence of `@typedef` JSDoc comments, which are then extracted to a `types.xml` file. This can be done with the [`doc src/index.js -e types/index.xml`](#extract-types) command. This is primarily a tool to migrate older software to using `types.xml` files which can be used both for [online documentation](#online-documentation) and [editor documentation](#editor-documentation).

For example, types can be extracted from a JavaScript file which contains JSDoc in form of comments:

```js
async function test() {
  process.stdout.write('ttt')
}

/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 */

/**
 * @typedef {(m: IncomingMessage)} Test This is test function.
 *
 * @typedef {Object} SessionConfig Description of Session Config.
 * @prop {string} key cookie key.
 * @prop {number|'session'} [maxAge=86400000] maxAge in ms. `session` will result in a cookie that expires when session/browser is closed.
 * @prop {boolean} [overwrite] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly] httpOnly or not or not. Default `true`.
 * @prop {boolean} [renew] Renew session when session is nearly expired, so we can always keep user logged in. Default `false`.
 */


export default test
```

When a description ends with <code>Default &#96;value&#96;</code>, the default value of a type can also be parsed from there.

```xml
<types>
  <import name="IncomingMessage" from="http" />
  <type name="Test" type="(m: IncomingMessage)" desc="This is test function." />
  <type name="SessionConfig" desc="Description of Session Config.">
    <prop string name="key">
      cookie key.
    </prop>
    <prop type="number|'session'" name="maxAge" default="86400000">
      maxAge in ms. `session` will result in a cookie that expires when session/browser is closed.
    </prop>
    <prop boolean name="overwrite" default="true">
      Can overwrite or not.
    </prop>
    <prop boolean name="httpOnly" default="true">
      httpOnly or not or not.
    </prop>
    <prop boolean name="renew" default="false">
      Renew session when session is nearly expired, so we can always keep user logged in.
    </prop>
  </type>
</types>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/14.svg?sanitize=true"></a></p>

## CLI

The program is used from the CLI (or `package.json` script).

```sh
doc README-source.md [-o README.md] [-tgewp]
```

The arguments it accepts are:


|         Flag          |       Meaning        |                                                                                                Description                                                                                                 |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-o path`             | <a name="output-location">Output Location</a> | Where to save the processed `README` file. If not specified, the output is written to the `stdout`.                                        |
| `-t`                  | <a name="only-toc">Only TOC</a>        | Only extract and print the table of contents.                                                                                                                                                              |
| `-g [path]`           | <a name="generate-types">Generate Types</a>  | Insert `@typedef` _JSDoc_ into JavaScript files. When no path is given, the files are updated in place, and when `-` is passed, the output is printed to _stdout_. |
| `-e [path]`           | <a name="extract-types">Extract Types</a>   | Insert `@typedef` JSDoc into JavaScript files. When no path is given, the files are updated in place, and when `-` is passed, the output is printed to _stdout_. |
| `-w`                  | <a name="watch-mode">Watch Mode</a>      | Watch mode: re-run the program when changes to the source file are detected.                                                                                                                               |
| `-p 'commit message'` | <a name="automatic-push">Automatic Push</a>  | Watch + push: automatically push changes to a remote git branch by squashing them into a single commit.                                                                                                    |
| `-h1`                 | <a name="h1-in-toc">h1 In Toc</a>       | Include `h1` headers in the table of contents.                                                                                                                         |
| `-r`                  | <a name="reverse-order">Reverse Order</a>   | Reverse the output order of files, such as that `2.md` will come before `1.md`. This could be useful when writing blogs. The `index.md` and `footer.md` files will still come first and last respectively. |

When <a name="node_debugdoc">`NODE_DEBUG=doc`</a> is set, the program will print debug information, e.g.,

```
DOC 80734: stripping comment
DOC 80734: could not parse the table
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/15.svg?sanitize=true"></a></p>

## API

The programmatic use of _Documentary_ is intended for developers who want to use this software in their projects.

### `Toc` Stream

`Toc` is a transform stream which can generate a table of contents for incoming markdown data. For every title that the transform sees, it will push the appropriate level of the table of contents.

### `TocConfig` Type

When creating a new `Toc` instance, it will accept the following configuration object.
<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a name="skiplevelone"><code>skipLevelOne</code></a></td>
   <td><em>boolean</em></td>
   <td>Start the table of contents from level 2, i.e., excluding the <code>#</code> title.</td>
   <td>For example, the following code:

```md
# Hello World

## Table Of Contents

## Introduction
```

will be compiled to

```md
- [Table Of Contents](#table-of-contents)
- [Introduction](#introduction)
```

when `skipLevelOne` is not set (by default), and to

```md
- [Hello World](#hello-world)
  * [Table Of Contents](#table-of-contents)
  * [Introduction](#introduction)
```

when `skipLevelOne` is set to `false`.
  </td>
  </tr>
 </tbody>
</table>


### `constructor(`<br/>&nbsp;&nbsp;`config?: {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`skipLevelOne?: boolean = true,`<br/>&nbsp;&nbsp;`},`<br/>`): Toc`

Create a new instance of a `Toc` stream.

```javascript
/* yarn example/toc.js */
import { Toc } from 'documentary'
import Catchment from 'catchment'
import { createReadStream } from 'fs'

(async () => {
  try {
    const md = createReadStream('example/markdown.md')
    const rs = new Toc()
    md.pipe(rs)

    const { promise } = new Catchment({ rs })
    const res = await promise
    console.log(res)
  } catch ({ stack }) {
    console.log(stack)
  }
})()
```

```fs
- [Table Of Contents](#table-of-contents)
- [CLI](#cli)
  * [`-j`, `--jsdoc`: Add JSDoc](#-j---jsdoc-add-jsdoc)
- [API](#api)
- [Copyright](#copyright)
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/16.svg?sanitize=true"></a></p>

#PRO
Underlined
`Titles`
---

Titles written as blocks and underlined with any number of either `===` (for H1) and `---` (for H2), will be also displayed in the table of contents. However, the actual title will appear on a single line.

```md
#PRO
Underlined
`Titles`
---
```

As seen in the [_Markdown Cheatsheet_](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/17.svg?sanitize=true"></a></p>

## Glossary

- **<a name="online-documentation">Online Documentation</a>**: documentation which is accessible online, such as on a GitHub website, or a language reference, e.g., [Node.js Documentation](https://nodejs.org/api/stream.html).
- **<a name="editor-documentation">Editor Documentation</a>**: hints available to the users of an IDE, or an editor, in form of suggestions and descriptive hints on hover over variables' names.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## TODO

- [ ] Test using `zoroaster`'s masks.
- [ ] Gather all types across the whole documentation first to be able to independently link them even if they are in separate files.
- [x] Replace the source in example with a `require` call in addition to `import` statement.
- [ ] Implement caching.
- [ ] Trigger compilation whenever an embedded example changes.
- [ ] Purge image cache from CLI (e.g., `curl -X https://github.com/artdecocode/documentary/raw/${BRANCH}${PATH}`)
- [ ] Implement JS-based `tree`.
- [ ] Implement a proper logging system without `NODE_DEBUG`.
- [ ] Add more section breaks.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-2.svg?sanitize=true"></a></p>

## Copyright

Section breaks from [FoglihtenDeH0](https://www.1001fonts.com/foglihtendeh0-font.html) font.

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>