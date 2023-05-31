<template lang="">
  <div :class="{ go: true, caution: !stat }">
    <div class="flex_col">
      <a href="#">
        <div class="operation">
          <span class="status"></span>
          <span class="sign">{{ statNm }}</span>
        </div>
        <img :src="icoUrl" :alt="name" class="svg_color" />
        <h2>{{ name }}</h2>
      </a>
    </div>
    <div class="flex_col_bet">
      <div>
        <img
          src="@/style/images/svg/ico_menu_top.svg"
          alt="버튼"
          class="svg_top"
        />
      </div>
      <p v-if="start">자동설정<br>{{start}}- {{end}}</p>
      <div>
        <img
          src="@/style/images/svg/ico_menu_bottom.svg"
          alt="버튼"
          class="svg_bottom"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    deviceId: { type: String },
    stat: { type: Boolean },
    name: { type: String },
    type: { type: String },
    start: { type: String },
    end: { type: String },
  },
  computed: {
    statNm: function () {
      return this.stat ? "정상작동" : "점검필요";
    },
    icoUrl: function () {
   
      const currTypes = this.type.split("_")[1];
      return require(`@/style/images/svg/ico_menu_${currTypes}.svg`);
    },
  },
  methods: {
    goDetail: function () {
      this.$router.push(`/device/stop/${this.deviceId}`);
    },
  },
};
</script>
<style lang=""></style>
