var tweditor = function(textarea_selector) {
  //Build Editor and Preview
  var textarea = $(textarea_selector);
  textarea.wrap('<div class="markdown"></div>');
  var editarea = textarea.parent();
  editarea.wrap('<div class="tweditor view-mode"></div>');
  var viewer = editarea.parent();
  var preview = $('<div class="html"></div>');
  editarea.after(preview);
  //Build Menu
  var menu = $('<ul class="tweditorMenu"></ul>');
  var splitScreenButton = $('<li><i class="fa fa-expand"></i></li>');
  menu.append(splitScreenButton);
  var editButton = $('<li><i class="fa fa-edit"></i></li>');
  menu.append(editButton);
  var viewButton = $('<li><i class="fa fa-eye"></i></li>');
  menu.append(viewButton);
  editarea.before(menu);
  editor = CodeMirror.fromTextArea(textarea.get(0), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "markdown"
  });
  var convert = function(cm) { 
    preview.html(marked(cm.getValue()));
  }
  editor.on("change", function(cm, changeObject) {
    convert(cm)
  });
  convert(editor);
  splitScreenButton.on("click", function() {
    console.log('split screen');
    viewer.addClass("fullscreen").removeClass("view-mode").removeClass("edit-mode");  
    editor.refresh(); //not documented
  });
  editButton.on("click", function() {
    console.log('edit');
    viewer.removeClass("fullscreen").removeClass("view-mode").addClass("edit-mode");  
    editor.refresh(); //not documented
  });
  viewButton.on("click", function() {
    console.log('edit');
    viewer.removeClass("fullscreen").addClass("view-mode").viewClass("edit-mode");  
    editor.refresh(); //not documented
  });
}


