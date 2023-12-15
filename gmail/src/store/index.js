import { createStore } from 'vuex'
export default createStore({
    state:{
        token: localStorage.getItem('token') || null,
        currUser: JSON.parse(localStorage.getItem('userData')) || null,
        isLoggedIn: localStorage.getItem('token') !== null,
        loginStatus: false,
        forgetUser: null,
        currDraftMsg:{
            sentToMails: [],
            date: "",
            title: "",
            sender: "",
            message: "",
            id: 0,
            isRead: false,
        },
        holdDraft:false,
        selectedMsg:-1
    },
    mutations:{
        setCurrUser(state, user){
            state.currUser = user;
            if(state.currUser!==null){
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
        }
        },
        setCurrMsg(state,status){
            state.currDraftMsg=status
        },
        setHoldDraft(state,status){
            state.holdDraft=status
        },
        setSelectedMsg(state,status){
            state.selectedMsg=status
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