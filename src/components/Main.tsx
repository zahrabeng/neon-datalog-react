import Header from "./Header";
import { useState, useEffect } from "react";

export default function Main(): JSX.Element {
  const [values, setValues] = useState({
    title: "",
    date: "",
    led: 0,
    plexi: 0,
    cut: 0,
    transfeu: 0,
    paid: 0,
    profit: 0,
  });

  return (
    <>
      <Header />
      <div className="inputs-container">
        <form></form>
      </div>
    </>
  );
}
