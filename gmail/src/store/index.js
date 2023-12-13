import { createStore } from 'vuex'
export default createStore({
    state:{
        currUser: null,
        loginStatus: false,
        forgetUser: null,
    },
    mutations:{
        setCurrUser(state, user){
            state.currUser = user;
        },
        setLoginStatus(state, status){
            state.loginStatus = status;
        },
        setForgetUser(state, user){
            state.forgetUser = user;
        },
        moveToTrash(state,msg){
            state.currUser.trash.push(msg);
            state.currUser.inbox = state.currUser.inbox.filter(m => m.id !== msg.id);
        }
    },
    actions:{
    },
    modules:{}
})