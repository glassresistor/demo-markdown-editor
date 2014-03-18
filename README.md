#TWEditor

In short TWEditor is a "What You Mean is What You Get" MarkDown editor with live preview and helpful menu.

##Why

Because Wysiwygs are not cool and often get in the way of writers writing.  Intended to be used with marked but work with modifications to the parser and lexer.

##Live Demo
See [here](http://glassresistor.github.io/tweditor/) for a live demo.

##Basic usage

See index.html in the root of the repository.  

###External Libary Requirements:

* Base CodeMirror CSS and js
* CodeMirror Markdown and XML js
* Jquery 2.X
* All of the files in /libs

###Code Examples

```html
<link rel="stylesheet" href="lib/tweditor.css">
<script type="text/javascript" src="lib/tweditor.js"></script>
```

```javascript
tweditor('textarea#markdown');
```

```html
<html>
<textarea id="markdown">
#Header

Paragraph **with bold** text.
</textarea>
```

##TODO

* Improve UX/UI
  * Move menu to above cursor on selection
  * Hide menu like task bar when not hovered
  * Make buttons lineup and improve controls look.
  * Make split screen look like a full window dialog
  * Make edit and view area same size and positioning as original element its bound to.
  * Make it work with both textarea and div with contents.
* Add Missing block elements
  * Blockquotes
  * Bulleted lists
  * Numbered lists
* Add Missing inline elements
  * Bold italic(both selected)
  * Link Dialog
  * Image Dialog
* Highlight Buttons based off of current line/char selection.
* Improve lexer support so that buttons work cleanly.
* Add custom parser to `tweditor(content, option)`

