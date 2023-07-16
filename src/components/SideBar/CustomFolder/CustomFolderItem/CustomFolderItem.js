import { FaFolder, FaFolderPlus} from 'react-icons/fa';
import classes from './CustomFolderItem.module.css'
import {limitString} from '../../../../utils/helper.js'


const CustomFolderItem = ({keyname, item, selected, onSelectHandler, handleCreateFolder, onDragLeave}) => {
  
  return (
      <div 
      className={`${classes.folder} ${selected?classes.selected:''} ${item.level==0?classes.level0:(item.level==1?classes.level1:classes.level2)}`}
        data-id={keyname}
        onClick={()=>onSelectHandler(keyname)}
                    onDragLeave={onDragLeave}
      >
        <div data-id={keyname}><FaFolder /></div>
        <div className={classes.folderName} data-id={keyname}>{limitString(item.name, 20)}</div>
        { (item.level==0 || item.level==1) &&
          <div className={classes.createSubFolder} onClick={()=>handleCreateFolder(item)} alt="Create Sub Folder"><FaFolderPlus /></div>
        }
      </div>
    )
  }
    
  export default CustomFolderItem