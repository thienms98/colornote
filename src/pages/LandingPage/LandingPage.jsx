import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// api
import userApi from "../../api/userApi";
import noteApi from "../../api/noteApi";
import { checkJWT } from "../../constants/function";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CloudIcon from "@mui/icons-material/Cloud";
import SellIcon from "@mui/icons-material/Sell";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InfoIcon from "@mui/icons-material/Info";
import AppleIcon from "@mui/icons-material/Apple";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//styles
import classNames from "classnames/bind";
import styles from "./LandingPage.module.scss";
import GuestCreateForm from "../../components/GuestCreateForm";
const cx = classNames.bind(styles);

const diffTime = (lastDate) => {
  const milliseconds = Math.floor(new Date() - new Date(lastDate));

  let sec = Math.floor(milliseconds / 1000);
  let min = Math.floor(sec / 60);
  if (!min) return sec + "seconds ago";
  let hour = Math.floor(min / 60);
  if (!hour) return min + " minutes ago";
  let day = Math.floor(hour / 24);
  if (!day) return hour + " hours ago";
  return day + " days ago";
};

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    userApi.getNewUsers().then((res) => setNewUsers(res.data));
    noteApi.getLastestNotes().then((res) => setNewNotes(res.notes));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentNote((cr) => (cr + 1 >= newNotes.length - 1 ? 0 : cr + 1));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentNote]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("logo")}>
          <Link to='/'>
            <img src='assets/logo_chua_tach_nen.png' alt='Cloudnote' />
            SAMNOTES
          </Link>
        </div>
        <div
          className={cx("toggle", { hidden: menu })}
          onClick={() => {
            setMenu((mn) => !mn);
          }}
        >
          {menu ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={cx("menu", { hidden: !menu })}>
          <div className={cx("item")}>
            <Link to='/home'>Home</Link>
          </div>
          <div className={cx("item")}>Contact Us</div>
          <div className={cx("item")}>Help</div>
          <div className={cx("item")}>Blog</div>
          <div className={cx("item")}>Support Forum</div>
          {checkJWT || (
            <>
              <div className={cx("item", "login")}>
                <Link to='/login'>Log in</Link>
              </div>
              <div className={cx("item", "signup")}>
                <Link to='/register'>Sign up</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={cx("body")}>
        <section>
          <div className={cx("title")}>{"The simplest way to\n keep notes"}</div>
          <div className={cx("text")}>
            {
              "All your notes, synced on all your devices. Get Samnotes now for iOS, Android or in your browser."
            }
          </div>
          <button className={cx("btn")}>
            {checkJWT ? (
              <div onClick={() => setModal(true)}>Create Notes</div>
            ) : (
              <Link to='/register'>Sign up now</Link>
            )}
          </button>
          <div className={cx("lastest")}>
            <div className={cx("col")}>
              <div className={cx("title", "users")}>New Users</div>
              <div className={cx("items")}>
                {newUsers.length &&
                  [...newUsers]
                    .slice(-5)
                    .reverse()
                    .map((user) => (
                      <div className={cx("item")} key={user.id}>
                        <div className={cx("avatar")}>
                          <img src={user.linkAvatar} alt='' width={24} />
                        </div>
                        <div className={cx("detail")}>
                          <div className={cx("name")}>{user.name}</div>
                          <div className={cx("gmail")}>{user.user_name}</div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className={cx("col")}>
              <div className={cx("title", "notes")}>Lastest Public Notes</div>
              <div className={cx("items")}>
                {newNotes.length &&
                  [...newNotes]
                    .slice(-5)
                    .reverse()
                    .map((data, index) => {
                      return (
                        <Note
                          note={data}
                          active={index === currentNote}
                          index={currentNote - index}
                          key={index}
                        />
                      );
                    })}
                <div
                  className={cx("btn", "nxt")}
                  onClick={() =>
                    setCurrentNote((cr) => (cr + 1 >= newNotes.length - 1 ? 0 : cr + 1))
                  }
                >
                  <KeyboardArrowRightIcon />
                </div>
                <div
                  className={cx("btn", "prv")}
                  onClick={() =>
                    setCurrentNote((cr) => (cr - 1 < 0 ? newNotes.length - 2 : cr - 1))
                  }
                >
                  <KeyboardArrowLeftIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={cx("title")}>{"Comprehensive underneath, \nsimple on the surface"}</div>
          <div className={cx("group")}>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <CloudIcon />
                </div>
                <span>Use it everywhere</span>
              </div>
              <div className={cx("content")}>
                Notes stay updated across all your devices, automatically and in real time. There's
                no “sync” button: It just works.
              </div>
            </div>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <SellIcon />
                </div>
                <span>Stay organized</span>
              </div>
              <div className={cx("content")}>
                Add tags to find notes quickly with instant searching.
              </div>
            </div>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <PeopleIcon />
                </div>
                <span>Work together</span>
              </div>
              <div className={cx("content")}>
                Share a to-do list, post some instructions, or publish your notes online.
              </div>
            </div>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <HistoryIcon />
                </div>
                <span>Go back in time</span>
              </div>
              <div className={cx("content")}>
                Notes are backed up with every change, so you can see what you noted last week or
                last month.
              </div>
            </div>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <TextSnippetIcon />
                </div>
                <span>Markdown support</span>
              </div>
              <div className={cx("content")}>
                Write, preview, and publish your notes in Markdown format.
              </div>
            </div>
            <div className={cx("group-item")}>
              <div className={cx("title")}>
                <div className={cx("icon")}>
                  <InfoIcon />
                </div>
                <span>It's free</span>
              </div>
              <div className={cx("content")}>
                Apps, backups, syncing, sharing - it's all completely free.
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={cx("title")}>{"What people are saying"}</div>

          <div className={cx("group")}>
            <div className={cx("item")}>
              <div className={cx("item-container")}>
                <p>If you're not using Simplenote, you're missing out.</p>
                <div className={cx("author")}>TechCrunch</div>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("item-container")}>
                <p>
                  If you're looking for a cross-platform note-taking tool with just enough frills,
                  it's hard to look beyond Simplenote.
                </p>
                <div className={cx("author")}>MacWorld</div>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("item-container")}>
                <p>
                  If you want a truly distraction-free environment then you can't do better than
                  Simplenote for your note-taking needs.
                </p>
                <div className={cx("author")}>Zapier</div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={cx("title")}>{"Available on all your devices"}</div>
          <div className={cx("text")}>
            Download Simplenote for any device and stay in sync - all the time, everywhere.
          </div>
          <div className={cx("downloads")}>
            <a
              href='https://apps.apple.com/us/app/sam-notes-sticky-remind/id6445824669'
              className={cx("item")}
              target='blank'
            >
              <div className={cx("icon")}>
                <AppleIcon />
              </div>
              <div className={cx("text")}>
                <div className={cx("default")}>Download on the</div>
                <div className={cx("brand")}>App Store</div>
              </div>
            </a>
          </div>
        </section>
      </div>

      <div className={cx("footer")}>
        <div className={cx("items")}>
          <div className={cx("item")}>Contact Us</div>
          <div className={cx("item")}>Help</div>
          <div className={cx("item")}>Blog</div>
          <div className={cx("item")}>Developers</div>
          <div className={cx("item")}>Term & Conditions</div>
          <div className={cx("item")}>Privacy</div>
          <div className={cx("item")}>Press</div>
          <div className={cx("item")}>Privacy Notice for California Users</div>
        </div>
        <div className={cx("copy")}>&copy; Automatic</div>
      </div>

      {modal && (
        <div className={cx("modal")}>
          <div className={cx("overlay")} onClick={() => setModal(false)}></div>
          <GuestCreateForm clear={() => setModal(false)} />
        </div>
      )}
    </div>
  );
}

function Note({ note, active, index }) {
  const { r, g, b, a } = note.color;

  return (
    <div
      className={cx("note")}
      style={{
        backgroundColor: `rgba(${r},${g},${b},${a})`,
        "--index": index,
      }}
    >
      <div className={cx("title")}>
        {note.title}
        <span>{diffTime(note.createAt)}</span>
      </div>
      {(note.type === "text" || note.type === "image") && (
        <div className={cx("content")}>{note.data}</div>
      )}
      {note.metaData && (
        <div className={cx("image")}>
          <img src={note.metaData} alt='' />
        </div>
      )}
      {note.type === "checklist" &&
        note.data.map((item) => (
          <div>
            <input type='checkbox' disabled checked={item.status} />
            {item.content}
          </div>
        ))}
    </div>
  );
}
