import Header from "./Header";
import { useState, useEffect } from "react";
import profitCalc from "../utils/profitCalc";
import axios from "axios";
import resultData from "./Interfaces";

export default function Main(): JSX.Element {
  const [values, setValues] = useState({
    title: "",
    date: "",
    led: "",
    plexi: "",
    cut: "",
    transfeu: "",
    paid: "",
    profit: 0,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [allData, setAllData] = useState<resultData[]>([]);

  const herokudb = "http://localhost:4000/";

  useEffect(() => {
    async function handleGetAll() {
      const result = await axios.get(herokudb);
      setAllData(result.data);
    }
    handleGetAll();
  }, [submitted]);

  console.log(allData, "this is all data");

  async function handleSubmit() {
    setSubmitted((prev) => !prev);
    setValues({ ...values, profit: profit });
    console.log(submitted);
    await axios.post(herokudb + "data", {
      title: values.title,
      date: values.date,
      led: parseInt(values.led),
      plexi: parseInt(values.plexi),
      cut: parseInt(values.cut),
      transfeu: parseInt(values.transfeu),
      paid: parseInt(values.paid),
      profit: profit,
    });
  }

  function areCostsFilled() {
    if (
      values.cut !== "" &&
      values.led !== "" &&
      values.transfeu !== "" &&
      values.plexi !== "" &&
      values.paid !== ""
    ) {
      return true;
    }
  }

  const profit = profitCalc(
    values.led,
    values.plexi,
    values.cut,
    values.transfeu,
    values.paid
  );

  return (
    <>
      <Header />
      <div className="inputs-container">
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
            value={values.led}
            name="led"
            onChange={(e) => setValues({ ...values, led: e.target.value })}
          ></input>
          <input
            className="form-field"
            placeholder="Plexi Price"
            value={values.plexi}
            name="plexi"
            onChange={(e) => setValues({ ...values, plexi: e.target.value })}
          ></input>
          <input
            className="form-field"
            placeholder="Cut Price"
            value={values.cut}
            name="cut"
            onChange={(e) => setValues({ ...values, cut: e.target.value })}
          ></input>
          <input
            className="form-field"
            placeholder="Transfeu"
            value={values.transfeu}
            name="transfeu"
            onChange={(e) => setValues({ ...values, transfeu: e.target.value })}
          ></input>
          <input
            className="form-field"
            placeholder="Paid"
            value={values.paid}
            name="paid"
            onChange={(e) => setValues({ ...values, paid: e.target.value })}
          ></input>
          <input
            className="form-field"
            placeholder="Profit"
            name="profit"
            value={areCostsFilled() && profit}
          ></input>
        </form>
        <button onClick={() => handleSubmit()}>Submit</button>
        <div>
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
                  <td>{data.profit}</td>
                </tr>
              </table>
              <button>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
