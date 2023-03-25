if(localStorage.getItem('hello')==undefined){
  localStorage.hello=true;
  initFs();
}
function initFs(){
  var default_fileinit={
    "OS":{
      "regedit":JSON.stringify({
        "user_con":{
          "password":"123456",
          "name":"Administrator",
          "icon":"./img/icon/ui/defAccount.png"
        }
      })
    },
    "Windows":{
      "desk.exe":"{\"main\":\"./lib/desk.js\"}",
      "explorer.exe":"{}",
      "winhome.exe":"{\"main\":\"./lib/winhome.js\"}",
      "winsearch.exe":"{}",
      "apptaskbar.exe":"{}",
      "console.exe":"{}",
      "time.exe":"{}",
      "notice.exe":"{}",
      "regedit.exe":"{\"main\":\"./lib/regedit.js\"}",
      "login.exe":"{\"main\":\"./lib/login.js\"}",
      "settings.exe":"{}",
      "ospower.exe":"{}",
      "notepad.exe":"{}",
      "cmd.exe":"{}"
    },
    "Apps":{
      "Windows":{
        "calculate.exe":"{}",
        "iexplorer.exe":"{}",
        "windowsphoto.exe":"{}",
        "windowsmedia.exe":"{}",
        "windowsfont.exe":"{}",
        "windowsemail.exe":"{}",
      },
      "Microsoft":{
        "Edge":{
          "msedge.exe":"{}"
        },
        "Office":{
          "msoffice.exe":"{}"
        },
        "Store":{
          "msstore.exe":"{}"
        }
      }
    },
    "User":{
      "Desktop":{},
      "Documents":{},
      "Downloads":{},
      "Pictures":{},
      "Favorites":{}
    }
  }
  fs.setStorage(default_fileinit);
}
var AlwaysInitFs=true;
AlwaysInitFs&&initFs();

function loadScript(url,reslove){
  var s=document.createElement('script');
  s.src=url;
  document.body.append(s);
  s.onload=function(){
    s.remove();
    s=null;
    reslove();
  }
}


function startExe(path,re){
  var exeObj=JSON.parse(fs.readAsText(path));
  loadScript(exeObj.main,re);
}

function createElement(tagname,options={},inner=''){
  var c=document.createElement(tagname);
  c.innerHTML=inner;
  for(var k in options){
    c[k]=options[k];
  }
  return c;
}

startExe('/Windows/regedit.exe',function(){
  setTimeout(() => {
    startExe('/Windows/login.exe',function(){});
  }, 3000);
  
});
