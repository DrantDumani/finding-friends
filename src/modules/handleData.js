const apiStr = "http://localhost:3000/";

export const handleData = async (
  endPoint,
  input = undefined,
  method = "GET"
) => {
  const options = {
    mode: "cors",
    method: method,
    body: input,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(apiStr + endPoint, options);
};
