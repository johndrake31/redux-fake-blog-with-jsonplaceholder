import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const CustomCard = ({ post }) => {
  const { title, body, userId, id } = post;
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
        <Typography>{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
