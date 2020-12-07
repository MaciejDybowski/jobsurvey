
<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col xl="6" lg="8" md="10" sm="12">
            <v-sheet rounded="lg">
              <div class="nav">
                <p>Websocket</p>
              </div>
              <div class="connections">
                <div class="btn-con">
                  <v-btn
                    primary
                    color="primary"
                    :disabled="connected == true"
                    @click.prevent="connect"
                    >Connect</v-btn
                  >
                </div>

                <div class="btn-con">
                  <v-btn
                    primary
                    color="error"
                    :disabled="connected == false"
                    @click.prevent="disconnect"
                    class="btn-con"
                    >Disconnect</v-btn
                  >
                </div>
              </div>
              <div class="input-text">
                <label for="name">What is your name?</label>
                <input
                  type="text"
                  v-model="send_message"
                  placeholder="Your name here..."
                />
                <div class="btn-con">
                  <v-btn
                    primary
                    color="primary"
                    type="submit"
                    @click.prevent="send"
                    >Send</v-btn
                  >
                </div>
              </div>
              <div class="informations">
                <table id="conversation" class="table table-striped">
                  <thead>
                    <tr>
                      <th>Greetings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in received_messages" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "websocketdemo",
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false,
    };
  },
  methods: {
    send() {
      //console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send("/survey/submit", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8080/test");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          //console.log(frame);
          this.stompClient.subscribe("/prefix/messages", (tick) => {
            console.log("to jest tick");
            console.log(tick);
            this.received_messages.push(JSON.parse(tick.body).content);
          });
        },
        (error) => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
  },
  mounted() {
    // this.connect();
  },
};
</script>

<style lang="scss">
.connections {
  padding: 20px 20px;
  display: flex;

  .btn-con {
    padding: 10px 10px;
  }
}
.input-text {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  input {
    margin-left: 10px;
  }
}
.informations {
  display: flex;
  padding: 20px 20px;
}
</style>