<template>
    <main class="system_wrap">
        <section>
            <h2><a href="#" @click="() => goDevicePage('/device/stop')">스마트 정류장</a></h2>
            <ul>
                <li><a href="#">ㅇㅇ역 버스정류장1</a></li>
                <li class="on"><a href="#">ㅇㅇ역 버스정류장2</a></li>
                <li><a href="#">ㅇㅇ역 버스정류장3</a></li>
                <li><a href="#">ㅇㅇ역 버스정류장4</a></li>
                <li><a href="#">ㅇㅇ역 버스정류장5</a></li>
                <li><a href="#">ㅇㅇ역 버스정류장6</a></li>
                <li><a href="#">ㅇㅇ역 버스정류장7</a></li>
            </ul>
            <span class="arrow on"></span>
        </section>
        <section>
            <h2><a href="shelter_main.html">스마트 쉘터</a></h2>
            <ul>
                <li><a href="#">ㅇㅇ우체국 스마트쉘터</a></li>
                <li><a href="#">ㅇㅇ우체국 스마트쉘터</a></li>
                <li><a href="#">ㅇㅇ우체국 스마트쉘터</a></li>
                <li><a href="#">ㅇㅇ우체국 스마트쉘터</a></li>
                <li><button>+ 추가하기</button></li>
            </ul>
            <span class="arrow"></span>
        </section>
        <section>
            <h2><a href="library_main.html">스마트 도서관</a></h2>
            <ul>
                <li><a href="#">ㅇㅇ 스마트도서관</a></li>
                <li><a href="#">ㅇㅇ 스마트도서관</a></li>
                <li><a href="#">ㅇㅇ 스마트도서관</a> </li>
                <li><a href="#">ㅇㅇ 스마트도서관</a></li>
                <li><button>+ 추가하기</button></li>
            </ul>
            <span class="arrow"></span>
        </section>
        <section>
            <h2><a href="pull_main.html">스마트 폴</a></h2>
            <ul>
                <li><a href="#">ㅇㅇ거리 스마트 폴 1</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 2</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 3</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 4</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 5</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 6</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 7</a></li>
                <li><a href="#">ㅇㅇ거리 스마트 폴 8</a></li>
            </ul>
            <span class="arrow on"></span>
        </section>
        <div class="add">
            <img :src="addBtn" alt="추가하기">
            <p>추가하기</p>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import addBtn from '../../style/images/ico_add.png';
export default {
    data() {
        return {
            addBtn
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    }, methods: {
        ...mapActions(['doLogout'])
        , fnLogout() {
            this.doLogout();
        }
        , goDevicePage(url) {
            this.$router.push(url);
        }
    }
}
</script>