import axios from 'axios';

export async function apiSignup(data) {
  const response = await axios({
    method: 'post',
    url: '/api/user/join',
    data,
  });
  return response;
}
export async function apiLogin(data) {
  const response = await axios({
    method: 'post',
    url: '/api/user/login',
    data,
  });
  return response;
}
export async function apiFetchBoards() {
  const response = await axios({
    method: 'get',
    url: '/api/board/community',
  });
  return response;
}

export async function apiFetchBoard(data) {
  const response = await axios({
    method: 'get',
    url: `/api/board/id/${data.id}`,
  });
  return response;
}
export async function apiFetchReply(data) {
  const response = await axios({
    method: 'get',
    url: `/api/reply/id/${data.id}`,
  });
  return response;
}
export async function apiCreateBoard(data, boardName) {
  const response = await axios({
    method: 'post',
    url: `/api/boards/${boardName}/write`, // 보드네임: 현재는 커뮤니티만
    data,
  });
  return response;
}
export async function apiCreateReply(data) {
  const response = await axios({
    method: 'post',
    url: `/api/board/addReply`,
    data,
  });
  return response;
}
export async function apiToggleLike(data, isLike) {
  // isLike: addLike, dislike
  const response = await axios({
    method: 'post',
    url: `/api/board/${isLike}`,
    data,
  });
  return response;
}
export async function apiHideBoard(data) {
  const response = await axios({
    method: 'post',
    url: `/api/board/hide`,
    data,
  });
  return response;
}
export async function apiHideReply(data) {
  const response = await axios({
    method: 'post',
    url: `/api/board/reply`,
    data,
  });
  return response;
}
export async function apiFetchHideCoins(data) {
  const response = await axios({
    method: 'get',
    url: `/api/coin/list`,
    data,
  });
  return response;
}
export async function apiToggleHideCoin(data) {
  const response = await axios({
    method: 'post',
    url: `/api/coin/hide`,
    data, // 코인 심볼, 코인 네임
  });
  return response;
}
export async function apiFetchFavoriteCoins(data) {
  const response = await axios({
    method: 'post',
    url: `/api/coin/update`,
    data, // userId
  });
  return response;
}
export async function apiToggleFavoriteCoin(data) {
  const response = await axios({
    method: 'post',
    url: `/api/coin/update`,
    data, // userId, symbol
  });
  return response;
}
