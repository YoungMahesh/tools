import { useState } from "react";
import DatePicker from "react-datepicker";
import copy from "copy-to-clipboard";

export default function TimeConverter() {
  const [time, setTime] = useState(0);
  const [cDate, setCDate] = useState("");
  const [date, setDate] = useState<null | Date>(new Date());
  const [cTime, setCtime] = useState("");

  const pasteTime = async () => {
    const text = await navigator.clipboard.readText();
    setTime(parseInt(text));
  };
  const dateToSeconds = () => {
    const date1 = date ? date : new Date(0);
    const seconds = Math.floor(date1.getTime() / 1000);
    setCtime(seconds.toString());
  };

  const secondsToDate = () => {
    const date = new Date(time * 1000);
    setCDate(date.toString());
  };
  return (
    <div className="flex w-full flex-wrap justify-around">
      <section className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Convert Unix-time to Calendar-time</h2>
          <input
            type="number"
            placeholder="Unix Time in seconds"
            className="input-bordered input w-full max-w-xs"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
          />
          <div className="card-actions justify-end">
            <button onClick={pasteTime} className="btn-outline btn-primary btn">
              Paste
            </button>
            <button onClick={secondsToDate} className="btn-primary btn">
              Convert
            </button>
          </div>
          <p>{cDate}</p>
        </div>
      </section>

      <section className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Convert Calendar-time to Unix-Time</h2>
          <DatePicker
            showTimeSelect
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            showYearDropdown
          />
          <div className="card-actions justify-end">
            <button onClick={dateToSeconds} className="btn-primary btn">
              Convert
            </button>
          </div>
          {cTime.length ? (
            <div className="flex flex-wrap items-center">
              <p>{cTime}</p>
              <button
                onClick={() => {
                  copy(cTime);
                }}
                className="btn-outline btn-primary btn"
              >
                Copy
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
