import { useState, useEffect } from "react";


export default function useForm(initialState, confirmHandler, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { onChangeValidation, onSubmitValidation } = validate;

  useEffect(() => {
    if (!Object.entries(errors).length > 0 && isSubmiting) {
      confirmHandler();
      setIsSubmiting(false);
    }
  }, [errors, isSubmiting, confirmHandler]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(onSubmitValidation(values));
    setIsSubmiting(true);
  };

  const handleChange = (e) => {
    e.persist();

    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: onChangeValidation(e.target.name, e.target.value, values),
    }));
  };

  return { values, errors, handleSubmit, handleChange };
}
