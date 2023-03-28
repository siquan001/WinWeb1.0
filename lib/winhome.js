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
  
  winkey.onclick=function(e){
    e.stopPropagation();
    if(winframe.classList.contains('active')){
      winframe.classList.remove('active')
    }else{
      winframe.classList.add('active');
    }
  }
  document.addEventListener('click',function(e){
    winframe.classList.remove('active')
  });
  winframe.addEventListener('click',function(e){
    e.stopPropagation();
  })

  var winleftbar=createElement('div',{
    className:"winleftbar"
  },'');
  winframe.append(winleftbar);
  var winlbds=[{
    name:"开始",
    iconType:"img",
    icon:regedit.readKey('user_con').icon,
    float:"top",
    clickable:"start"
  },{
    name:"应用程序",
    iconType:"icon",
    icon:'app',
    float:"top",
    clickable:"start"
  },{
    name:"Pins",
    iconType:"icon",
    icon:"pin-angle",
    float:"top",
    clickable:"start"
  }];

  var clickables={

  }
  for(let i=0;i<winlbds.length;i++){
    var cdicon=createElement('div',{
      className:"wintabs "+winlbds[i].float,
    },(function(type,icon){
      if(type=='img'){
        return '<img src="'+icon+'"/>';
      }else{
        return '<i class="bi bi-'+icon+'"></i>';
      }
    }(winlbds[i].iconType,winlbds[i].icon)))

    cdicon.onclick=function(e){
      if(typeof clickables[winlbds[i].clickable]=="function"){
        clickables[winlbds[i].clickable](e);
      }
    }
    winleftbar.append(cdicon);
  }
}();