<template>
    <main class="system_wrap">

        <section v-for="(type, idx) in deviceType" v-bind:key="idx">
            <h2><a href="#" @click="() => goDevicePage(`/device/${type.toLowerCase()}/${mergedList[type][0].deviceId}`)">{{ type }}</a></h2>
            <ul>
                <AreaItem v-for="item in mergedList[type]" v-bind:key="item.deviceId" :areaName="item.deviceName"
                    :areaType="type" :areaId="item.deviceId" />
            </ul>
            <span class="arrow on"></span>
        </section>

        <div class="add">
            <img src="@/style/images/ico_add.png" alt="추가하기">
            <p>추가하기</p>
        </div>
    </main>
</template>

<script>
import AreaItem from '@/components/area/AreaItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            areaList: []
        };
    },
    mounted() {
        this.areaList = this.getDeviceList;
    },
    computed: {
        mergedList() {
            const mergedList = this.areaList.reduce((prev, curr) => {
                const type = curr.deviceType;
              
                if (!prev[type]) {
                    prev[type] = [];
                }
                prev[type].push(curr);
                return prev;
            }, {});
            return mergedList;
        },
        deviceType() {
            const mergedList = this.areaList.reduce((prev, curr) => {
                const type = curr.deviceType;
              
                if (prev.indexOf(type) < 0) {
                    prev.push(type);
                }
                return prev;
            }, []);
            return mergedList;
        },
        ...mapGetters(["isLogin" , 'getDeviceList'])
    },
    methods: {
        ...mapActions(["doLogout", "setDeviceList"]),
        fnLogout() {
            this.doLogout();
        },
        goDevicePage(url) {
            this.$router.push(url);
        }
    },
    components: { AreaItem }
}
</script>