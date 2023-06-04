<template>
  <div v-if="messages.length > 0" class="dialog-dim">
    <div
      :class="getBgClass(row.type)"
      v-for="(row, index) in messages"
      :key="index"
    >
      <div class="header">
        <h1>{{ row.title }}</h1>
        <button class="btn_close" @click="fnClose(row.msgId, false)"></button>
      </div>
      <div class="alert_box">
        <p>{{ row.msg }}</p>
      </div>
      <div class="btn_area m_none">
        <button
          type="button"
          class="btn bg_grren"
          @click="fnClose(row.msgId, true)"
        >
          {{ getBtnText(row.type) }}
        </button>
        <button
          type="button"
          class="btn bg_grren"
          @click="fnClose(row.msgId, false)"
          v-if="row.type === 'Confirm'"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["messages"]),
  },
  methods: {
    getBgClass(type) {
      return {
        ab_membership: true,
        "bg-white ": type === "Alert" || type === "Confirm",
        bg_red: type === "Error",
        "bg-normal": type === "Warning",
        h_auto: true,
      };
    },
    getBtnText(type) {
      console.log(type);
      return "확인";
    },
    ...mapActions(["addMessage", "removeMessage"]),
    fnClose(msgId, rtnVal) {
      this.removeMessage({ msgId, rtnVal });
    },
  },
};
</script>
