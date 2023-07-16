import React, {useState, useEffect}from 'react';
import { FaBookmark, FaRegBookmark, FaRedoAlt, FaPaperclip } from 'react-icons/fa';
import classes from './EmailItem.module.css'
import {limitString} from '../../../utils/helper.js'


const EmailItem = ({id, folder_key,from, to, subject, is_read, is_important, has_attachment, handleDragStart, handleDragEnd, handleOnUnarchived, handleOnImportant}, key) => {

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
 
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
   
  useEffect(() => {
    window.addEventListener('resize', setDimension);
     
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
    return (
        <div data-id={id} data-folderkey={folder_key} className={is_read?classes.emailRowRead:classes.emailRow}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        >
            <div className={classes.emailRowImportant} onClick={()=>handleOnImportant(id)}>
                  {
                    is_important?
                    <FaBookmark size={20}/>
                    :
                    <FaRegBookmark size={20}/>
                  }
            </div>
            <div className={classes.emailRowFrom}>
                {limitString(from, (screenSize.dynamicWidth/71))}
                
  
            </div>
            <div className={classes.emailRowTo}>
                {limitString(to, (screenSize.dynamicWidth/71))}
            </div>
            <div className={classes.emailRowSubject}>
                {limitString(subject, (screenSize.dynamicWidth/22))}
            </div>
            { has_attachment && 
              <div className={classes.attachIcon}>
                  <FaPaperclip/>
              </div>
            }
            { folder_key=="archived" && 
              <div onClick={()=>handleOnUnarchived(id)}  className={classes.unarchived}>
                  <FaRedoAlt/>
              </div>
            }
        </div>
    )
}
export default EmailItem;