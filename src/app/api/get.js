const axios = require("axios");
export async function resetPWD(data) {
  const resetUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/resetpwd" +
    "/" +
    data.empId +
    "/" +
    data.tempPassword;

  const config = {
    headers: {
      userId: data.userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await axios
    .get(resetUrl, config, {
      validateStatus: (status) => {
        return status === 200;
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getOnHold(data, { setRows }) {
  data.firstResult;
  const onHoldUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/report/onhold-hold/list" +
    "?firstResult=" +
    data.firstResult +
    "&maxResult=" +
    data.maxResult;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await axios
    .get(onHoldUrl, config, {
      validateStatus: (status) => {
        return status === 200;
      },
    })
    .then((response) => {
      console.log(response);
      setRows(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getLogin(data, { setLoginInfo }) {
  const token = btoa(data.id) + "|" +  btoa(data.password);
  const loginUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/emp/auth?token=" +
    token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  await axios
    .get(loginUrl, config, {
      validateStatus: (status) => {
        return status === 200;
      },
    })
    .then((response) => {
      console.log(response);
      setLoginInfo(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
