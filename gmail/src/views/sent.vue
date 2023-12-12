<template>
  <div>
    <label>Date:</label>
    <input v-model="mail.date" type="text" />

    <label>Title:</label>
    <input v-model="mail.title" type="text" />

    <label>Sender:</label>
    <input v-model="mail.sender" type="text" />

    <label>Message:</label>
    <textarea v-model="mail.message"></textarea>

    <label>Attachment:</label>
    <input type="file" ref="fileInput" @change="handleFileChange" />

    <button @click="sendMail">Send Mail</button>
    <button @click="getusers">hat</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      mail: {
        sentToMails: ["bahaa@gmail.com"],
        date: '',
        title: '',
        sender: '',
        message: '',
      },
    };
  },
  methods: {
    handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files[0];
      console.log(this.selectedFile.type);
    },
    async sendMail() {
      const mailObject = {
        sentToMails: this.mail.sentToMails,
        date: this.mail.date,
        title: this.mail.title,
        sender: this.mail.sender,
        message: this.mail.message,
        attachment: await this.convertFileToBase64(this.selectedFile),
        attType:this.selectedFile.type
      };

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
          this.downloadAttachment(data[0].sent[0].attachment,"new",data[0].sent[0].attType);
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
