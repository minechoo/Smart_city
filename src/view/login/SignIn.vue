<template>
  <div>
    <div>
      <div class="registration_wrap">
        <div class="block_one"></div>
        <div class="block_two"></div>
        <div class="block_one"></div>
      </div>
      <div class="ab_membership">
        <header class="header">
          <h1>아이디·비밀번호 찾기</h1>
        </header>
        <Transition>
          <div class="tabs">
            <ul>
              <li
                :class="{ tab: true, on: selectedTab === 'ID' }"
                aria-selected="true"
                aria-controls="tab-1"
                @click="() => setSelectedTag('ID')"
              >
                아이디 찾기
              </li>
              <li
                :class="{ tab: true, on: selectedTab === 'PASSWORD' }"
                aria-selected="false"
                aria-controls="tab-2"
                @click="() => setSelectedTag('PASSWORD')"
              >
                비밀번호 찾기
              </li>
            </ul>

            <div v-if="selectedTab === 'ID'">
              <div class="input_box bd_none">
                <div class="flex_column">
                  <div class="input_area w_100">
                    <label for="">업체명 또는 이름</label>
                    <input
                      type="text"
                      id=""
                      class="input_style"
                      placeholder="업체명 또는 이름을 입력하세요"
                    />
                  </div>
                  <div class="input_area w_100">
                    <label for="">연락처</label>
                    <input
                      type="text"
                      id=""
                      class="input_style"
                      placeholder="연락처를 입력하세요"
                    />
                  </div>
                  <p>
                    [업체명 또는 이름]님의 아이디는
                    <span>ㅇㅇㅇㅇㅇㅇㅇ</span> 입니다.
                  </p>
                </div>
                <div class="info">
                  <img :src="systemImg" alt="" />
                  <span>스마트 시설물 통합 운영 관리 시스템</span>
                </div>
              </div>
              <div class="btn_area">
                <button class="btn grey_line mr_17" @click="fnCancel">
                  취소하기
                </button>
                <button class="btn bg_green">아이디찾기</button>
              </div>
            </div>

            <div
              v-if="selectedTab === 'PASSWORD'"
              class="tab-panel"
              style="display: block"
            >
              <div class="input_box bd_none h_339">
                <div class="flex_column">
                  <div class="input_area w_100">
                    <label for="">아이디(이메일)</label>
                    <input
                      type="text"
                      class="input_style"
                      placeholder="ex) abc@def.co.kr"
                    />
                  </div>
                  <div class="input_area w_100">
                    <label for="">연락처</label>
                    <input
                      type="text"
                      class="input_style"
                      placeholder="연락처를 입력하세요"
                    />
                  </div>
                </div>
                <div class="info" v-if="!searched">
                  <img :src="systemImg" alt="" />
                  <span>스마트 시설물 통합 운영 관리 시스템</span>
                </div>

                <div class="flex_column">
                  <div class="input_area w_100" v-if="searched">
                    <label for="new_pw">새로운 비밀번호</label>
                    <input
                      type="text"
                      id="new_pw"
                      class="input_style"
                      placeholder="새로운 비밀번호를 입력하세요"
                    />
                  </div>
                  <div class="input_area w_100" v-if="searched">
                    <label for="new_pw_c">새로운 비밀번호 확인</label>
                    <input
                      type="text"
                      id="new_pw_c"
                      class="input_style"
                      placeholder="새로운 비밀번호를 확인해주세요"
                    />
                  </div>
                </div>
                <!-- 왼쪽 패널 입력하면 뜨는 섹션 -->
              </div>

              <div class="btn_area">
                <button class="btn grey_line mr_17" @click="fnCancel">
                  취소하기
                </button>
                <button
                  class="btn bg_grren"
                  v-if="!searched"
                  @click="setSearched"
                >
                  비밀번호 찾기
                </button>
                <button class="btn bg_grren" v-if="searched">수정하기</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script>
import systemImg from "../../style/images/system.png";

export default {
  data() {
    return {
      selectedTab: "ID",
      systemImg: systemImg,
      searched: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.fnClose();
      }
    });
  },
  methods: {
    fnClose() {
      this.$emit("onClose");
    },
    setSearched() {
      this.searched = true;
    },
    setSelectedTag(tagId) {
      console.log(tagId);
      this.selectedTab = tagId;
    },
    fnCancel() {
      console.log("click btn");
      this.$emit("onCloseDialog");
    },
  },
};
</script>
