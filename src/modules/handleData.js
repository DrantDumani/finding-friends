const apiStr =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "https://finding-friends-api.adaptable.app/";

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
