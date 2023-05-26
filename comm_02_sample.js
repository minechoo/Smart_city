import encUtils from "./encUtils.js";
import moment from "moment";

//장비 body
const body = {
  msgType: "RECV",
  msgId : 'f85d97fe-d33d-4370-9b8c-2fcb099daf03',
  commandList: [
    { moduleId: "01", moduleName: "에어컨", command: "ON" },
    {
      moduleId: "02",
      moduleName: "에어컨",
      command: "CRON",
      body: { start: "0900", end: "1900", week: [1, 2, 3, 4, 5] },
    },
  ]
};

//장비 상태 payload
const payload = {
  msgId: encUtils.uuid(),
  body,
  deviceId: "20202011",
  deviceDtm: moment().format("YYYYMMDDHHmmss"),
};

console.log("non enctyped payload >>>>>>>>>>>>>> ");
console.log(payload);

console.log("non enctyped payload >>>>>>>>>>>>>> ");
console.log(JSON.stringify(payload, null, 2));

payload.body = encUtils.encrypt(JSON.stringify(payload.body));

console.log("enctyped payload >>>>>>>>>>>>>> ");
console.log(JSON.stringify(payload, null, 2));

const bodyObj = JSON.parse(encUtils.decrypt(payload.body));
console.log("decrypt >> parsed body ");
console.log(bodyObj);
