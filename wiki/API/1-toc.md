## `Toc` Stream

`Toc` is a transform stream which can generate a table of contents for incoming markdown data. For every title that the transform sees, it will push the appropriate level of the table of contents.

### `TocConfig` Type

When creating a new `Toc` instance, it will accept the following configuration object.
%TYPE true
<p name="skipLevelOne" type="boolean">
  <d>Start the table of contents from level 2, i.e., excluding the <code>#</code> title.</d>
  <e>For example, the following code:

```markdown
# Hello World

## Table Of Contents

## Introduction
```

will be compiled to

%FORK-md example/toc2 -s%

when `skipLevelOne` is not set (by default), and to

%FORK-md example/toc2%

when `skipLevelOne` is set to `false`.
  </e>
</p>
%

```## constructor => Toc
[
  ["config?", {
    "skipLevelOne?": ["boolean", "true"]
  }, "TocConfig"]
]
```

Create a new instance of a `Toc` stream.

%EXAMPLE: example/toc, ../src => documentary%

%FORK-md example/toc%

%~%