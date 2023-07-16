import React, { useEffect, useState } from 'react'

import { FaInbox, FaRegPaperPlane, FaFirstdraft, FaArchive } from 'react-icons/fa';

import DefaultFolderItem from './DefaultFolderItem/DefaultFolderItem.js'

import classes from './DefaultFolder.module.css'

const DEFAULT_FOLDERS_LIST = [
  {
    name: 'Inbox',
    key: 'inbox',
    icon: FaInbox,
    selected: true
  },
  {
    name: 'Sent',
    key: 'sent',
    icon: FaRegPaperPlane
  },
  {
    name: 'Draft',
    key: 'draft',
    icon: FaFirstdraft,
  },
  {
    name: 'Archived',
    key: 'archived',
    icon: FaArchive
  },
];


const DefaultFolder = ({activeDefaultFolderHandler, onDragLeave, isDefaultFolder}) => {
  
  const [folderList, setFolderList] = useState(DEFAULT_FOLDERS_LIST);

  useEffect(() => {
    let newSetOfArray = folderList
    if(!isDefaultFolder)
    {
      newSetOfArray.forEach(a => {
        delete a.selected;
      });
    }
  }, [isDefaultFolder])

  const onSelectHandler = (keyname) => {
    
    const updateFolderList = folderList.map(item => {
        if (item.key === keyname) {
          return {...item, selected:true}
        } else {
          return {...item, selected:false}
        }
      })
    
    setFolderList(updateFolderList)
    activeDefaultFolderHandler(keyname)
  }
  
  const defaultFolderList = folderList.map((item, key) => <DefaultFolderItem 
      key={key} 
      keyname={item.key} 
      Icon={item.icon} 
      name={item.name} 
      selected={item.selected} 
      onSelectHandler={onSelectHandler}
      onDragLeave={onDragLeave}
    />)
  
  
  return <div className={classes.defaultFolder}>
          <ul>
            {defaultFolderList}
          </ul>
        </div>
    }
  export default DefaultFolder