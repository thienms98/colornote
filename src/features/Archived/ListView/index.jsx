import { useState } from "react";
import { ListAltOutlined, TextSnippetOutlined, Photo } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditForm from "../EditForm";

function ListView({ construct = "Grid", data, setArchivedData, handleDelNote, toolsNote }) {
  const [selected, setSelected] = useState(0);
  const clear = () => setSelected(null);

  return (
    <Box
      sx={{
        minWidth: "250px",
        width: "calc(40% - 250px)",
        height: "80vh",
        overflowY: "scroll",
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
          <>
            <Button 
              
              sx={{
                backgroundColor: `rgba(${item.color.r},${item.color.g},${item.color.b},${item.color.a})`,
                color: "#000",
                padding: "10px 0",
                paddingLeft: "16px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "50px 1fr",
                textAlign: "left",
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
            {item.type === "image" && <img src={item.metaData} alt={item.title} />}
          </>
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
    </Box>
  );
}

export default ListView;
