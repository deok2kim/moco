import { atom, selector } from "recoil";
import { apiFetchBoard, apiFetchBoards, apiFetchReply } from "../utils/api";

// export const postsState = selectorFamily({
//   key: "Posts",
//   get:
//     ({ page, per }) =>
//     async ({ get }) => {
//       const response = await fetch(
//         // TODO: 파라미터 넣기
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       return response.json();
//     },
// });
// export const postsState = selector({
//   key: 'Posts',
//   get: async () => {
//     const response = await apiFetchBoards();
//     return response.data;
//   },
// });

export const currentPostIdState = atom({
  key: "CurrentPostId",
  default: 0,
});

export const postState = selector({
  key: "Post",
  get: async ({ get }) => {
    const id = get(currentPostIdState);

    const response = await apiFetchBoard({ id });
    return response.data;
  },
});

export const commentsState = selector({
  key: "Comments",
  get: async ({ get }) => {
    const id = get(currentPostIdState);

    const response = await apiFetchReply({ id });
    return response.data;
  },
});
