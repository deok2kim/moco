import axios from "axios";

export const getComments = async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return response.data;
};
