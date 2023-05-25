<template>
    <div v-if="messages.length > 0" class="dialog-dim">
        <div class="msg-box" v-for=" (row, index)  in messages" :key="index">
            <div>
                <header :class="getHeaderClass(row.type)">
                    {{ row.title }}
                </header>
                <section>
                    {{ row.msg }}
                </section>
                <footer>
                    <button type="button" @click="fnClose(row.msgId, true)"> Confirm </button>
                    <button type="button" class="bg-default" @click="fnClose(row.msgId, false)" v-if=" row.type === 'Confirm'"> Cancel </button>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
        }
    }, computed: {
        ...mapGetters(['messages'])
    }, methods: {

        getHeaderClass(type) {
            return { 'bg-primary ': type === 'Alert' || type === 'Confirm', 'bg-danger': type === 'Error', 'bg-warning': type === 'Warning' };
        },

        ...mapActions(['addMessage', 'removeMessage'])
        ,
        fnClose(msgId, rtnVal) {
            this.removeMessage({ msgId, rtnVal });
        }
    }

}
</script>
