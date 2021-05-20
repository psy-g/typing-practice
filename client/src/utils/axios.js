import axios from "axios";

const ADDRESS = "http://localhost:8080";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// 요청(회원가입, 로그인)
// export const request = (method, url, data) => {
//   return axios({
//     method,
//     url: ADDRESS + url,
//     data,
//   })
//     .then((res) => res.data)
//     .catch((err) => console.log(err));
// };

export const request = (method, url, data) => {
  return axios({
    method,
    url: ADDRESS + url,
    data,
  });
};