<template>
  <div class="home">

    <ul>
      <li
        v-for="item of msgList"
        :key="item.id"
      >
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dateTime) }}</span>
        </p>
        <p>消息：{{ item.msg }}</p>
      </li>
    </ul>

    <input
      type="text"
      placeholder="请输入消息"
      v-model="msg"
    />
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
      msg: '',
      username: '',
      msgList: []
    }
  },
  mounted () {
    this.$socketApi.getSock(this.getSocketResult())
  },
  methods: {
    handleSendBtnClick () {
      this.$socketApi.sendSock('dddd', this.getSocketResult)
    },
    getSocketResult (res) {
      if (!res) return
      console.log(res)
    }
  }
}
</script>
