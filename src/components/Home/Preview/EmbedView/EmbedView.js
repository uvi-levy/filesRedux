import React, { useRef } from "react";

import { Button } from "react-bootstrap";

const EmbedView = ({ copied, setCopied, setEmbedView, embed }) => {

  const textAreaRef = useRef();

  const exportEmbed = () => {
    let target = document.getElementById("embed").innerHTML;
    console.log(target, "@");

    textAreaRef.current.value = target;
    textAreaRef.current.select();
    textAreaRef.current.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setCopied(true);
  };

  return (
    <>
      <div>
        {embed}
        <Button
          style={{ margin: "4px" }}
          variant="warning"
          onClick={exportEmbed}
        >
          copy the file Inside a iFrame tag{" "}
        </Button>
        <div className="container">
          <div className="row">
            <div className="col">
              {copied && <span style={{ color: "#B8860B" }}>copied!</span>}
            </div>
          </div>
          <div className="row">
            <div className="col ">
              <textarea
                className="bubble"
                style={{ width: "100%" }}
                ref={textAreaRef}
              />
              <Button
                style={{ float: "right" }}
                variant="dark"
                onClick={() => {
                  setEmbedView(false);
                  setCopied(false);
                }}
              >
                x
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmbedView;
