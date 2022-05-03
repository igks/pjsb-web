import React from "react";
import { useHistory } from "react-router-dom";
import Youtube from "react-youtube";
import { Typography } from "@mui/material";

const VideoPreview = () => {
  const history = useHistory();
  const content = history.location.state.content;

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
      <Typography gutterBottom variant="h5" component="div">
        {content.title}
      </Typography>
      <Youtube videoId={vId} opts={opts} onReady={onReady} />;
    </div>
  );
};

export default VideoPreview;
