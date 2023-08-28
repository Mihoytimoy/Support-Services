const axios = require('axios');
export function unlockPolicy(data) {
    const policyUrl = "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/policy"
                        + "/" + data.branchCode
                        + "/" + data.prodCode
                        + "/" + data.polNo
                        + "/unlock";
    axios.put(policyUrl, {
        headers: {
            userid: data.userId
        }
    }, {
        validateStatus: (status) => {
            return status === 200;
        }
    })
}

export function unlockUser(data) {
    const userUrl = "https://gymp3t84o3.execute-api.ap-southeast-1.amazonaws.com/dev1/support/user"
                    + "/" + data.empId
                    + "/unlock";

    axios.put(userUrl, {
        headers: {
            userid: data.userId
        }
    }, {
        validateStatus: (status) => {
            return status === 200;
        }
    })
}