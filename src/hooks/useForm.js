import { useState } from "react";

export default function useForm( confirmHandler) {
  const [values, setValues] = useState({});

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
