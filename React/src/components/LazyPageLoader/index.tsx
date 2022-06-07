import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

const LazyPageLoader: React.FC<CircularProgressProps> = ({
  color,
  variant,
  value,
}) => {
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      color={color}
      value={value}
      variant={variant}
    />
  );
};

export default LazyPageLoader;
