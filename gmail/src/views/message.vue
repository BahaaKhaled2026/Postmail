<template>
    <div>
        <h1>{{msg.message}}</h1>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
    
        return {
            msg: {
                id: 0,
                title: "",
                sender: "",
                date: "",
                message: ""
            }
        }
    },
    created() {
        console.log(this.id)
        const allMessages = [].concat(
        this.$store.state.currUser.inbox,
        this.$store.state.currUser.sent,
        this.$store.state.currUser.trash,
        this.$store.state.currUser.draft
    );

        this.msg = allMessages.find(msg => msg.id == this.$route.params.id)
    },
    mounted(){
        console.log(this.msg)
    }

}
</script>

<style>

</style>