var $ = require('jquery');
exports.markdown = require('marked');
var CodeMirror = require('codemirror');

exports.tweditor = function(textarea_selector) {
  var textarea = $(textarea_selector);
  textarea.wrap('<div class="markdown"></div>');
  var editor = CodeMirror.fromTextArea(textarea[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: "markdown"
  });
  editor.setSize(textarea.width(),textarea.height());

  var html = exports.createHTML(textarea, editor);

  editor.on("change", function(cm, changeObject) {
    exports.convert(cm, html.preview);
  });
  exports.convert(editor, html.preview);

  return editor;
};

exports.convert =  function(cm, preview) {
  preview.html(exports.markdown(cm.getValue()));
};

exports.createHTML = function(textarea, editor) {
  //Build Editor and Preview
  var editarea = textarea.parent();
  editarea.wrap('<div class="tweditor view-mode"></div>');
  var viewer = editarea.parent();
  var preview = $('<div class="html"></div>');
  editarea.after(preview);
  //Build Menu
  var menu =  $('<ul class="tweditorMenu"></ul>');
  for (var button = 0; button < exports.buttons.length; button++) {
    menu.append(
      exports.buttons[button](editor, viewer)
    );
  }

  editarea.before(menu);

  return {
    textarea: textarea,
    editarea: editarea,
    preview: preview,
    menu: menu
  };
}

exports.splitScreenButton = function(editor, viewer) {
  var splitScreenButton = $('<li class="splitScreenButton"><i class="fa fa-expand"></i></li>');
  splitScreenButton.on("click", function() {
    viewer.addClass("fullscreen").removeClass("view-mode").removeClass("edit-mode");
    editor.refresh();
  });
  return splitScreenButton;
};

exports.editButton = function(editor, viewer) {
  var editButton = $('<li class="editModeButton"><i class="fa fa-edit"></i></li>');
  editButton.on("click", function() {
    viewer.removeClass("fullscreen").removeClass("view-mode").addClass("edit-mode");
    editor.refresh();
  });
  return editButton;
};

exports.viewButton = function(editor, viewer) {
  var viewButton = $('<li class="viewModeButton"><i class="fa fa-eye"></i></li>');
  viewButton.on("click", function() {
    viewer.removeClass("fullscreen").addClass("view-mode").removeClass("edit-mode");
    editor.refresh();
  });
  return viewButton;
};

exports.separator = function() {
  return $('<li class="seperator">|</li>');
};

exports.boldButton = function(editor, viewer) {
  var boldButton = $('<li class="editButton"><i class="fa fa-bold"></i></li>');
  boldButton.on("click", function() {
    //remove other markdown
    var newText = editor.getSelection().replace('*', '', 'g');
    //remove spaces in front and back
    newText = editor.getSelection().replace(/\s*$/, '').replace(/^\s*/, '');
    editor.replaceSelection('**'+newText+'**', "end");
    editor.focus();
  });
  return boldButton;
};

exports.italicButton = function(editor, viewer) {
  var italicButton = $('<li class="editButton"><i class="fa fa-italic"></i></li>');
  italicButton.on("click", function() {
    //remove other markdown
    var newText = editor.getSelection().replace('*', '', 'g');
    //remove spaces in front and back
    newText = editor.getSelection().replace(/\s*$/, '').replace(/^\s*/, '');
    editor.replaceSelection('*'+newText+'*', "end");
    editor.focus();
  });
  return italicButton;
};

exports.headerButton = function(editor, viewer) {
  var headerDropDown = $('<select class="headerDropDown">')
  for (var i=1;i<6;i++) { //start at 1, there is no h0
    var val = 'H'+i;
    headerDropDown.append($('<option>').attr('value', i).text(val));
  }
  headerDropDown.on("change", function(e) {
    var headerDepth = parseInt($(e.target).val());
    var headerText = Array(headerDepth+1).join('#');
    var oldtext = editor.getSelection('\n')
      .replace(/\n#*/g, '\n')
      .replace(/^#*/g, '');
    var newtext = '\n' + headerText +
      oldtext.replace(/\n/g, '\n' + headerText) + '\n';
    newtext = newtext
      .replace(/\n#*\s*\n/g, '\n')
      .replace(/^#*\s*\n/g, '\n');
    editor.replaceSelection(newtext);
    editor.focus();
  });
  var headerButton = $('<li class="editButton"></li>');
  headerButton.append(headerDropDown);
  return headerButton;
};

exports.buttons = [
  exports.splitScreenButton,
  exports.editButton,
  exports.viewButton,
  exports.separator,
  exports.boldButton,
  exports.italicButton,
  exports.headerButton,
];
