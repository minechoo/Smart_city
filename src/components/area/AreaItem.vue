<template>
  <li>
    <a @click="fnGoDetail" :class="{'ellipsis-padding': shouldShowPadding}">{{ areaName }}</a>
  </li>
</template>

<script>
export default {
  props: {
    areaName: { type: String },
    areaId: { type: String },
    areaType: { type: String },
  },
  data() {
    return {
      shouldShowPadding: false, // 초기값은 false로 설정
    };
  },
  methods: {
    fnGoDetail() {
      console.log('on clicked:', this.areaId);
      this.$router.push(`/device/${this.areaType.toLowerCase()}/${this.areaId}`);
    },
  },
  mounted() {
    this.shouldShowPadding = this.$el.scrollWidth > this.$el.clientWidth;
  },
};
</script>

<style scoped>

a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsis-padding {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px; /* 기본 오른쪽 패딩 설정 */
}

.ellipsis-padding.show-padding {
  padding-left: 10px; /* overflow 발생 시 왼쪽 패딩 추가 */
}
</style>
