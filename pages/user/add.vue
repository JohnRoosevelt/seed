<script setup>
definePageMeta({
  layout: 'blank',
})

const Router = useRouter()

const { addRelation, getRelationById } = $(useAccountStore())

const form = $ref({
  id: '1000008',
  pending: false,
  error: false,
  errorMsg: '',
  disabled: true,
  rz: [],
})

watchEffect(() => {
  if (String(form.id).length >= 7) {
    form.errorMsg = ''
    form.error = false
    form.rz = []
  }
})

watchEffect(() => {
  form.disabled = String(form.id).length < 7 || form.pending || form.error
  if (String(form.id).length < 7)
    form.errorMsg = '帐户长度不能少于 7 位'
})

async function _find() {
  if (form.disabled)
    return

  const doc = await getRelationById(form.id)
  if (doc) {
    form.rz = [doc]
    // form.rz = [doc].map(i => ({ ...i, id: i._id }))
    return
  }

  try {
    form.pending = true
    const rz = await Req(`/account/find`, {
      method: 'POST',
      body: { id: form.id },
    })

    if (rz.error) {
      error = true
      tip(rz.message || 'error')
      return
    }
    Logger.log({ rz })
    form.rz = rz
  }
  catch (e) {
    form.error = true
    form.errorMsg = `账户 ${form.id} 不存在, 请更改 id`
  }
  finally {
    form.pending = false
  }
}
async function _send({ name, _id, id }) {
  if (_id)
    return
  try {
    const doc = await getRelationById(id)
    if (!doc) {
      addRelation({ _id: id, type: 1, name, status: 1, isReq: true })
      WSReq({ type: 'FRIENDREQ', payload: { toId: id, toName: name } })
    }
  }
  catch (e) {
    Logger.trace(e)
  }
  Router.replace('/')
}

// onBeforeRouteLeave(() => form.rz = [])
</script>

<template lang="pug">
AppBacktop
  span 查找好友或群
.flex-1.w-full.p-5
  input.border.rounded-2.w-full.h-12.px-2(v-model="form.id" type="number" placeholder="请输入 ID")
  .mt-5.text-red {{ form.errorMsg }}
  button.flex-cc.mt-5.rounded.w-full.h-12(:disabled="form.disabled" :class="form.disabled ? 'text-gray bg-green50' : 'bg-green400'" @click="_find()")
    span.mr-2.flex.i-line-md-loading-twotone-loop(v-if="form.pending")
    span 查找
  .w-full.mt-5(v-if="form.rz.length")
    .w-full(v-for="(item, index) of form.rz" :key="index")
      .w-full.flex-bc
        .flex-cc.space-x-2
          .text-xl.i-carbon-image
          span {{ item.name }}
        .text-blue.text-sm.px-2.py-1.border.rounded(@click="_send(item)") {{ item._id ? '等待验证': '添加好友' }}
</template>
