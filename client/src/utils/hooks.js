import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const valueHandler = e => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });
  };

  const genderHandler = e => {
    const g = e.target.firstChild.innerText;

    setValues({ ...values, gender: g.toLowerCase() });
  };

  console.log(values);
  const formHandler = e => {
    e.preventDefault();
    callback();
  };

  return {
    valueHandler,
    genderHandler,
    formHandler,
    values,
  };
};
