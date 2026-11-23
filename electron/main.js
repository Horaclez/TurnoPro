const {app,BrowserWindow,Menu,dialog}=require('electron');
const path=require('path');
if(!app.requestSingleInstanceLock())app.quit();
let win;
function create(){
  win=new BrowserWindow({width:1280,height:850,minWidth:380,minHeight:600,backgroundColor:'#eef4f4',title:'TurnoPro EU',autoHideMenuBar:true,
    icon:path.join(__dirname,'..','build','icon.png'),
    webPreferences:{contextIsolation:true,nodeIntegration:false,sandbox:true}});
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'Editar',submenu:[{role:'undo'},{role:'redo'},{type:'separator'},{role:'cut'},{role:'copy'},{role:'paste'},{role:'selectAll'}]},
    {label:'Ver',submenu:[{role:'reload'},{role:'togglefullscreen'},{role:'zoomIn'},{role:'zoomOut'},{role:'resetZoom'}]}]));
  win.webContents.session.on('will-download',(e,item)=>{
    const p=dialog.showSaveDialogSync(win,{defaultPath:item.getFilename()});
    if(p)item.setSavePath(p);else item.cancel();
  });
  win.loadFile(path.join(__dirname,'..','www','index.html'));
  win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  win.webContents.on('will-navigate',e=>e.preventDefault());
}
app.whenReady().then(create);
app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
