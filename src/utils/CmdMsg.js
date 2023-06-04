const COMMAND = {
  STATUS: "STAT",
  ON: "ON",
  OFF: "OFF",
  CRON: "CRON",
};

export default {
  status: (userId, deviceId) => {
    return {
      userId,
      deviceId,
      command: COMMAND.STATUS,
    };
  },
  on: (userId, deviceId, moduleId) => {
    return {
      command: COMMAND.ON,
      userId,
      deviceId,
      moduleId,
    };
  },
  cron: (userId, deviceId, moduleId, start, end) => {
    return { userId, deviceId, moduleId, start, end, command: COMMAND.CRON };
  },

  off: (userId, deviceId, moduleId) => {
    return {
      command: COMMAND.OFF,
      userId,
      deviceId,
      moduleId,
    };
  },
};
