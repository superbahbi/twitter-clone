// Editable.js
import React, { useState, useEffect } from "react";
import formurlencoded from "form-urlencoded";
import { IEditableProps } from "../Helper/interface";
// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly

const Editable: React.FC<IEditableProps> = ({
  childRef,
  text,
  name,
  type,
  db,
  placeholder,
  children,
  username,
  token,
}) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }

    if (text && isEditing === false) {
      console.log("Updating user");
      let data = {
        username: username,
        content: text,
        db: db,
        field: name,
      };

      const url = process.env.REACT_APP_API_URL + "/api/profile";
      const request = async () => {
        const putUser = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
          body: formurlencoded(data),
        });
        await putUser.json();
        if (putUser.status === 200) {
          console.log("Saving user to database");
        }
      };
      request();
    }
  }, [isEditing, childRef, name, text]);
  // Event handler while pressing any key while editing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle when key is pressed
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Enter data here"}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;
