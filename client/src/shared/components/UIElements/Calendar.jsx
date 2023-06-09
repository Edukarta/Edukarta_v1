import React, { useState, useEffect } from "react";
import { Delete } from "@mui/icons-material/";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import classes from "./Calendar.module.css";
import Input from "../FormElements/Input";
import Button from "../FormElements/Button";

const Calendar = (props) => {
  const [dateEvent, setDateEvent] = useState(null);
  const [eventDates, setEventDates] = useState([]);
  const [eventText, setEventText] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateChange = (ranges) => {
    if (ranges.selection.startDate !== ranges.selection.endDate) {
      // Empêcher la sélection de plusieurs dates en ne mettant à jour que la startDate
      setSelectedDate({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.startDate,
        key: "selection",
      });
    } else {
      setSelectedDate(ranges.selection);
    }
  };

  console.log(selectedDate);

  const createEvent = async () => {
    if (!eventText || !selectedDate) {
      console.error("Veuillez entrer un texte et une date valides");
      return;
    }

    const eventData = {
      school: props.id,
      text: eventText,
      date: selectedDate.startDate.toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/event/${props.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );
      const savedResponse = await response.json();
      console.log(savedResponse);

      // Faites quelque chose avec la réponse
    } catch (error) {
      console.error(error);
    }

    getEventsBySchoolId();
  };

  const getEventsBySchoolId = async () => {
    try {
      const response = await fetch(
        `https://www.edukarta.com/api/v1/event/${props.id}`,
        {
          method: "GET",
        }
      );
      const savedResponse = await response.json();
      setDateEvent(savedResponse);

      // Faites quelque chose avec la réponse
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEventById = async (eventId) => {
    try {
      const response = await fetch(
        `https://www.edukarta.com/api/v1/event/${eventId}`,
        {
          method: "DELETE",
        }
      );
      const savedResponse = await response.json();
      // Faites quelque chose avec la réponse
    } catch (error) {
      console.error(error);
    }
    getEventsBySchoolId();
  };

  useEffect(() => {
    getEventsBySchoolId();
  }, [selectedDate]);

  return (
    <div className={classes.container_global}>
      <h5>{`${props.school} planning`}</h5>
      <div className={classes.container_calendar}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DateRangePicker
            onChange={handleDateChange}
            ranges={[selectedDate]}
            minDate={new Date()}
            showDateDisplay={false}
            name="date"
          />
        </div>
        <div className={classes.container_event}>
          <Input
            element="textarea"
            type="text"
            name="text"
            placeholder="Add an event"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
          />
          <div className={classes.container_btn_calendar}>
            <Button onClick={createEvent}>Valider</Button>
          </div>
          <div className={classes.container_event_list}>
            {dateEvent &&
              dateEvent.events &&
              dateEvent.events
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((event) => {
                  const selectedDateStr = selectedDate.startDate.toISOString();
                  if (event.date === selectedDateStr) {
                    return (
                      <div key={event.id} className={classes.event_input_item}>
                        <p className={classes.event_text}>
                          <span className={classes.date_bold}>
                            {format(new Date(event.date), "dd/MM/yyyy")} :
                          </span>{" "}
                          {event.text}
                        </p>
                        <div
                          onClick={() => deleteEventById(event.id)}
                          className={classes.delete_btn_event}
                        >
                          <Delete sx={{ color: "crimson" }} />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
