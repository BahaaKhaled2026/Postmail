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
            state.currUser.inbox.sort((a,b)=>{
                return b.id - a.id;
            })
            state.currUser.draft.sort((a,b)=>{
                return b.id - a.id;
            })
            state.currUser.trash.sort((a,b)=>{
                return b.id - a.id;
            })
            state.currUser.sent.sort((a,b)=>{
                return b.id - a.id;
            })
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
        },
        updateMsg(state, msg){
            state.currUser.inbox = state.currUser.inbox.filter(m => m.id !== msg.id);
            state.currUser.inbox.push(msg);
        },
        sortMsgAsc(state){
            state.currUser.inbox.sort((a,b) => {
                return a.id - b.id;
            });
            state.currUser.trash.sort((a,b) => {
                return a.id - b.id;
            });
            state.currUser.draft.sort((a,b) => {
                return a.id - b.id;
            });
            state.currUser.sent.sort((a,b) => {
                return a.id - b.id;
            });
        },
        sortMsgDec(state){
            state.currUser.inbox.sort((a,b) => {
                return b.id - a.id;
            });
            state.currUser.trash.sort((a,b) => {
                return b.id - a.id;
            });
            state.currUser.draft.sort((a,b) => {
                return b.id - a.id;
            });
            state.currUser.sent.sort((a,b) => {
                return b.id - a.id;
            });
        }
    },
    actions:{
    },
    modules:{}
})