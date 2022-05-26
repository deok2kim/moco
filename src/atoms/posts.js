import { atom } from "recoil";

export const postsState = atom({
  key: "Posts",
  default: {
    loading: false,
    data: null,
    error: null,
  },
});

export const postIdState = atom({
  key: "PostId",
  default: null,
});

export const postState = atom({
  key: "Post",
  default: {
    loading: false,
    data: null,
    error: null,
  },
});
