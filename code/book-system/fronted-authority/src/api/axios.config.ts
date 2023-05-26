import axios from "axios"

axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 请求成功后首先执行
axios.interceptors.response.use(function (response) {


    return response;
  }, function (error) {
    const {status} = error.response
    if(status===401){
    //   localStorage.removeItem('token')
     
    }
    return Promise.reject(error);
  });