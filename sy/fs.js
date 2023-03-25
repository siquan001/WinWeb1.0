var fs = {
  init: function () {
    if (!localStorage.getItem('fs')) {
      localStorage.setItem('fs', '{}');
    }
  },
  ls: function (folderpath) {
    if (folderpath[folderpath.length - 1] == '/') {
      folderpath = folderpath.substring(0, folderpath.length - 1);
    }
    var splitPath = folderpath.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (typeof storage !== 'object') {
        throw new Error('Your path is not right!\n\tat '+folderpath);
      }
    }
    var logText = [];
    for (item in storage) {
      logText.push(item);
    }
    if (logText.length == 0) {
      return logText;
    } else {
      var hlog=[];
      var _this=this;
      logText.forEach(function(f){
        hlog.push({
          name:f,
          type:_this.getFileType(folderpath+'/'+f)
        })
      })
      return hlog;
    }
  },
  newfile: function (path, filename) {
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    var splitPath = path.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (typeof storage !== 'object') {
        throw new Error('Your path is not right!\n\tat '+path);
      }
    }
    var nstorage = this.getStorage();
    var evalText = 'nstorage';
    for (item of splitPath) {
      if (item != '') evalText += '["' + item + '"]'
    }
    eval(`if(${evalText}["${filename}"]!==undefined){console.log("has same name file/folder here!")}else{${evalText}["${filename}"]=""}`);
    this.setStorage(nstorage);
  },
  newfolder: function (path, foldername) {
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    var splitPath = path.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (typeof storage !== 'object') {
        throw new Error('Your path is not right!\n\tat '+folderpath);
      }
    }
    var nstorage = this.getStorage();
    var evalText = 'nstorage';
    for (item of splitPath) {
      if (item != '') evalText += '["' + item + '"]'
    }
    eval(`if(${evalText}["${foldername}"]!==undefined){console.log("has same name file/folder here!")}else{${evalText}["${foldername}"]={}}`);

    this.setStorage(nstorage);
  },
  rename: function (path, newname) {
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    var splitPath = path.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+path);
      }
    }
    var nstorage = this.getStorage();
    var evalText = 'nstorage';
    for (var i = 0; i < splitPath.length - 2; i++) {
      if (item != '') evalText += '["' + item + '"]'
    }
    var evalText2 = evalText + '["' + splitPath[splitPath.length - 1] + '"]';
    eval(`if(${evalText}["${newname}"]!==undefined){console.log("has same name file/folder here!")}else{${evalText}["${newname}"]=${evalText2};delete ${evalText2}}`);
    this.setStorage(nstorage);
  },
  del: function (path) {
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    var splitPath = path.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+path);
      }
    }
    var nstorage = this.getStorage();
    var evalText = 'nstorage';
    for (var i = 0; i < splitPath.length - 2; i++) {
      if (item != '') evalText += '["' + item + '"]'
    }
    var evalText2 = evalText + '["' + splitPath[splitPath.length - 1] + '"]';
    eval(`delete ${evalText2}`);
    this.setStorage(nstorage);
  },
  copy: function (filepath, copytopath) {

  },
  cut: function (filepath, cuttopath) {

  },
  getType:function(path){
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    var splitPath = path.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+path);
      }
    }
    if(typeof storage=='object'){
      return "folder"
    }else{
      return "file";
    }
  },
  getName:function(path){
    if (path[path.length - 1] == '/') {
      path = path.substring(0, path.length - 1);
    }
    return path.split('/')[path.split('/').length-1];
  },
  getFileType:function(path){
    if(this.getType(path)=='folder') return 'folder';
    var splitname=this.getName(path).split('.');
    if(splitname.length==1){
      return 'unknown file'
    }else{
      return splitname[splitname.length-1];
    }
  },
  readAsText: function (filepath) {
    if (filepath[filepath.length - 1] == '/') {
      filepath = filepath.substring(0, filepath.length - 1);
    }
    var splitPath = filepath.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+filepath);
      }
    }
    if (typeof storage != 'string') {
      throw new Error('Cannot read a folder!\n\tat '+filepath);
    } else {
      console.log(storage);
      return storage;
    }
  },
  writeAsText: function (filepath, write) {
    if (filepath[filepath.length - 1] == '/') {
      filepath = filepath.substring(0, filepath.length - 1);
    }
    var splitPath = filepath.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+filepath);
      }
    }
    if (typeof storage != 'string') {
      throw new Error('Cannot write a folder!\n\tat '+filepath);
    } else {
      var nstorage = this.getStorage();
      var evalText = 'nstorage';
      for (var i = 0; i < splitPath.length - 2; i++) {
        if (item != '') evalText += '["' + item + '"]'
      }
      var evalText2 = evalText + '["' + splitPath[splitPath.length - 1] + '"]';
      eval(`${evalText2}="${write.replaceAll('\n','\\n').replaceAll('\t','\\t').replaceAll('\r','\\r').replaceAll('"','\\"')}"`);
      this.setStorage(nstorage);
    }
  },
  appendAsText: function (filepath, append) {
    if (filepath[filepath.length - 1] == '/') {
      filepath = filepath.substring(0, filepath.length - 1);
    }
    var splitPath = filepath.split('/');
    var storage = this.getStorage();
    for (item of splitPath) {
      if (item != '') storage = storage[item];
      if (storage == undefined) {
        throw new Error('Your path is not right!\n\tat '+filepath);
      }
    }
    if (typeof storage != 'string') {
      throw new Error('Cannot write a folder!\n\tat '+filepath);
    } else {
      var nstorage = this.getStorage();
      var evalText = 'nstorage';
      for (var i = 0; i < splitPath.length - 2; i++) {
        if (item != '') evalText += '["' + item + '"]'
      }
      var evalText2 = evalText + '["' + splitPath[splitPath.length - 1] + '"]';
      eval(`${evalText2}+="${append.replaceAll('\n','\\n').replaceAll('\t','\\t').replaceAll('\r','\\r').replaceAll('"','\\"')}"`);
      this.setStorage(nstorage);
    }
  },
  getStorage: function () {
    return JSON.parse(localStorage.getItem('fs'));
  },
  setStorage: function (obj) {
    localStorage.setItem('fs', JSON.stringify(obj));
  }
}
fs.init();