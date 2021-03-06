Documentary
===

%NPM: documentary%
![Node.js CI](https://github.com/artdecocode/documentary/workflows/Node.js%20CI/badge.svg)

<a href="https://github.com/artdecocode/documentary"><img src="images/LOGO.svg?sanitize=true" width="150" align="left"></a>

_Documentary_ is a command-line tool to manage documentation of _Node.JS_ packages of any size. Due to the fact that there is usually a lot of manual labour involved in creating and keeping up-to-date a README document, such as copying examples and output they produce, there is a need for software that can help automate the process and focus on what is really important, i.e., documenting features. _Documentary_ serves as a pre-processor of documentation and enhances every area of the task of making available high-quality docs for _Node.JS_ (and other languages) packages for fellow developers.

```sh
yarn add -D documentary
npm i documentary --save-dev
```

%~%

<!-- <details><summary><md2html> -->
For example, these are some pieces of documentation infrastructure made available by _Documentary_:
<!-- </md2html></summary> -->

%EXAMPLE: example/index.md, html%
<!-- </details> -->

All of these features come with just 3 transient dependencies in your `node_modules`:

%TREE ../documentary-test/node_modules -L 1%

%~%

<table>
<tr><td rowspan="2">

## Table Of Contents

%TOC%

</td>
</tr><tr>
<td rowspan="2">

## Wiki

Each feature of _Documentary_ is described on its relevant Wiki page.

- <kbd>⭐️[Key Features](../../wiki/Key-Features)</kbd>: A quick overview of the solutions provided by _Documentary_ for developers to make writing documentation a breeze.
- <kbd>📖[Tables Of Content](../../wiki/Tables-Of-Contents)</kbd>: Creating a navigation menu for the README page.
- <kbd>⚜️[Section Breaks](../../wiki/Section-Breaks)</kbd>: Placing visual separators of sections.
- <kbd>📐[JSON Tables](../../wiki/JSON-Tables)</kbd>: Writing _JSON_ array data to be converted into a Markdown table.
- <kbd>📜[Embed Examples](../../wiki/Embed-Examples)</kbd>: Decoupling examples from documentation by maintaining separate runnable example file.
- <kbd>🍴[Forks (Embed Output)](../../wiki/Forks)</kbd>: Executing examples to show their output, and validating that program works correctly.
- <kbd>🎩[Method Titles](../../wiki/Method-Titles)</kbd>: Documenting methods in a standard way, and provide your own designs.
- <kbd>🎇[JSX Components](../../wiki/JSX-Components)</kbd>: Implementing custom system-wide and project-scoped components.
- <kbd>🤖[Macros](../../wiki/Macros)</kbd>: Constructing patterns to be reused in formation of READMEs.
- <kbd>☀️[Typedefs](../../wiki/Typedefs)</kbd>: Display `@typedef` information in _README_ files by maintaining types externally to _JS_ source.
- <kbd>🎼[Type (Deprecated)](../../wiki/Type-(Deprecated))</kbd>: An older version of typedefs which works as a macro for types.
- <kbd>🥠[Gif Detail](../../wiki/Gif-Detail)</kbd>: Hiding images inside of the `<details>` block.
- <kbd>🖱[API](../../wiki/API)</kbd>: Using _Documentary_'s features from other packages.

</td></tr>
</table>

%~%