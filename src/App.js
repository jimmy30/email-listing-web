import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { FaBars, FaArrowLeft } from 'react-icons/fa';


import Header from './components/Layout/Header';
import SideBar from './components/SideBar/SideBar';
import EmailList from './components/EmailList/EmailList';
import Popup from './components/Popup/Popup';
import { addIdEmails } from './utils/helper.js'
import './App.css';

const DEFAULT_FOLDERS_LIST = [
  // {
  //   id: 1,
  //   name: 'Sushi',
  //   level: 0,
  //   sub_folders: [{
  //     name: 'Schnitzel',
  //     level: 1,
  //     sub_folders:   [{
  //         name: 'Schnitzel2',
  //         level: 2,
  //       },
  //       {
  //         name: 'Schnitzel3',
  //         level: 2,
  //       }]
  //   }]
  // },
  // {
  //   name: 'Sushi2',
  //   level: 0,
  // },
  // {
  //   name: 'Sushi3',
  //   level: 0,
  //   sub_folders:  [{
  //       name: 'Custom1',
  //       level: 1,
  //     },
  //     {
  //       name: 'Custom2',
  //       level: 1,
  //     }]
  // },
  // {
  //   name: 'Sushi4',
  //   level: 0,
  // },
];

function App() {
  
  const [emailList, setEmails] = useState([]);
  const [isDefaultFolder, setDefaultFolder] = useState(true);
  const [folderEmailList, setFolderEmailList] = useState([]);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [customFolderList, setCustomFolder] = useState(DEFAULT_FOLDERS_LIST);
  const [parentFolder, setParentFolder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [dragToFolderId, setDragToFolderId] = useState(null);
  const [dragEmailId, setDragEmailId] = useState(null);
  const [dragEmailFolderKey, setEmailFolderKey] = useState(null);
  

  
  const fetchEmails = () => {
    
        fetch('data.json')
        .then(response => {
          return response.json();
        }).then(data => {
          setEmails(addIdEmails(data))
          // resolve()
      
        }).catch((e: Error) => {
        });
  
}

useEffect(() => {
    fetchEmails()
}, [])

  useEffect(() => {
      filterFolderEmailList()
  }, [emailList])
  
  const filterFolderEmailList = () => {
    
    const filterEmail = emailList.filter((item)=>{
      return item.folder_key == activeFolder
    })
    
    setFolderEmailList(filterEmail)
  }
  
  useEffect(() => {
    filterFolderEmailList()
  }, [activeFolder])
  
  const activeDefaultFolderHandler = (keyname) => {
    setDefaultFolder(true)
    setActiveFolder(keyname)
  }
  const activeCustomFolderHandler = (keyname) => {
    setDefaultFolder(false)
    setActiveFolder(keyname)
  }
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const handleChange = event => {
    if(event.target.value)
      setIsNameEmpty(false)
    setFolderName(event.target.value);
  };
  
  const handleCreateFolder = item => {

    console.log(item);
    setParentFolder(item)
    togglePopup()
  };

  const handleSubmit = () => {
    
    if(folderName)
    {
      let newFolder =   {
          id: uuid(),
          name: folderName,
          level: 0,
        }
        
      if(!parentFolder)
      {
        setCustomFolder([...customFolderList, newFolder])
      }
      else{
        newFolder.level = parentFolder.level + 1
        if(!parentFolder.sub_folders)
          parentFolder.sub_folders = []
        parentFolder.sub_folders.push(newFolder)
        setCustomFolder([...customFolderList])
      }
      
      setIsOpen(!isOpen);
      setFolderName('')
    }else {
      setIsNameEmpty(true)
    }
  }
  
  const handleDragStart = (e) => {
    // console.log("start drag")
    console.log("drag from===",e.target.dataset.id, e.target.dataset.folderkey);
    setDragEmailId(e.target.dataset.id)
    setEmailFolderKey(e.target.dataset.folderkey)
    
  };
  
  const onDragLeave = (e) => { 
    console.log("drag to===",e.target.dataset.id);
    setDragToFolderId(e.target.dataset.id)
  }
  
  const onDragLeaveElsewhere = (e) => { 
    console.log("drag eleswhere to===",e.target.dataset.id);
    setDragToFolderId(e.target.dataset.id)
  }
  
  const handleDragEnd = (e) => {

    console.log("end drag", dragEmailFolderKey)
    const list = emailList
    const index = emailList.findIndex(email => email.id === dragEmailId);
    console.log("dragToFolderId===", dragToFolderId)
    if(!dragToFolderId) return
    let strDragToFolderId = dragToFolderId.toString()

    if(strDragToFolderId=="archived")
    {
      list[index].ref_folder = dragEmailFolderKey
    }
    list[index].folder_key=strDragToFolderId
    setEmails(list)
    filterFolderEmailList()
    console.log("index===", index)
    
  };
  const handleOnUnarchived = (id) => {
    
    const list = emailList
    const index = emailList.findIndex(email => email.id === id);
    list[index].folder_key = list[index].ref_folder
    setEmails(list)
    filterFolderEmailList()  
  };
  
  const handleOnImportant = (id) => {
    
    const list = emailList
    const index = emailList.findIndex(email => email.id === id);
    list[index].is_important = !list[index].is_important
    setEmails(list)
    filterFolderEmailList()  
  };
  
  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  
  return (
    <div className={"App"} onDragLeave={onDragLeaveElsewhere}>
      <Header/>
      <div className={'Bar'} onClick={onMenuClick}>
      {
        isMenuOpen?
          <FaArrowLeft />
        :
          <FaBars />
      }
      </div>
      <div className="AppBody">
        <SideBar 
          activeDefaultFolderHandler={activeDefaultFolderHandler} 
          activeCustomFolderHandler={activeCustomFolderHandler} 
          customFolderList={customFolderList} 
          handleCreateFolder={handleCreateFolder}
          onDragLeave={onDragLeave}
          isDefaultFolder={isDefaultFolder}
          isMenuOpen={isMenuOpen}
          />
        <EmailList 
          emailList={folderEmailList} 
          handleDragStart={handleDragStart} 
          handleDragEnd={handleDragEnd} 
          handleOnUnarchived={handleOnUnarchived}
          handleOnImportant={handleOnImportant}
          />
      </div>
      {isOpen && <Popup
     content={<>
       <b>Create New Folder</b>
       <p><input name="folder name" onChange={handleChange} placeholder="Folder Name" className="inputField" value={folderName}/></p>
       { isNameEmpty && <p className="errorInput">Field is empty</p> }
       <button onClick={handleSubmit} className="button">Create</button>
     </>}
     handleClose={togglePopup}
   />}
    </div>
  );
}

export default App;
