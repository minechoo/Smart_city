<template>
  <div v-if="messages.length > 0" class="dialog-dim">
    <div
    :class="getBgClass(row.type)"
      v-for="(row, index) in messages"
      :key="index"
      style="height: fit-content"
    >
      <div>
        <header :class="getHeaderClass(row.type)">
          <h1>{{ row.title }}</h1>
        </header>
        <div class="tabs">
          <div class="tab-panel" style="display: block">
            <div class="input_box"> 
                <div  class="flex_column">
                    <h2>{{ row.msg }}</h2>
                </div>
            </div>

            <div class="btn_area">
              <button
                type="button"
                class="btn bg_grren"
                @click="fnClose(row.msgId, true)"
              >
                Confirm
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
        "bg-primary ": type === "Alert" || type === "Confirm",
        "bg-danger": type === "Error",
        "bg-warning": type === "Warning",
      };
    },

    getHeaderClass(type) {
      return {
        header: true,
        "bg-primary ": type === "Alert" || type === "Confirm",
        "bg-danger": type === "Error",
        "bg-warning": type === "Warning",
      };
    },

    ...mapActions(["addMessage", "removeMessage"]),
    fnClose(msgId, rtnVal) {
      this.removeMessage({ msgId, rtnVal });
    },
  },
};
</script>
