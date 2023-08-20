

const axios = require('axios');
export default function unlockPolicy(bCode, pCode, pNo, uId) {
    axios.post('/support/policy', {
        branch: bCode,
        prodcode: pCode,
        polno: pNo
    }, '/unlock', {
        headers: {
            userid: uId
        }
    }, {
        validateStatus: (status) => {
            return status === 200;
        }
    })
}

export default function unlockUser(eId, uId) {
    axios.post('/support/user', {
        empId: eId
    }, '/unlock', {
        headers: {
            userid: uId
        }
    }, {
        validateStatus: (status) => {
            return status === 200;
        }
    })
}