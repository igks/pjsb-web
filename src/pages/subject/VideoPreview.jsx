import React from "react";
import { useHistory } from "react-router-dom";
import Youtube from "react-youtube";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";

const VideoPreview = () => {
  const history = useHistory();
  const content = history.location.state.content;
  const levelId = history.location.state.levelId;
  const contentId = history.location.state.contentId;

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (e) => {
    e.target.pauseVideo();
  };

  const vId = content.video_url.split("v=")[1].substring(0, 11);

  return (
    <div>
      <Box my={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push("/subject");
            }}
          >
            Subject
          </Link>
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push("/content", { id: levelId });
            }}
          >
            Level
          </Link>
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push("/content-details", {
                levelId: levelId,
                contentId: contentId,
              });
            }}
          >
            Contents
          </Link>
          <Typography color="textPrimary">Video Preview</Typography>
        </Breadcrumbs>
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        {content.title}
      </Typography>
      <Youtube videoId={vId} opts={opts} onReady={onReady} />;
    </div>
  );
};

export default VideoPreview;
