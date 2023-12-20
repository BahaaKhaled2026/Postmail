import { createStore } from 'vuex'
export default createStore({
    state: {
        token: localStorage.getItem('token') || null,
        currUser: JSON.parse(localStorage.getItem('userData')) || null,
        isLoggedIn: localStorage.getItem('token') !== null,
        loginStatus: false,
        forgetUser: null,
        currDraftMsg: {
            sentToMails: [],
            date: "",
            title: "",
            sender: "",
            message: "",
            id: 0,
            isRead: false,
        },
        holdDraft: false,
        selectedMsg: -1,
        search: "",
        searchType: "",
        selectedMsg: -1,
        sendClicked: false,
        wantedContact: ""
    },
    mutations: {
        setWantedContact(state, status) {
            state.wantedContact = status;
        },
        setCurrUser(state, user) {
            state.currUser = user;
            if (state.currUser !== null) {
                state.currUser.inbox.sort((a, b) => {
                    return b.id - a.id;
                })
                state.currUser.draft.sort((a, b) => {
                    return b.id - a.id;
                })
                state.currUser.trash.sort((a, b) => {
                    return b.id - a.id;
                })
                state.currUser.sent.sort((a, b) => {
                    return b.id - a.id;
                })
            }
        },
        setSearch(state, search) {
            state.search = search;
        },
        setSendClicked(state, status) {
            state.sendClicked = status
        },
        setSearchType(state, searchType) {
            state.searchType = searchType
        },
        setCurrMsg(state, status) {
            state.currDraftMsg = status
        },
        updatepriority(state, payload) {
            const { msg, usersRate, route, index } = payload;
            switch (route) {
                case "inbox":
                    state.currUser.inbox = state.currUser.inbox.filter((m) => m.id !== msg.id);
                    msg.priorityLvl = usersRate;
                    state.currUser.inbox.push(msg);
                    break;
                case "sent":
                    state.currUser.sent = state.currUser.sent.filter((m) => m.id !== msg.id);
                    msg.priorityLvl = usersRate;
                    state.currUser.sent.push(msg);
                    break;
                case "folder":
                    state.currUser.folders[index].messages = state.currUser.folders[index].messages.filter((m) => m.id !== msg.id);
                    msg.priorityLvl = usersRate;
                    state.currUser.folders[index].messages.push(msg);
                    break;
            }
        },
        setHoldDraft(state, status) {
            state.holdDraft = status
        },
        setSelectedMsg(state, status) {
            state.selectedMsg = status
        },
        setLoginStatus(state, status) {
            state.loginStatus = status;
        },
        setForgetUser(state, user) {
            state.forgetUser = user;
        },
        moveToTrash(state, msg) {
            state.currUser.trash.push(msg);
            state.currUser.inbox = state.currUser.inbox.filter(m => m.id !== msg.id);
            state.currUser.sent = state.currUser.sent.filter(m => m.id !== msg.id);
        },
        updateMsg(state, msg) {
            state.currUser.inbox = state.currUser.inbox.filter(m => m.id !== msg.id);
            state.currUser.inbox.push(msg);
        },
        sortMsgAsc(state) {
            state.currUser.inbox.sort((a, b) => {
                return a.id - b.id;
            });
            state.currUser.trash.sort((a, b) => {
                return a.id - b.id;
            });
            state.currUser.draft.sort((a, b) => {
                return a.id - b.id;
            });
            state.currUser.sent.sort((a, b) => {
                return a.id - b.id;
            });
            for (let i = 0; i < state.currUser.folders.length; i++) {
                state.currUser.folders[i].messages.sort((a, b) => {
                    return a.id - b.id;
                });
            }
        },
        sortMsgDec(state) {
            state.currUser.inbox.sort((a, b) => {
                return b.id - a.id;
            });
            state.currUser.trash.sort((a, b) => {
                return b.id - a.id;
            });
            state.currUser.draft.sort((a, b) => {
                return b.id - a.id;
            });
            state.currUser.sent.sort((a, b) => {
                return b.id - a.id;
            });
            for (let i = 0; i < state.currUser.folders.length; i++) {
                state.currUser.folders[i].messages.sort((a, b) => {
                    return b.id - a.id;
                });
            }
        },
        sortMsgPri(state) {
            state.currUser.inbox.sort((a, b) => {
                return b.priorityLvl - a.priorityLvl;
            });
            state.currUser.trash.sort((a, b) => {
                return b.priorityLvl - a.priorityLvl;
            });
            state.currUser.draft.sort((a, b) => {
                return b.priorityLvl - a.priorityLvl;
            });
            state.currUser.sent.sort((a, b) => {
                return b.priorityLvl - a.priorityLvl;
            });
            for (let i = 0; i < state.currUser.folders.length; i++) {
                state.currUser.folders[i].messages.sort((a, b) => {
                    return b.priorityLvl - a.priorityLvl;
                });
            }
        },
        restore(state, msg) {
            state.currUser.trash = state.currUser.trash.filter(m => m.id !== msg.id);
            if (msg.sender === state.currUser.email) {
                state.currUser.sent.push(msg);
                state.currUser.inbox.push(msg);
            }
            else {
                state.currUser.inbox.push(msg);
            }
        },
        deleteMsg(state, msg) {
            state.currUser.draft = state.currUser.draft.filter(m => m !== msg);
        },
        searchMsg(state, search) {
            if (state.searchType == "title") {
                state.currUser.inbox = state.currUser.inbox.filter((m) => m.title.includes(search));
                state.currUser.trash = state.currUser.trash.filter((m) => m.title.includes(search));
                state.currUser.draft = state.currUser.draft.filter((m) => m.title.includes(search));
                state.currUser.sent = state.currUser.sent.filter((m) => m.title.includes(search));
            }
            else if (state.searchType == "date") {
                state.currUser.inbox = state.currUser.inbox.filter((m) => m.date.includes(search));
                state.currUser.trash = state.currUser.trash.filter((m) => m.date.includes(search));
                state.currUser.draft = state.currUser.draft.filter((m) => m.date.includes(search));
                state.currUser.sent = state.currUser.sent.filter((m) => m.date.includes(search));
            }
            else if (state.searchType == "message") {
                state.currUser.inbox = state.currUser.inbox.filter((m) => m.message.includes(search));
                state.currUser.trash = state.currUser.trash.filter((m) => m.message.includes(search));
                state.currUser.draft = state.currUser.draft.filter((m) => m.message.includes(search));
                state.currUser.sent = state.currUser.sent.filter((m) => m.message.includes(search));
            }
            else if (state.searchType == "sender") {
                state.currUser.inbox = state.currUser.inbox.filter((m) => m.sender.includes(search));
                state.currUser.trash = state.currUser.trash.filter((m) => m.sender.includes(search));
                state.currUser.draft = state.currUser.draft.filter((m) => m.sender.includes(search));
                state.currUser.sent = state.currUser.sent.filter((m) => m.sender.includes(search));
            }
        },
        createfolder(state, newfolder) {
            state.currUser.folders.push(newfolder);
        },
        deletefolder(state, folder) {
            state.currUser.folders = state.currUser.folders.filter(f => f.foldername !== folder.foldername);
            for (let i = 0; i < state.currUser.folders.length; i++) {
                state.currUser.folders[i].folderindex = i;
            }
        },
        deletemsgfromfolder(state, msg) {
            state.currUser.folders[msg.index].messages = state.currUser.folders[msg.index].messages.filter(m => m !== msg.message);
        }
    },
    actions: {
    },
    modules: {}
})