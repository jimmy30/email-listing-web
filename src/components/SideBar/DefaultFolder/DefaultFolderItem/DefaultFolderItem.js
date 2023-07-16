import classes from './DefaultFolderItem.module.css'

const DefaultFolderItem = ({keyname,Icon, name, selected, onSelectHandler, onDragLeave}) => {
 
  return (
    <li className={`${classes.folder} ${classes.folder,selected?classes.selected:''}`} 
    data-id={keyname}
    onClick={()=>onSelectHandler(keyname)}
                onDragLeave={onDragLeave}

    >
      <div data-id={keyname}><Icon/></div>
      <div data-id={keyname}>{name}</div>
    </li>
    )
  }
    
  export default DefaultFolderItem