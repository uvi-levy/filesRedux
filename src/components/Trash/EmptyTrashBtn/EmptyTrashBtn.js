import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EmptyTrashPopup from "../EmptyTrashPopup/EmptyTrashPopup";

import "./emptyTrashBtn.css";

const EmptyTrashBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button className="empty-trash-btn" onClick={() => setIsOpen(true)}>
        Empty trash
      </Button>
      <EmptyTrashPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default EmptyTrashBtn;
