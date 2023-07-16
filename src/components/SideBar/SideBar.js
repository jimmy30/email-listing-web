import { Fragment } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';


import DefaultFolder from './DefaultFolder/DefaultFolder.js'
import CustomFolder from './CustomFolder/CustomFolder.js'
import classes from './SideBar.module.css'

const SideBar = ({activeDefaultFolderHandler, activeCustomFolderHandler, customFolderList, handleCreateFolder, onDragLeave, isDefaultFolder, isMenuOpen}) => {
  
  return <section className={isMenuOpen?classes.sidebarOpen:classes.sidebar}>
    <DefaultFolder 
      activeDefaultFolderHandler={activeDefaultFolderHandler} 
      onDragLeave={onDragLeave}
      isDefaultFolder={isDefaultFolder}
    />
    <CustomFolder 
      activeCustomFolderHandler={activeCustomFolderHandler} 
      customFolderList={customFolderList} 
      handleCreateFolder={handleCreateFolder}
      onDragLeave={onDragLeave}
      isDefaultFolder={isDefaultFolder}
    />
    </section>
  }
    
  export default SideBar