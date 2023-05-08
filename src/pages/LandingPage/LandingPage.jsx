import { useState } from "react";
import { Link } from "react-router-dom";
import { checkJWT } from "../../constants";

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

//styles
import classNames from "classnames/bind";
import styles from "./LandingPage.module.scss";
const cx = classNames.bind(styles);

export default function LandingPage() {
  const [menu, setMenu] = useState(false);

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
          <div className={cx("item", "login")}>
            <Link to='/login'>Log in</Link>
          </div>
          <div className={cx("item", "signup")}>
            <Link to='/register'>Sign up</Link>
          </div>
        </div>
      </div>

      <div className={cx("body")}>
        <section>
          <div className={cx("title")}>{"The simplest way to\n keep notes"}</div>
          <div className={cx("text")}>
            {
              "All your notes, synced on all your devices. Get Simplenote now for iOS, \nAndroid, Mac, Windows, Linux, or in your browser."
            }
          </div>
          <button className={cx("btn")}>{<Link to='/register'>Sign up now</Link>}</button>
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
            {/* <a className={cx("item")} href='https://google.com'>
              <div className={cx("icon")}>
                <AppleIcon />
              </div>
              <div className={cx("text")}>
                <div className={cx("default")}>Download on the</div>
                <div className={cx("brand")}>Mac App Store</div>
              </div>
            </a>
            <a className={cx("item")} href='https://google.com'>
              <div className={cx("icon")}>
                <AppleIcon />
              </div>
              <div className={cx("text")}>
                <div className={cx("default")}>Download on the</div>
                <div className={cx("brand")}>Play Store</div>
              </div>
            </a>
            <a className={cx("item")} href='https://google.com'>
              <div className={cx("icon")}>
                <AppleIcon />
              </div>
              <div className={cx("text")}>
                <div className={cx("default")}>Download on the</div>
                <div className={cx("brand")}>Windows Store</div>
              </div>
            </a>
            <a className={cx("item")} href='https://google.com'>
              <div className={cx("icon")}>
                <AppleIcon />
              </div>
              <div className={cx("text")}>
                <div className={cx("default")}>Download on the</div>
                <div className={cx("brand")}>Linux</div>
              </div>
            </a> */}
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
    </div>
  );
}
