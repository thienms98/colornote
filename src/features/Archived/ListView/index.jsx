import { useState } from "react";
import { ListAltOutlined, TextSnippetOutlined, Photo } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";

import NoteImage from "../../../components/NoteImage";
import NoteItem from "../../../components/NoteItem";
import NoteItemLock from "../../../components/NoteItemLock";
import ToolsNote from "../../../components/ToolsNote";
import EditForm from "../EditForm";

function ListView({ construct = "Grid", data, setArchivedData, handleDelNote, toolsNote }) {
  const [selected, setSelected] = useState(null);

  const clear = () => setSelected(null);

  return (
    <Box
      sx={{
        minWidth: "250px",
        width: "calc(40% - 250px)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0 20px",
        }}
      >
        {data.map((item, index) => (
          <Button
            sx={{
              backgroundColor: `rgba(${item.color.r},${item.color.g},${item.color.b},${item.color.a})`,
              color: "#000",
              padding: "10px 0",
            }}
            onClick={() => setSelected(index)}
          >
            {item.type === "text" && (
              <ListItemIcon>
                <TextSnippetOutlined fontSize='small' />
              </ListItemIcon>
            )}
            {item.type === "checklist" && (
              <ListItemIcon>
                <ListAltOutlined fontSize='small' />
              </ListItemIcon>
            )}
            {item.type === "image" && (
              <ListItemIcon>
                <Photo fontSize='small' />
              </ListItemIcon>
            )}
            {item.title}
          </Button>
        ))}
      </Box>

      {data[selected] && (
        <EditForm
          key={selected}
          dataItem={data[selected]}
          handleDelNote={handleDelNote}
          setArchivedData={setArchivedData}
          construct={construct}
          clear={clear}
        />
      )}

      {/* <div className={""}>
        {selected || selected === 0 ? (
          data[selected].type !== "screenshot" && (
            <Grid
              key={data[selected].idNote}
              item
              xs={24}
              sm={12}
              md={4}
              lg={construct === "Grid" ? 3 : 4}
            >
              {data[selected].lock ? (
                <>
                  {data[selected]?.flag === true ? (
                    <>
                      {data[selected].type === "image" ? (
                        <NoteImage construct={"Grid"} dataItem={data[selected]} full />
                      ) : (
                        <NoteItem
                          construct={"Grid"}
                          dataItem={data[selected]}
                          setArchivedData={setArchivedData}
                          handleDelNote={handleDelNote}
                          full={true}
                        />
                      )}
                    </>
                  ) : (
                    <NoteItemLock
                      construct={"Grid"}
                      handle={setArchivedData}
                      dataItem={data[selected]}
                    />
                  )}
                </>
              ) : (
                <>
                  {data[selected].type === "image" ? (
                    <NoteImage construct={"Grid"} dataItem={data[selected]} full />
                  ) : (
                    <NoteItem
                      construct={"Grid"}
                      dataItem={data[selected]}
                      setArchivedData={setArchivedData}
                      handleDelNote={handleDelNote}
                      full
                    />
                  )}
                </>
              )}
              <ToolsNote
                handleChangeNote={toolsNote.handleChangeNote}
                handleOptionsNote={toolsNote.handleOptionsNote}
                options={toolsNote.options}
              /> 
            </Grid>
          )
        ) : (
          <div>Nothing was chosen</div>
        )}
      </div> */}
    </Box>
  );
}

export default ListView;
