import Header from "./Header";
import { useState, useEffect } from "react";
import profitCalc from "../utils/profitCalc";

export default function Main(): JSX.Element {
  const [values, setValues] = useState({
    title: "",
    date: "",
    led: "",
    plexi: "",
    cut: "",
    transfeu: "",
    paid: "",
    profit: "",
  });
  const[submitted, setSubmitted] = useState<boolean>(false);

function areCostsFilled(){
  if (values.cut !== "" && values.led !== "" && values.transfeu !== "" && values.plexi !== "" && values.paid !== ""){
  return true
}
}

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
            value={areCostsFilled() && profitCalc(
              values.led,
              values.plexi,
              values.cut,
              values.transfeu,
              values.paid
            )}
            name="profit"
          ></input>
        </form>
        <button onClick={()=> handleSubmit}>Submit</button>
      </div>
    </>
  );
}
