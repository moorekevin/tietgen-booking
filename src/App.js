import "./App.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

// Blocks
import BookingBlock from "./HandleBookingBlock";

function App() {
  const [booking, setBooking] = useState("");

  const handleBooking = (event, newBooking) => {
    setBooking(newBooking);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>🍻Tietgen Bar Committee🍻</h1>
        <h2> What would you like to book?</h2>
        <ToggleButtonGroup
          color="primary"
          exclusive
          onChange={handleBooking}
          value={booking}
        >
          <ToggleButton value="bars"> Bars</ToggleButton>
          <ToggleButton value="soundboks" disabled>
            Soundboks 🔊
          </ToggleButton>
          <ToggleButton value="other"> Other </ToggleButton>
        </ToggleButtonGroup>
        <div style={{ marginTop: "24px" }}>
          {/* Her skal næste booking del være afhængig af hvad man vælger */}
          <BookingBlock selectedBooking={booking} />
        </div>
      </div>
    </div>
  );
}

export default App;
