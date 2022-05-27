import { selector } from "recoil";
import { postIdState } from "./posts";
import { getComments } from "../api/comments";

export const commentsState = selector({
  key: "Comments",
  get: async ({ get }) => {
    const id = get(postIdState);
    const result = await getComments(id);
    return result;
  },
});
