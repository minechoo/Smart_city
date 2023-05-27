<template>
  <Transition>
    <div class="dialog-dim" v-if="showAddVisible">
      <DeviceAdd @onClose="onAddDialogClose" />
    </div>
  </Transition>
  <main class="system_wrap" v-if="!showAddVisible">
    <section v-for="(type, idx) in usedDeviceType" v-bind:key="idx">
      <h2>
        <a
          href="#"
          @click="
            () =>
              goDevicePage(
                `/device/${type.toLowerCase()}/${mergedList[type][0].deviceId}`
              )
          "
          >{{ type }}</a
        >
      </h2>
      <ul>
        <AreaItem
          v-for="item in mergedList[type]"
          v-bind:key="item.deviceId"
          :areaName="item.deviceNm"
          :areaType="type"
          :areaId="item.deviceId"
        />
      </ul>
      <span :class="{arrow: true , on : mergedList[type].length > 5}" ></span>
    </section>

    <div class="add" @click="() => (this.showAddDialog = true)">
      <img src="@/style/images/ico_add.png" alt="추가하기" />
      <p>추가하기</p>
    </div>
  </main>
</template>

<script>
import AreaItem from "@/components/area/AreaItem.vue";
import DeviceAdd from "@/view/device/DeviceAdd.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      areaList: [],
      showAddDialog: false,
    };
  },
  mounted() {
    this.getServDeviceList();
  },
  computed: {
    mergedList() {
      const mergedList = this.getDeviceList.reduce((prev, curr) => {
        const type = curr.deviceCd;

        if (!prev[type]) {
          prev[type] = [];
        }
        prev[type].push(curr);
        return prev;
      }, {});
      return mergedList;
    },
    usedDeviceType() {
      const mergedList = this.getDeviceList.reduce((prev, curr) => {
        const type = curr.deviceCd;

        if (prev.indexOf(type) < 0) {
          prev.push(type);
        }
        return prev;
      }, []);
      return mergedList;
    },
    showAddVisible() {
      return this.usedDeviceType.length === 0 || this.showAddDialog;
    },
    ...mapGetters(["isLogin", "getDeviceList"]),
  },
  methods: {
    ...mapActions(["doLogout", "setDeviceList", "getServDeviceList"]),

    fnLogout() {
      this.doLogout();
    },
    goDevicePage(url) {
      this.$router.push(url);
    },
    onAddDialogClose() {
      this.showAddDialog = false;
      this.getServDeviceList();
    },
  },
  components: { AreaItem, DeviceAdd },
};
</script>
