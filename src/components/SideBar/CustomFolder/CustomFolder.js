import { useState, useEffect } from 'react';
import { FaFolderPlus } from 'react-icons/fa';

import { flatFolderArrayObject } from '../../../utils/helper.js'
import classes from './CustomFolder.module.css'
import CustomFolderItem from './CustomFolderItem/CustomFolderItem.js'

const CustomFolder = ({activeCustomFolderHandler, togglePopup, customFolderList, handleCreateFolder, onDragLeave, isDefaultFolder}) => {

    const [folderList, setFolderList] = useState([]);

  useEffect(() => {
      const flatArray = flatFolderArrayObject(customFolderList)
      console.log(flatArray)
      setFolderList(flatArray)
  }, [customFolderList])
  
  useEffect(() => {
    let newSetOfArray = folderList
    if(isDefaultFolder)
    {
      newSetOfArray.forEach(a => {
        delete a.selected;
      });
    }
  }, [isDefaultFolder])
  
  const onSelectHandler = (keyname) => {
    const updateFolderList = folderList.map(item => {
        if (item.id === keyname) {
          return {...item, selected:true}
        } else {
          return {...item, selected:false}
        }
      })
  
    setFolderList(updateFolderList)
    activeCustomFolderHandler(keyname)
  }
  
  const defaultFolderList = folderList.map((item, key) => <CustomFolderItem 
      key={key} 
      item={item}
      keyname={item.id} 
      selected={item.selected}
      handleCreateFolder={handleCreateFolder}
      onSelectHandler={onSelectHandler}
      onDragLeave={onDragLeave}
    />)

  
  return <div className={classes.folders}>
    <label>
      <div>Folders</div>
      <div className={classes.addFolderIcon} onClick={()=>handleCreateFolder(null)}><FaFolderPlus/></div>
    </label>
    <div>
    {defaultFolderList}
    </div>
  </div>
  }
    
  export default CustomFolder