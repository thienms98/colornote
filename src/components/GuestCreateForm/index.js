import { useState, useEffect } from "react";

import axios from "axios";
import noteApi from "../../api/noteApi";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

import { colorBucket } from "../../constants/color_bucket";
import { useSnackbar } from "notistack";
import { DateTimePicker } from "@mui/x-date-pickers";

import classNames from "classnames/bind";
import styles from "./GuestCreateForm.module.scss";
const cx = classNames.bind(styles);

export default function GuestCreateForm({ clear }) {
  const [showTypes, setShowTypes] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [color, setColor] = useState("color_1");
  const [data, setData] = useState("");
  const [metaData, setMetaData] = useState("");

  const [dueAt, setDueAt] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [lock, setLock] = useState(null);
  const [share, setShare] = useState(null);
  const [notePublic, setNotePublic] = useState(true);
  const [pinned, setPinned] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const createNote = async () => {
    let params = {
      color: colorBucket[color],
      data,
      dueAt,
      lock,
      notePublic: notePublic ? 1 : 0,
      pinned,
      remindAt: reminder,
      share,
      title,
      type,
    };
    if (type === "image") params = { ...params, metaData };
    try {
      const res = await noteApi.createNote(0, params);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const imageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    let imgbb = {};
    if (files.length !== 0) {
      formData.append("image", files[0]);

      imgbb = await axios.post(
        "https://api.imgbb.com/1/upload?key=a07b4b5e0548a50248aecfb194645bac",
        formData
      );
    }
    const url = imgbb?.data.data.url || null;
    setMetaData(url);
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
                  setData(null);
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
          <textarea
            name=''
            tabIndex={2}
            placeholder='Type note here!'
            rows={10}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        )}
        {type === "image" && (
          <>
            <label htmlFor='inputfile'>
              {metaData ? <img src={metaData} alt='' /> : "Select image here"}
            </label>
            <input type='file' id='inputfile' onChange={imageUpload} hidden />
          </>
        )}
        {type === "checklist" && (
          <div className={cx("items")}>
            <Checklist updateData={(checklist) => setData(checklist)} />
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
        <div className={cx("others")}>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <NotificationsActiveIcon />
            </div>
            <div className={cx("name")}>Reminder</div>
            <div className={cx("picker")}>
              <DateTimePicker
                sx={{
                  backgroundColor: "#fff",
                }}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                label='Reminder'
                value={reminder}
                onChange={(newValue) => setReminder(newValue)}
              />
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <ShareIcon />
            </div>
            <div className={cx("name")}>Share</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <LockIcon />
            </div>
            <div className={cx("name")}>Lock</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <CalendarMonthIcon />
            </div>
            <div className={cx("name")}>Due at</div>
            <div className={cx("picker")}>
              <DateTimePicker
                sx={{
                  backgroundColor: "#fff",
                }}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                label='Due at'
                value={dueAt}
                onChange={(newValue) => setDueAt(newValue)}
              />
            </div>
          </div>
          <div className={cx("item")} onClick={() => setNotePublic((prev) => !prev)}>
            <div className={cx("icon")}>{notePublic ? <PublicIcon /> : <PersonIcon />}</div>
            <div className={cx("name")}>{notePublic ? "Public" : "Private"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checklist({ updateData }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    updateData(list);
  }, [list]);

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
