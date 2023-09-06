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
      "Accept": "application/json"
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

export async function getOnHold(data) {
  const onHoldUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/report/onhold-hold/list" +
    "?firsResult=" +
    data.firstResult +
    "&maxResult=" +
    data.maxResult;

    await axios
    .get(onHoldUrl, config, {
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
