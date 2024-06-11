import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

const style = {
  py: 0,
  width: "100%",
  borderRadius: 1,
  border: "1px solid",
  borderColor: "divider",
};

const CustomDivider: React.FC = () => {
  return (
    <List sx={style}>
      <Divider variant="middle" component="li" />
    </List>
  );
};

export default CustomDivider;
