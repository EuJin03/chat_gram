import { Popup } from "semantic-ui-react";
import React from "react";

function MyPopup({ content, children }) {
  return <Popup content={content} trigger={children} wide size="tiny" />;
}

export default MyPopup;
