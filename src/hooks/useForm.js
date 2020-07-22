import { useState } from "react";

export default function useForm(initialState, confirmHandler) {
  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmHandler();
  };

  const handleChange = (e) => {
    e.persist();
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return { values, handleSubmit, handleChange };
}
