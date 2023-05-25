
import { v4 as uuid } from 'uuid'

const messageStore = {
    state() {
        return { messages: [] }
    }, mutations: {
        addMessage(state, param) {
            param.msgId = param.msgId || uuid();
            state.messages.push(param);
        }, removeMessages(state, { msgId, rtnVal }) {
            state.messages.find(v => v.msgId === msgId).cb(rtnVal);
            state.messages = state.messages.filter(v => v.msgId !== msgId);
        }
    }, actions: {

        showAlert(context, { msg }) {
            context.commit('addMessage', {
                type: 'Alert',
                title: 'Alert', msg, cb: () => { }
            });
        },

        showWarning(context, { msg }) {
            context.commit('addMessage', {
                type: 'Warning',
                title: 'Warning', msg, cb: () => { }
            });
        },

        showError(context, { msg , cb} , ) {
            console.log('add errorMessages! ' , msg);
            context.commit('addMessage', {
                type: 'Error',
                title: 'Error', msg, cb
            });
        },

        showConfirm(context, { msg , cb }) {
            context.commit('addMessage', {
                type: 'Confirm',
                title: 'Confirm', msg, cb
            });
        },


        addMessage(context, { msg, cb, title }) {
            if (cb) {
                console.log('call back is not empty', cb);
            } else {
                console.log('call back is empty');
                cb = (rtn) => { console.log(rtn) };
            }

            context.commit('addMessage', { title, msg, msgId: uuid(), cb });
        },
        removeMessage(context, { msgId, rtnVal }) {
            context.commit('removeMessages', { msgId, rtnVal });
        }
    }, getters: {
        messages(state) {
            return state.messages;
        }
    }
};

export default messageStore;
