!function () {
  document.querySelector(".start").remove();
  var user_con=regedit.readKey('user_con');
  var loginc = createElement('div', {
    className: "login-frame",
    id: "login-frame"
  })

  document.body.append(loginc);

  var bgcover = createElement('div',{
    className: "login-bg-cover"
  })

  loginc.append(bgcover);

  var loginf= createElement('div',{
    className: "login-form"
  },`<img id="user-img" src="${user_con.icon}">
  <p id="user-title">${user_con.name}</p>`);

  var cuinput=createElement('div',{
    className:"cu-input"
  },`<input type="password" id="winpassword" placeholder="请输入密码"/><span class="underline"></span>`)

  var cubtn=createElement('button',{
    className:"cu-btn",
  }, `<i class="bi bi-arrow-right"></i>`)

  var winloading=createElement('div',{
    className:"win10-loading"
  },`<i><span></span><span></span><span></span><span></span><span></span><span></span></i>`);

  var mmcw=createElement('div',{
    className:"password-w"
  }, `<p>密码错误，请<a href="javascript:;">重试</a></p>`)
  loginc.append(loginf);
  if(user_con.password){
    function inframe(){
      loginf.append(cuinput);
      loginf.append(cubtn);
      var inputthis=cuinput.querySelector('input');
      inputthis.focus();
      inputthis.onkeydown=function(e){
        if(e.key=="Enter"){
          e.preventDefault();
          refiy(this.value);
        }
      }
      cubtn.onclick=function(){
        refiy(inputthis.value);
      }
    }
    
    function refiy(pass){
      cuinput.remove();
      cubtn.remove();
      loginf.append(winloading)
      if(pass==user_con.password){
        startExe('/Windows/desk.exe',()=>{})
      }else{
        setTimeout(() => {
          winloading.remove();
          loginf.append(mmcw);
          mmcw.querySelector('a').onclick=function(){
            mmcw.remove();
            inframe();
          }
        }, 5000);
      }
    }
    inframe();
  }else{
    loginf.append(winloading)
    startExe('/Windows/desk.exe',()=>{})
  }
  
}();
