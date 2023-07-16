import React, { useEffect, useState } from 'react'

import EmailItem from './EmailItem/EmailItem';
import classes from './EmailList.module.css'

const EmailList = ({emailList, handleDragStart, handleDragEnd, handleOnUnarchived, handleOnImportant}) => {

    return (
        <div className={classes.emailList}>
                {emailList.map(({id, folder_key, from, to, subject, is_read, is_important, has_attachment}, key) =>(
                    <EmailItem
                                id={id}
                                key={key}
                                folder_key={folder_key}
                                from={from}
                                to={to}
                                subject={subject}
                                is_read={is_read}
                                is_important={is_important}
                                has_attachment={has_attachment}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                handleOnUnarchived={handleOnUnarchived}
                                handleOnImportant={handleOnImportant}
                        />
                ))}
        </div>
    )
}
export default EmailList