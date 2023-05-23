<template>
    <div class="dim" v-if="showDialog">
        <div class="msg-box">
            <header class="bg-primary">
                {{ title }}
            </header>

            <slot></slot>

            <footer>
                <button type="button" @click="onClose(true)">Confirm</button>
                <button type="button" @click="onClose(false)">Cancel</button>
            </footer>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        title: { required: true, type: String },
        onClose: {
            required: true,
            type: Function
        },
        showDialog: {
            type: Boolean
        }
    }
}
</script>
