<template>
  <div>
    <label>Date:</label>
    <input v-model="mail.date" type="text" />

    <label>Title:</label>
    <input v-model="mail.title" type="text" />

    <label>Sender:</label>
    <input v-model="mail.sender" type="text" />

    <label>sent To:</label>
    <input v-model="sentto" type="text" />

    <label>Message:</label>
    <textarea v-model="mail.message"></textarea>

    <label>Attachment:</label>
    <input type="file" multiple ref="fileInput" @change="handleFileChange" />

    <button @click="sendMail">Send Mail</button>
    <button @click="getusers">hat</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      sentto:'',
      mail: {
        sentToMails: [],
        date: '',
        title: '',
        sender: '',
        message: '',
        id:0
      },
      attachmentOBJ:[]
    };
  },
  methods: {
    async handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files;
      for(let i=0;i<this.selectedFile.length;i++){
        let tempOBJ={
        attachment:await this.convertFileToBase64(this.selectedFile[i]),
        attType:this.selectedFile[i].type,
        attName:this.selectedFile[i].name,
        }
        this.attachmentOBJ.push(tempOBJ);
      }
      console.log(this.attachmentOBJ);
      console.log(this.selectedFile);
    },
     sendMail() {
      let emails=[];
      emails = this.sentto.split(',');
      let attachedfile=null;
      let attachmenttype=null;
      let attachmentName = null;
      
      let SentObj=null;
      if(this.selectedFile!==null){
        SentObj=this.attachmentOBJ
        console.log("yo");
      }
      const mailObject = {
        sentToMails: emails,
        date: this.mail.date,
        title: this.mail.title,
        sender: this.mail.sender,
        message: this.mail.message,
        attachments:SentObj,
        id: this.mail.id
      };
      console.log(mailObject);
      fetch(`http://localhost:8080/sendMail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailObject),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send mail');
          }
          return response.json();
        })
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
    },
    getusers(){
      fetch(`http://localhost:8080/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send mail');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log(data[0].sent[1].attachment,"new",data[0].sent[1].attType);
          this.downloadAttachment(data[0].sent[1].attachment,"new",data[0].sent[1].attType);
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    },

  async downloadAttachment(attachmentData, fileName, fileType) {
    try {
      
      const binaryData = atob(attachmentData);

      
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

      
      const blob = new Blob([arrayBuffer], { type: fileType || 'application/octet-stream' });

      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      
      document.body.appendChild(link);
      link.click();

      
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
}



  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
