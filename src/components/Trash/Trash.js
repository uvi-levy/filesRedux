import React, { useState } from 'react'
import EmptyTrashBtn from './EmptyTrashBtn/EmptyTrashBtn';

const Trash = () => {

  const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <EmptyTrashBtn isOpen={ isOpen } setIsOpen={ setIsOpen } />
        </div>
    )
}

export default Trash
