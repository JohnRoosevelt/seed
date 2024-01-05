<script setup>
definePageMeta({
  layout: 'blank',
})

const form = $ref({
  id: '',
  pending: false,
  error: false,
  errorMsg: '',
  disabled: true,
})

watchEffect(() => {
  if (String(form.id).length >= 7) {
    form.errorMsg = ''
    form.error = false
  }
})

watchEffect(() => {
  form.disabled = String(form.id).length < 7 || form.pending || form.error
  if (String(form.id).length < 7)
    form.errorMsg = '帐户长度不能少于 7 位'
})

const router = useRouter()
async function _add() {
  if (form.disabled)
    return

  try {
    form.pending = true
    const rz = await $fetch(`${CONST.apiHost}/user/login`)

    if (rz.error) {
      error = true
      tip(rz.message || 'error')
      return
    }
    router.replace('/user')
  }
  catch (e) {
    form.error = true
    form.errorMsg = `账户 ${form.id} 不存在, 请更改 id`
  }
  finally {
    form.pending = false
  }
}
</script>

<template lang="pug">
AppBacktop
  span 查找好友或群
.flex-1.w-full.p-5
  input.border.rounded-2.w-full.h-12.px-2(v-model="form.id" type="number" placeholder="请输入 ID")
  .mt-5.text-red {{ form.errorMsg }}
  button.flex-cc.mt-5.rounded.w-full.h-12(:disabled="form.disabled" :class="form.disabled ? 'text-gray bg-green50' : 'bg-green400'" @click="_add()")
    span.mr-2.flex.i-line-md-loading-twotone-loop(v-if="form.pending")
    span 查找
</template>
