import React, { memo, useState } from "react";
import TextField from "@mui/material/TextField";

export default memo(function HandleBookingBlock({ selectedBooking }) {
  const [stdBars, setStdBars] = useState(0);
  const handleStdBarsChange = (event) => {
    setStdBars(event.target.value);
  };

  const [mdBar, setMdBar] = useState(0);
  const handleMdBarChange = (event) => {
    setMdBar(event.target.value);
  };

  function supplementalInfoSwitch() {
    switch (selectedBooking) {
      case "bars":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h4> Choose type and amount of bars </h4>
            <TextField
              style={{ width: "25vw", marginBottom: "10px" }}
              label="Standard bars"
              value={stdBars}
              select
              SelectProps={{ native: true }}
              helperText="Info: Fits exactly kitchen sides"
              onChange={handleStdBarsChange}
            >
              <option>{0}</option>
              <option>{1}</option>
              <option>{2}</option>
            </TextField>
            <TextField
              style={{ width: "25vw", marginTop: "20px" }}
              label="Medium bar w/fadølsanlæg"
              value={mdBar}
              select
              helperText="Info: Only for special events"
              SelectProps={{ native: true }}
              onChange={handleMdBarChange}
            >
              <option>{0}</option>
              <option>{1}</option>
            </TextField>
          </div>
        );
      case "other":
        return <p>other y</p>;
    }
  }

  return <div>{supplementalInfoSwitch()}</div>;
});
