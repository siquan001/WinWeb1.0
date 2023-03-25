!function(){
  var winkey=createElement('div',{
    className:"left winkey",
    id:"winkey"
  },`<i class="bi bi-windows"></i>`)

  toolbar.append(winkey);

  var winframe=createElement('div',{
    className:"qframe winframe",
    id:"winframe"
  },'')

  document.getElementById('desk').append(winframe);
  
  winkey.onclick=function(){
    if(winframe.classList.contains('active')){
      winframe.classList.remove('active')
    }else{
      winframe.classList.add('active');
    }
    
  }
}();