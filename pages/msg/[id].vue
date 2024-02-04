<script setup>
definePageMeta({
  layout: 'blank',
})

const route = useRoute()
const { id } = $(route.params)
const { getRelationById, msgs, getMsgs, addMsg, info, clearMsgs: _clearMsgs } = $(useAccountStore())

let user = $ref({})
onMounted(async () => {
  user = await getRelationById(id)
  await getMsgs(id)
})
Logger.log(id, user, msgs)

let content = $ref('')
let disabled = $ref(true)
watchEffect(() => {
  if (content)
    disabled = false
  else
    disabled = true
})
async function send() {
  if (disabled)
    return
  Logger.log('send: ', content)
  // const msg = { type: 'text', content, toId: id, fromId: info.id }
  const msg = { type: 'text', content, toId: id, fromId: info.id, _id: newid() }
  const doc = await addMsg(msg)
  Logger.log({ doc })
  WSReq({ type: 'MSG', payload: msg })
  content = ''
  disabled = true
}

onMounted(() => {
  keyboardAdapt()
  if (WS.ws.readyState !== 1)
    WS.ws = WS.connect()
})

function keyboardAdapt() {
  let adjunctKeydown = false
  const textareaDom = document.querySelector('textarea')
  if (textareaDom) {
    // 键盘按下时
    textareaDom.onkeydown = (e) => {
      // Logger.log('onkeydown', e.keyCode)
      if ([16, 17, 18, 93].includes(e.keyCode)) {
        // 按下了shift ctrl alt windows键
        adjunctKeydown = true
      }
      if (e.keyCode === 13 && !adjunctKeydown) {
        e.preventDefault()
        // 执行发送
        setTimeout(() => {
          send()
        }, 300)
      }
    }
    textareaDom.onkeyup = (e) => {
      // 松开adjunct键
      if ([16, 17, 18, 93].includes(e.keyCode))
        adjunctKeydown = false
    }
  }
}
</script>

<template lang="pug">
AppBacktop
  span(@click="_clearMsgs(id)") {{user.name}}
.flex-1.flex-col.bg-gray-100.space-y-4.w-full.p-2
  //- .h-40.bg-red 1
  //- .h-40.bg-green 2
  //- .h-40.bg-green 3
  //- .h-40.bg-green 4
  //- .h-40.bg-green 5
  //- .h-40.bg-green 6
  template(v-if="msgs.length")
    template(v-for="(msg, index) of msgs" :key="index")
      .flex.items-stretch.gap-x-2(:class="[msg.fromId === info.id ? 'flex-row-reverse': 'flex-row']" :id="msg._id")
        .flex-cx
          Avatar(:id="msg.fromId")
        .flex-ce.text-base.px-2.py-1.rounded(:class="[msg.fromId === info.id ? 'bg-green text-white': 'bg-gray200 text-black', 'max-w-80%']" v-html="msg.content")
        //- .flex-ce.text-base.px-2.py-1.rounded(class="max-w-75%" :class="[msg.fromId === info.id ? 'bg-blue': 'bg-gray']") {{ msg }}
        //- template
        .flex-ce(v-if="msg.sendAt == -1")
          .i-line-md-loading-twotone-loop
        .flex-col.self-end.space-y-1.text-gray.text-xs(v-else)
          .flex.justify-end(v-if="msg.fromId === info.id") {{ msg.readAt == -1 ? '未读' : '已读' }}
          .flex {{ $dayjs(msg.createdAt).format('LTS') }}

  .text-gray.flex-cc.text-xs(v-else) 暂无聊天记录
.w-full.h72px
.h-72px.w-full.p-5.flex-ce.space-x-2.fixed.bottom-0.bg-white
  textarea.flex-1.border.rounded-2.p-2(rows="1" v-model="content")
  span.p2.rounded-2.text-sm(@click="send" :class="[disabled? 'bg-gray200 text-black': 'bg-green text-white']") 发送
</template>
