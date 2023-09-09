const axios = require("axios");
export function unlockPolicy(data) {
  const policyUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/policy" +
    "/" +
    data.branchCode +
    "/" +
    data.prodCode +
    "/" +
    data.polNo +
    "/unlock";
  const config = {
      headers: {
          "Accept": "application/json",
          "userid": data.userId,
          "Content-Type": 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*"
      }
  };
  axios.defaults.headers.common["userid"] = data.userId;
  axios.put(policyUrl, config, {
    validateStatus: (status) => {
        return status === 200;
    }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function unlockUser(data) {
  const userUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/user" +
    "/" +
    data.empId +
    "/unlock";
  const config = {
    headers: {
      userid: data.userId,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };
  axios.defaults.headers.common["userid"] = data.userId;

  axios.put(userUrl, config, {
    validateStatus: (status) => {
      return status === 200;
  }
  }).then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}
