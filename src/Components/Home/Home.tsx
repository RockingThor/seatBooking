import { useEffect, useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const seatArrangements = {
    A: [1, 2, 3, 4, 5, 6, 7],
    B: [1, 2, 3, 4, 5, 6, 7],
    C: [1, 2, 3, 4, 5, 6, 7],
    D: [1, 2, 3, 4, 5, 6, 7],
    E: [1, 2, 3, 4, 5, 6, 7],
    F: [1, 2, 3, 4, 5, 6, 7],
    G: [1, 2, 3, 4, 5, 6, 7],
    H: [1, 2, 3, 4, 5, 6, 7],
    I: [1, 2, 3, 4, 5, 6, 7],
    J: [1, 2, 3, 4, 5, 6, 7],
    K: [1, 2, 3, 4, 5, 6, 7],
    L: [1, 2],
  };
  const [seatToBook, setSeatToBook] = useState(1);
  const [booked, setBooked] = useState({});
  const [selected, setSelected] = useState({});
  const [available, setAvaiable] = useState(80);
  const [useLayout, setUseLayout] = useState("Yes");
  const [seatArray, setSeatArray] = useState([1]);

  const handleUseLayout = (event) => {
    if (event.target.value === "Yes") {
      setUseLayout("Yes");
    } else {
      setUseLayout("No");
    }
  };

  const handleSeatToBookChangeEvent = (event: {
    target: { value: string };
  }) => {
    const selectedSeats = parseInt(event.target.value, 10);
    setSeatToBook(selectedSeats);
    let arr = [];
    for (let i = 1; i <= selectedSeats; i++) {
      arr.push(i);
    }
    setSeatArray(arr);
  };

  const checkExceedLimit = () => {
    let count = 0;
    Object.keys(selected).forEach((key) => {
      selected[key].map((value) => count++);
    });
    console.log(count, seatToBook);
    if (count >= seatToBook) {
      toast.warn(
        `You can select maximum upto ${
          seatToBook <= available ? seatToBook : available
        } seat`
      );
      return true;
    }
    return false;
  };

  const onClickSelects = (key, value) => {
    if (useLayout === "No") {
      toast.error("Please select 'Yes' to use layout");
      return;
    }
    if (!selected) {
      const newSelected = { key: [value] };
      setSelected(newSelected);
    } else {
      let found = false;
      Object.keys(selected).forEach((k) => {
        if (k === key) {
          selected[key].map((item, index) => {
            if (item === value) {
              const newSelected = selected;
              newSelected[key].splice(index, 1);
              setSelected(newSelected);
              found = true;
              document.getElementById(`${key} ${value}`).className =
                "available seatNumber";
            }
          });
        }
      });
      if (!found) {
        if (!selected[key]) {
          if (checkExceedLimit()) {
            return;
          }
          const newSelected = selected;
          newSelected[key] = [value];
          setSelected(newSelected);
          document.getElementById(`${key} ${value}`).className =
            " seatNumber selected";
        } else {
          if (checkExceedLimit()) {
            return;
          }
          const newSelected = selected;
          newSelected[key] = [...newSelected[key], value];
          setSelected(newSelected);
          document.getElementById(`${key} ${value}`).className =
            " seatNumber selected";
        }
      }
    }
  };

  return (
    <div className="container book-my-seat">
      <header>Book Train Seat</header>

      <div className="row">
        <div className="col-md-7">
          <div className="container input-card">
            <div className="row">
              <p>How many seats?</p>
              <select
                id="seats-quantity"
                value={seatToBook}
                onChange={handleSeatToBookChangeEvent}
                className="select-option"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
              <p>Do you want to select your own seat from the layout?</p>
              <select
                id="layout-usage"
                value={useLayout}
                onChange={handleUseLayout}
                className="select-option"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
              {useLayout === "No" && (
                <div className="noLayout">
                  <p>
                    **Please Note: You are not using the layout to book the
                    seats. You will get random allocation of your seats although
                    we will try our best to allocate the seats as near as
                    possible
                  </p>
                </div>
              )}
              <div className="form">
                <form className="in-form">
                  {seatArray.map((item, index) => (
                    <div className="row">
                      <div className="form-group col-md-3">
                        <label htmlFor="name">Name:</label>
                        <input type="text" />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="name">Age: </label>
                        <input type="text" />
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="table-responsive">
            <h2 className="text-right">Select Seats</h2>
            <hr />
            Seats left: <span id="seats-left"></span>
            <table id="seats-table" className="table" style={{ width: "auto" }}>
              {Object.keys(seatArrangements).map((row) => (
                <tr className="row" key={row}>
                  <td className="seat-row">
                    <span>{row}</span>
                    <div className="seat">
                      {seatArrangements[row].map((key) => (
                        <a
                          id={`${row} ${key}`}
                          className="available seatNumber"
                          onClick={() => onClickSelects(row, key)}
                        >
                          {key}
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </table>
            <a>
              <button className="cta proceed">Finish</button>
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
