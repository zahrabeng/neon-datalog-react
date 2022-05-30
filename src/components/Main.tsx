import Header from "./Header";
import { useState, useEffect } from "react";
import profitCalc from "../utils/profitCalc";
import axios from "axios";
import resultData from "./Interfaces";
import showPlaceholder from "../utils/showPlaceholder";
import emptyData from "../utils/emptyData";

export default function Main(): JSX.Element {
  const [values, setValues] = useState(emptyData);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [allData, setAllData] = useState<resultData[]>([]);
  const [edited, setEdited] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const herokudb = "https://neon-flex-db.herokuapp.com/";

  useEffect(() => {
    async function handleGetAll() {
      const result = await axios.get(herokudb);
      setAllData(result.data);
    }
    handleGetAll();
  }, [submitted, edited]);

  async function handleSubmit() {
    setSubmitted((prev) => !prev);
    await axios.post(herokudb + "data", {
      title: values.title,
      date: values.date,
      led: values.led,
      plexi: values.plexi,
      cut: values.cut,
      transfeu: values.transfeu,
      paid: values.paid,
      profit: profit,
    });
    setValues(emptyData);
  }

  async function handleEdit(id: number) {
    if (edited === false) {
      setEdited((prev) => !prev);
    }
    const postToEdit = allData.find((data) => data.id === id);
    if (postToEdit) {
      setValues(postToEdit);
    }
  }

  async function handleSubmitEdit() {
    setEdited((prev) => !prev);
    setValues(emptyData);
    axios.put(herokudb + "data/" + id, {
      title: values.title,
      date: values.date,
      led: values.led,
      plexi: values.plexi,
      cut: values.cut,
      transfeu: values.transfeu,
      paid: values.paid,
      profit: profit,
    });
  }

  function areCostsFilled(): boolean {
    if (
      values.cut !== 0 &&
      values.led !== 0 &&
      values.transfeu !== 0 &&
      values.plexi !== 0 &&
      values.paid !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  const profit = profitCalc(
    values.led,
    values.plexi,
    values.cut,
    values.transfeu,
    values.paid
  );

  console.log(profit);

  console.log(values);

  return (
    <>
      <Header />
      <form className="form-container">
        <input
          className="form-field"
          placeholder="Title"
          value={values.title}
          name="title"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        ></input>
        <input
          className="form-field"
          placeholder="DD/MM/YYYY"
          value={values.date}
          name="date"
          onChange={(e) => setValues({ ...values, date: e.target.value })}
        ></input>
        <input
          className="form-field"
          placeholder="LED Price"
          value={showPlaceholder(values.led)}
          name="led"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, led: parseInt(e.target.value) })
          }
        ></input>
        <input
          className="form-field"
          placeholder="Plexi Price"
          value={showPlaceholder(values.plexi)}
          name="plexi"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, plexi: parseInt(e.target.value) })
          }
        ></input>
        <input
          className="form-field"
          placeholder="Cut Price"
          value={showPlaceholder(values.cut)}
          name="cut"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, cut: parseInt(e.target.value) })
          }
        ></input>
        <input
          className="form-field"
          placeholder="Transfeu"
          value={showPlaceholder(values.transfeu)}
          name="transfeu"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, transfeu: parseInt(e.target.value) })
          }
        ></input>
        <input
          className="form-field"
          placeholder="Paid"
          value={showPlaceholder(values.paid)}
          name="paid"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, paid: parseInt(e.target.value) })
          }
        ></input>
        <input
          className="form-field"
          placeholder="Profit"
          name="profit"
          value={areCostsFilled() ? profit : ""}
        ></input>
      </form>
      {edited ? (
        <button onClick={() => handleSubmitEdit()} className="submit-button">
          Submit Edit
        </button>
      ) : (
        <button onClick={() => handleSubmit()} className="submit-button">
          Submit
        </button>
      )}
      <div className="all-data-container">
        <div className="testing">
          {allData.map((data) => (
            <div key={data.id}>
              <table>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Led</th>
                  <th>Plexi</th>
                  <th>Cut</th>
                  <th>Transfeu</th>
                  <th>Paid</th>
                  <th>Profit</th>
                </tr>
                <tr>
                  <td>{data.title}</td>
                  <td>{data.date}</td>
                  <td>{data.led}</td>
                  <td>{data.plexi}</td>
                  <td>{data.cut}</td>
                  <td>{data.transfeu}</td>
                  <td>{data.paid}</td>
                  <td className="td-profit">{data.profit}</td>
                </tr>
              </table>
              <button
                className="edit-btn"
                onClick={() => {
                  /*eslint-disable-next-line*/
                  handleEdit(data.id!);
                  /*eslint-disable-next-line*/
                  setId(data.id!);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
