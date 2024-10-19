
const GetAuth = (bool, isfile) => {
  let token = sessionStorage.getItem("token");
  return isfile ? {
    "Accept": "application/json",
    "Authorization": "Bearer " + token,
  } : bool ? {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  } : {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
}

export const ApiCall = (
  APIUrl,
  Method,
  isAuthorizationRequired,
  ApiName,
  Body = null,
  isfile = false
) => {
  let APIPromise1 = new Promise((resolve, reject) => {
    const URLOptions = Method?.toLocaleUpperCase() == "GET" ? {
      method: "GET",
      headers: GetAuth(isAuthorizationRequired, isfile),
      redirect: 'follow'
    } : {
      method: Method,
      headers: GetAuth(isAuthorizationRequired, isfile),
      redirect: 'follow',
      body: isfile ? Body : JSON.stringify(Body),
    }
    fetch(APIUrl, URLOptions)
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(`${Method} ${ApiName} error`, err);
        reject(err);
      });
  });
  return APIPromise1;
};


export const getAPICall = (api) => {
  return ApiCall(api, 'GET', !!sessionStorage.getItem('token'), 'getAPICall')
}
//Method for With Json Converted body
export const postAPICall = (api, body) => {
  return ApiCall(api, 'POST', !!sessionStorage.getItem('token'), 'postAPICall', body)
}

export const putAPICall = (api, body) => {
  return ApiCall(api, 'PUT', !!sessionStorage.getItem('token'), 'putAPICall', body)
}

export const patchAPICall = (api, body) => {
  return ApiCall(api, 'PATCH', !!sessionStorage.getItem('token'), 'patchAPICall', body)
}

export const deleteAPICall = (api) => {
  return ApiCall(api, 'DELETE', !!sessionStorage.getItem('token'), 'deleteAPICall')
}
