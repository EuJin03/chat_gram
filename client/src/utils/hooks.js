import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const valueHandler = e => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });
  };

  const formHandler = e => {
    e.preventDefault();
    callback();
  };

  return {
    valueHandler,
    formHandler,
    values,
  };
};
