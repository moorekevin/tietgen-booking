import React, { memo, useState } from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";

// Date modules
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import StaticDatePicker from "@material-ui/lab/StaticDatePicker";
import isSameDay from "date-fns/isSameDay";
import addDays from "date-fns/addDays";
import isAfter from "date-fns/isAfter";
import PickersDay, {
  PickersDayProps,
  pickersDayClasses,
} from "@material-ui/lab/PickersDay";

export default memo(function HandleBookingBlock({ selectedBooking }) {
  const [stdBars, setStdBars] = useState(0);
  const handleStdBarsChange = (event) => {
    setStdBars(event.target.value);
  };

  const [mdBar, setMdBar] = useState(0);
  const handleMdBarChange = (event) => {
    setMdBar(event.target.value);
  };

  // Show additional info for
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
              label="Medium bar w/draft beer functionality (fadølsanlæg)"
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
        if (stdBars !== 0 || mdBar !== 0) {
          setStdBars(0);
          setMdBar(0);
        }
        return (
          <div>
            <p>other y</p>
          </div>
        );
      default:
        if (stdBars !== 0 || mdBar !== 0) {
          setStdBars(0);
          setMdBar(0);
        }
        return;
    }
  }

  // Date functionality
  type HighlightedDay = {
    date: Date,
    styles: CSSProperties,
  };
  const styleBookedDay = {
    backgroundColor: "red",
    color: "white",
  };

  // Booked dates list
  const highlightedDays: HighlightedDay[] = [
    {
      date: new Date(2022, 9, 14),
      styles: styleBookedDay,
    },
    {
      date: new Date(2022, 9, 15),
      styles: styleBookedDay,
    },
  ];

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    const matchedStyles = highlightedDays.reduce((a, v) => {
      return isSameDay(date, v.date) ? v.styles : a;
    }, {});

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...matchedStyles,
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "green",
          },
        }}
      />
    );
  };

  function checkIfBookedDay(thisDate) {
    for (const elementDate of highlightedDays) {
      if (isSameDay(thisDate, elementDate.date)) {
        return true;
      }
    }

    return false;
  }

  const [date, newDate] = useState("");
  const setDate = (chosenDate) => {
    newDate(chosenDate);
  };
  function showBookingCalendar() {
    if (stdBars !== 0 || mdBar !== 0) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            disablePast
            displayStaticWrapperAs="desktop"
            value={date}
            shouldDisableDate={(date) => checkIfBookedDay(date)}
            renderDay={renderWeekPickerDay}
            onChange={(chosenDate) => {
              setDate(chosenDate);
              bookDate(chosenDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    }
  }
  const [bookDate, setMdBar] = useState(0);
  const bookDate = (chosenDate) => {
    while (typeof chosenDate !== "undefined") {
      console.log(chosenDate);
      return <ToggleButton value="Book!"> Book</ToggleButton>;
    }
  };

  return (
    <div>
      {supplementalInfoSwitch()} {showBookingCalendar()} {bookDate()}
    </div>
  );
});
