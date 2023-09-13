import { getOnHold } from "../api/get";

const axios = require("axios");

export async function updateStatus(data, firstResult, maxResult, {setRows}) {
    let body = [];
    let iterator = data.next();
    do {
        body.push({"requestNo": iterator.value});
        iterator = data.next();
    }while(iterator.done === false)
    const list = body;
   
    const updateStatusUrl =
      "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/report/update/status";

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        list
      };
  
      await axios.post(updateStatusUrl, config, {
        validateStatus: (status) => {
          return status === 200;
        },
      })
      .then((response) => {
        console.log(response);
        getOnHold({firstResult, maxResult}, {setRows})
      })
      .catch((error) => {
        console.log(error);
      });
  }