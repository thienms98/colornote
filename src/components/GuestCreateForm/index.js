import { useState } from "react";
import { colorBucket } from "../../constants/color_bucket";
import noteApi from "../../api/noteApi";

import classNames from "classnames/bind";
import styles from "./GuestCreateForm.module.scss";
const cx = classNames.bind(styles);

export default function GuestCreateForm({ clear }) {
  const [showTypes, setShowTypes] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [color, setColor] = useState("color_1");
  const [data, setdata] = useState();

  const [dueAt, setdueAt] = useState(null);
  const [notePublic, setNotePublic] = useState(true);
  const [reminder, setReminder] = useState(null);
  const [lock, setLock] = useState(null);

  const createNote = () => {
    const params = { color: colorBucket[color], dueAt, notePublic, reminder, lock, title, type };
    console.log(params);
    // noteApi.createNote(0, )
  };

  return (
    <div
      className={cx("wrapper")}
      style={{
        backgroundColor: `rgba(${colorBucket[color].r},${colorBucket[color].g},${colorBucket[color].b},${colorBucket[color].a})`,
      }}
    >
      <div className={cx("overlay")}></div>
      <div className={cx("close-btn")} onClick={clear}>
        &times;
      </div>
      <div className={cx("type")}>
        <div className={cx("title")} onClick={() => setShowTypes((sh) => !sh)}>
          {type[0].toUpperCase()}
          {type.slice(1)}
        </div>
        <div className={cx("type-items")}>
          {showTypes &&
            ["Text", "Checklist", "Image"].map((item, index) => (
              <div
                className={cx("item", { chosen: type === item.toLowerCase() })}
                key={index}
                onClick={() => {
                  setType(item.toLowerCase());
                  setShowTypes(false);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
      <div className={cx("title")}>
        <input
          type='text'
          tabIndex={1}
          placeholder="Note's title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={cx("content")}>
        {(type === "text" || type === "image") && (
          <textarea name='' tabIndex={2} placeholder='Type note here!' rows={10}></textarea>
        )}
        {type === "image" && <input type='file' name='' id='' />}
        {type === "checklist" && (
          <div className={cx("items")}>
            <Checklist />
          </div>
        )}
      </div>
      <button tabIndex={3} onClick={createNote}>
        Create
      </button>

      <div className={cx("options")}>
        <div className={cx("colors")}>
          {Object.keys(colorBucket).map((key, index) => {
            const { r, g, b, a } = colorBucket[key];
            return (
              <div
                className={cx("color", { selected: color === key })}
                style={{ "--bgc": `rgba(${r},${g},${b},${a})` }}
                onClick={() => setColor(key)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Checklist() {
  const [list, setList] = useState([]);

  const addEmptyItem = () => {
    setList([...list, { content: "", status: false }]);
  };
  const updateText = (value, index) => {
    const newList = [...list];
    newList[index].content = value;
    setList(newList);
  };
  const updateStatus = (index) => {
    const newList = [...list];
    newList[index].status = !newList[index].status;
    setList(newList);
  };
  const removeItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <div className={cx("checklist")}>
      {list.length > 0 &&
        list.map((item, index) => {
          return (
            <div className={cx("item")}>
              <input type='checkbox' checked={item.status} onChange={() => updateStatus(index)} />
              <input
                type='text'
                onChange={(e) => {
                  updateText(e.target.value, index);
                }}
              />
              <div className={cx("remove")} onClick={() => removeItem(index)}>
                &times;
              </div>
            </div>
          );
        })}
      <div className={cx("create-btn")} onClick={addEmptyItem}>
        + Add task
      </div>
    </div>
  );
}
