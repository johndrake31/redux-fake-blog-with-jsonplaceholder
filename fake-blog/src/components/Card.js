import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";


// TODO: ADD USER NAME TO POSTS AND DISPLAY IT
export const CustomCard = ({ post }) => {
  const { title, body, userId, id, date } = post;
  const auth = useSelector((state) => state.auth.login);
  const authUserId = useSelector((state) => state.auth.user[0].id);
  const history = useHistory();


  const navToEditPostHandler = () => {
    if (auth && authUserId === userId) {
      history.push("/edit-posts/" + id);
    }
  };

  return (
    <Card
      key={id}
      sx={{
        margin: 2,
        padding: 2,
        backgroundColor: "#333333",
        color: "white",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
            flexDirection: "column",
        }}
      >
       {auth && +authUserId === +userId && <EditIcon onClick={navToEditPostHandler} sx={{
            alignSelf: 'flex-end',
            marginLeft: 'auto',
            cursor: 'pointer',
        }} />}
        <Typography variant="h4" sx={{ marginBottom: 5 }}>
          {title}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <br />
        {date && <Typography variant="caption">{format(new Date(date), "EE MM/yyyy")}</Typography>}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
