export async function resetPWD(data) {
  const axios = require("axios");
  const resetUrl =
    "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/resetpwd" +
    "/" +
    data.empId +
    "/" +
    data.tempPassword;
  const config = {
    headers: {
      userId: data.userId,
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
    })
    .finally(() => {
      //dunno what to do with this yet but might be important
    });
}
