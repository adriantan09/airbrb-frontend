// Helper Functions

export const validEmail = (email) => {
  // checks for format _@_._
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const handleChange = (event, dataType, setForm) => {
  const key = event.target.name;
  let value = event.target.value;

  switch (dataType) {
    case 'address':
      if (key === 'postcode' && value !== '') value = parseInt(value, 10);
      setForm((prevState) => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [key]: value,
          },
        };
      });
      break;
    case 'metadata':
      setForm((prevState) => {
        return {
          ...prevState,
          metadata: {
            ...prevState.metadata,
            [key]: value,
          },
        };
      });
      break;
    default:
      setForm((prevState) => {
        if (key === 'price' && value !== '') value = parseInt(value, 10);
        return {
          ...prevState,
          [key]: value,
        };
      });
      break;
  }
};
