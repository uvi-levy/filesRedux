import React, { useState } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";

const Sort = () => {
  const files = useSelector((state) => state.data.tmpFiles);

  const [dataSort, setDataSort] = useState(files);
  const [alphabetSort, setaAphabetSort] = useState([]);
  const [sizeSort, setSizeaSort] = useState([]);

  const [selectedSort, setSelectedSort] = useState("New to old");

  const newToOld = () => {};
  const oldToNew = () => {};
  const a_z = () => {};
  const z_a = () => {};
  const sizeUpToDown = () => {};
  const sizeDownToUp = () => {};

  const sort = [
    {
      name: "New to old",
      handleClick: newToOld,
    },
    {
      name: "Old to new",
      handleClick: oldToNew,
    },
    {
      name: "A-Z",
      handleClick: a_z,
    },
    {
      name: "Z-A",
      handleClick: z_a,
    },
    {
      name: "Size up to down",
      handleClick: sizeUpToDown,
    },
    {
      name: "Size down to up",
      handleClick: sizeDownToUp,
    },
  ];
  return (
    <div>
      <DropdownButton
        className="sort-dropdown"
        alignRight
        title={selectedFolder ? selectedFolder : "Choose folder"}
        id="dropdown-menu-align-right"
        onSelect={saveFolder}
      >
        <Dropdown.Item eventKey="None">None</Dropdown.Item>
        {folders.map(
          (folder) =>
            folder.name && (
              <Dropdown.Item eventKey={folder.name}>
                {folder.name}
              </Dropdown.Item>
            )
        )}
      </DropdownButton>
    </div>
  );
};

export default Sort;
