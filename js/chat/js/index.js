;((doc, Socket, storage, location) => {
  const oList = doc.querySelector('#list') // 列表
  const oMsg = doc.querySelector('#message') // 输入框
  const oSendBtn = doc.querySelector('#send') // 发送按钮
  const ws = new Socket('ws:localhost:8888') // 创建websocket实例
  let username = ''

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oSendBtn.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleSendBtnClick(e) {
    console.log('Websocket send', e)
    const msg = oMsg.value
    if (!msg.trim().length || ws.readyState === 0) {
      if (ws.readyState === 0) console.log('Websocket未连接')
      return
    }
    ws.send(
      JSON.stringify({
        user: username,
        dateTime: new Date().getTime(),
        message: msg,
      })
    )

    oMsg.value = ''
  }

  function handleOpen(e) {
    console.log('Websocket open', e)
    username = storage.getItem('username')

    if (!username) {
      location.href = 'entry.html'
      return
    }
  }

  function handleClose(e) {
    console.log('Websocket close', e)
  }

  function handleError(e) {
    console.log('Websocket error', e)
  }

  function handleMessage(e) {
    console.log('Websocket message', e)
    const msgData = JSON.parse(JSON.stringify(e.data))
    oList.appendChild(createMsg(msgData))
  }

  function createMsg(data) {
    const { user, dateTime, message } = data
    const oItem = doc.createElement('li')
    oItem.innerHTML = `
      <p>
        <span>${user}</span>
        <i>${new Date(dateTime)}</i>
      </p>
      <p>消息：${message}</p>
    `

    return oItem
  }

  init()
})(document, WebSocket, localStorage, location)
