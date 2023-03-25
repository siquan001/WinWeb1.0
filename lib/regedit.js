var regedit={
  addKey(key,value){
    if(typeof value =='object'&&value){
      var q=this.getAll();
      q[key]=value;
      this.setAll(q);
    }else{
      throw new TypeError('"value" is must be a object!');
    }
  },
  removeKey(key){
    var q=this.getAll();
    delete q[key];
    this.setAll(q);
  },
  readKey(key){
    var q=this.getAll();
    return q[key];
  },
  getAll(){
    return JSON.parse(fs.readAsText('/OS/regedit'));
  },
  setAll(obj){
    fs.writeAsText('/OS/regedit',JSON.stringify(obj));
  }
}