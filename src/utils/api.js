// 회원가입

import axios from 'axios';

// const BASE_URL =
//   'http://ec2-15-164-165-178.ap-northeast-2.compute.amazonaws.com';
export async function apiSignup(data) {
  const response = await axios({
    method: 'post',
    url: 'http://ec2-43-200-3-180.ap-northeast-2.compute.amazonaws.com/chat/room/enter',
    data: {
      name: 'BIT',
    },
  });
  return response;
}
