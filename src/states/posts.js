import { atom, selector } from 'recoil';
import { apiFetchBoard, apiFetchBoards, apiFetchReply } from '../utils/api';

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
export const postsState = selector({
  key: 'Posts',
  get: async ({ get }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // const response = await apiFetchBoards();
    // return response
    return response.json();
  },
});

export const currentPostIdState = atom({
  key: 'CurrentPostId',
  default: 0,
});

export const postState = selector({
  key: 'Post',
  get: async ({ get }) => {
    const id = get(currentPostIdState);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    // const response = await apiFetchBoard({ id });
    // return response
    return response.json();
  },
});

export const commentsState = selector({
  key: 'Comments',
  get: async ({ get }) => {
    const id = get(currentPostIdState);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );
    // const response = await apiFetchReply({ id });
    // return response;
    return response.json();
  },
});
