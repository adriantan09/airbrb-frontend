const resolve = async (promise) => {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (error) {
    resolved.error = error.response;
  }

  if (resolved.data === null && resolved.error === undefined) {
    alert('Warning! Backend is not connected.')
  }

  return resolved;
}

export default resolve;
