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

        const sampleDeviceList = [{ areaId: "area001", deviceName: "강남역 4번 출구 정류장", deviceId: "device001", deviceType: "SHELTER" }
            , { areaId: "area002", deviceName: "강남역 4번 출구 쉘터", deviceId: "device002", deviceType: "POLL" }
            , { areaId: "area003", deviceName: "강남역 4번 출구 스마트도서관", deviceId: "device003", deviceType: "LIBRARY" }
            , { areaId: "area004", deviceName: "역삼역 1번 출구 스마트폴", deviceId: "device004", deviceType: "STATION" }
          
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0051", deviceType: "POLL" }

            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0052", deviceType: "POLL" }

            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0053", deviceType: "POLL" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0054", deviceType: "POLL" }
            , { areaId: "area006", deviceName: "도봉역 3번 출구 스마트폴", deviceId: "device006", deviceType: "LIBRARY" }
            , { areaId: "area007", deviceName: "금정역 4번 출구 스마트폴", deviceId: "device007", deviceType: "STATION" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0055", deviceType: "POLL" }

            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0056", deviceType: "POLL" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0057", deviceType: "POLL" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0058", deviceType: "POLL" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0059", deviceType: "POLL" }
            , { areaId: "area005", deviceName: "삼성역 2번 출구 스마트폴", deviceId: "device0060", deviceType: "POLL" }
        ]

        this.setDeviceList({ deviceList: sampleDeviceList });

        this.areaList = sampleDeviceList;
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
        ...mapGetters(["isLogin"])
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