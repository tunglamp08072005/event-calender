import { useState, useCallback } from "react";

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(() => ({ ...initialState }));

  const reset = useCallback(() => {
    setFormState({ ...initialState });
  }, [initialState]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return [formState, handleInputChange, reset];
};

export default useForm;
