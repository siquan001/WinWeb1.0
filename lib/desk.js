!function(){
  document.getElementById('login-frame').remove();
  var deskf=createElement('div',{
    className:"desk",
    id:"desk"
  },'');
  document.body.append(deskf);
  
  window.desktop=createElement('div',{
    className:"desktop",
    id:"desktop"
  },'');

  deskf.append(desktop);

  window.toolbar=createElement('div',{
    className:"toolbar",
    id:"toolbar"
  },'');

  deskf.append(toolbar);

  startExe('/Windows/winhome.exe',()=>{});
}();