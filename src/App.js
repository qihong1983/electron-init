import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import {
  Link
} from 'react-router';


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const remote = electron.remote;
const Menu = electron.remote.Menu;
const MenuItem = electron.remote.MenuItem;



class App extends Component {


  componentDidMount() {
    this.initMenu();
    this.contextmenuInit();

    console.log(electron.remote);
    console.log(window);
  }

  clickHandle = (img) => {

    ipcRenderer.send('toggle-image', img);

  }

  initMenu = () => {

    const menu = Menu.buildFromTemplate([{
      label: "File",
      submenu: [{
        label: "New Window"
      }, {
        label: "Settings",
        accelerator: "CmdOrCtrl+,",
        click: () => {
          ipcRenderer.send("toggle-settings");
        }
      }, {
        type: "separator"
      }, {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q"
      }]
    }, {
      label: "Edit",
      submenu: [{
        label: "Menu Item 1"
      }, {
        label: "Menu Item 2"
      }, {
        label: "Menu Item 3"
      }]
    }]);
    console.log(Menu);
    Menu.setApplicationMenu(menu);

  }

  contextmenuInit = () => {
    const menu = new Menu();
    menu.append(new MenuItem({
      label: '右键菜单一',
      click() {
        console.log('item 1 clicked')
      }
    }))

    menu.append(new MenuItem({
      label: '右键菜单二',
    }))
    menu.append(new MenuItem({
      type: 'separator'
    }))


    menu.append(new MenuItem({
      label: '右键复选菜单二',
      type: 'checkbox',
      checked: true
    }))

    menu.append(new MenuItem({
      label: '右键复选菜单三',
      type: 'checkbox',
      checked: true
    }))

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu.popup({
        window: remote.getCurrentWindow()
      })
    }, false)
  }

  closeApp() {
    // alert(33);
    ipcRenderer.send('close-main');

  }

  render() {


    // axios.get("https://www.easy-mock.com/mock/5a2dca93e9ee5f7c09d8c6d7/Aaa/tableNoChange?p=1")
    //   .then(response => {
    //     console.log('response');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })



    return (
      <div className="App">
        <header className="App-header">
         
          {this.props.children}
        </header>
        <p>
          <Link to="/">Home</Link>
        </p>
        
      
        
        <p>
          <Link to="/contact">联系我</Link>
        </p>
        <p>
          <Link to="/asdfasdf">找不到的路由</Link>

        </p>

        <p>
          <span onClick={()=> this.closeApp()}>关闭app</span>
        </p>
        <h3>点击图像打开新窗口并传图片</h3>
        {/*<img src={require("./logo.svg")} style={{width:"100px", height:"100px"}}></img>*/}

        <span onClick={() => this.clickHandle("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539074090524&di=82b1b193a2440f6cc4fc6430153d221d&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130605%2F7447430_151725918000_2.jpg")}>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539074090524&di=82b1b193a2440f6cc4fc6430153d221d&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130605%2F7447430_151725918000_2.jpg" style={{width:"100px", height:"100px"}}></img>
        </span>
      </div>
    );
  }
}



export default App;