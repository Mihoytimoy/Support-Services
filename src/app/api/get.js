
export default async function resetPWD(eId, tPassword, uId) {

    const axios = require('axios');
    
    await axios.get('/support.resetpwd', {
        params: {
            empId: eId,
            tempPassword: tPassword
        }
    }, {
        headers: {
            userid: uId
        }
    }, {
        validateStatus: (status) => {
            return status === 200;
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => {
        //dunno what to do with this yet but might be important
    })
}