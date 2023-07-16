import { v4 as uuid } from 'uuid';

export const flatFolderArrayObject = (array) => {
    var result = [];
    array.forEach(function (a) {
        result.push(a);
        if (Array.isArray(a.sub_folders)) {
            result = result.concat(flatFolderArrayObject(a.sub_folders));
        }
    });
    return result;
}

export const addIdEmails = (array) => {
    return array.map((item)=>({id: uuid() ,...item}))
}

export const limitString = (str, limit) => {
    
  if(str.length > limit)
  {
    return str.substring(0, limit)+'...'
  }
  return str
}