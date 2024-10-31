const apiStr =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "https://vivacious-heliotrope-tarragon.glitch.me/";

export const handleData = async (
  endPoint,
  input = undefined,
  method = "GET"
) => {
  const token = localStorage.getItem("token");
  const options = {
    mode: "cors",
    method: method,
    body: input,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(apiStr + endPoint, options);
};
