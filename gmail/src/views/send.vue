<template>
  <div class="all">
    <section class="d-flex">
      <sideBar />
      <div class="body flex-column">
        <div class="row">
          <label>Title:</label>
          <input v-model="mail.title" type="text" />
        </div>
        <div class="row">
          <label>sent To:</label>
          <input v-model="sentto" type="text" />
        </div>
        <div class="row">
          <label>Message:</label>
          <textarea v-model="mail.message"></textarea>
        </div>
        <div class="d-flex attch">
          <label><i class="fa-solid fa-paperclip"></i></label>
          <input
            type="file"
            multiple
            ref="fileInput"
            @change="handleFileChange"
          />
        </div>
        <button @click="sendMail" class="btn">
          <i class="fa-brands fa-telegram"></i>
        </button>
        <!-- <button @click="getusers">hat</button> -->
      </div>
    </section>
  </div>
</template>

<script>
import $store from "../store/index.js";
import sideBar from "@/components/sideBar.vue";

export default {
  created() {
    this.sender = $store.state.currUser.email;
  },
  mounted() {
    this.getCurrentDate();
  },
  components: {
    sideBar,
  },
  data() {
    return {
      selectedFile: null,
      sentto: "",
      mail: {
        sentToMails: [],
        date: "",
        title: "",
        sender: "",
        message: "",
        id: 0,
        isRead: false,
      },
      attachmentOBJ: [],
    };
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const timeZone = "Europe/Athens";
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formatter = new Intl.DateTimeFormat(undefined, {
        ...options,
        timeZone,
      });
      this.mail.date = formatter.format(now);

      console.log(this.mail.date);
    },

    async handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files;
      for (let i = 0; i < this.selectedFile.length; i++) {
        let tempOBJ = {
          attachment: await this.convertFileToBase64(this.selectedFile[i]),
          attType: this.selectedFile[i].type,
          attName: this.selectedFile[i].name,
        };
        this.attachmentOBJ.push(tempOBJ);
      }
      console.log(this.attachmentOBJ);
      console.log(this.selectedFile);
    },
    sendMail() {
      let emails = [];
      emails = this.sentto.split(",");
      let attachedfile = null;
      let attachmenttype = null;
      let attachmentName = null;

      let SentObj = null;
      if (this.selectedFile !== null) {
        SentObj = this.attachmentOBJ;
        console.log("yo");
      }
      const mailObject = {
        sentToMails: emails,
        date: this.mail.date,
        title: this.mail.title,
        sender: this.sender,
        message: this.mail.message,
        attachments: SentObj,
        id: this.mail.id,
      };
      console.log(mailObject);
      fetch(`http://localhost:8080/sendMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailObject),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send mail");
          }
          this.$router.push({ name: "inbox" });
          return response.json();
        })
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });
    },
    // getusers() {
    //   fetch(`http://localhost:8080/users`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Failed to send mail");
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       console.log(
    //         data[0].sent[1].attachment,
    //         "new",
    //         data[0].sent[1].attType
    //       );
    //       this.downloadAttachment(
    //         data[0].sent[1].attachment,
    //         "new",
    //         data[0].sent[1].attType
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error.message);
    //     });
    // },

    // async downloadAttachment(attachmentData, fileName, fileType) {
    //   try {
    //     const binaryData = atob(attachmentData);

    //     const arrayBuffer = new ArrayBuffer(binaryData.length);
    //     const view = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < binaryData.length; i++) {
    //       view[i] = binaryData.charCodeAt(i);
    //     }

    //     const blob = new Blob([arrayBuffer], {
    //       type: fileType || "application/octet-stream",
    //     });

    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = fileName;

    //     document.body.appendChild(link);
    //     link.click();

    //     document.body.removeChild(link);
    //   } catch (error) {
    //     console.error("Error downloading attachment:", error);
    //   }
    // },
  },
};
</script>

<style scoped>
.body {
  background-color: #ebe6ef;
  width: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow-y: scroll;
}
.all {
  position: relative;
  top: 50px;
  width: 88%;
  margin: auto;
  height: 700px;
}
.row {
  margin: 10px;
}
label {
  text-align: left;
  margin-right: 10px;
}
textarea {
  width: 100%;
  min-height: 200px;
  max-height: max-content;
}
.fa-brands {
  margin: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 40px;
}
textarea,
input {
  margin-right: 5px;
  display: block;
  padding: 2px 1px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ddd;
  transition: all 0.1s ease-in;
  color: black;
}
textarea,
input:focus {
  border-bottom: 5px solid #ddd;
  outline: none;
}
.attch {
  margin: 10px;
  width: max-content;
}
.btn {
  position: relative;
  margin: 10px;
  border: none;
  left: 400px;
  bottom: -20px;
}
</style>
