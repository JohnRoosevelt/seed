<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
const router = useRouter()
const route = useRoute()
const { info: user } = $(useAccountStore())
if (user.id && !route.query.dev)
  router.replace('/user')

const _showSecret = $ref(false)
const form = $ref({
  pending: false,
  disabled: true,
  error: false,
  errorMsg: '',
  name: '',
  pwd: '',
  pwdConfirm: '',
})

watchEffect(() => {
  if (form.name)
    form.error = false

  if (form.pwd)
    form.error = false

  if (form.pwdConfirm)
    form.error = false
})

watchEffect(() => {
  if (form.error || form.pending) {
    form.disabled = true
    return
  }

  if (form.name.length < 2) {
    form.disabled = true
    form.errorMsg = '昵称长度不能少于 2 位'
    return
  }

  if (!Number.isNaN(Number(form.name))) {
    form.disabled = true
    form.errorMsg = '昵称不能是数字'
    return
  }

  if (form.pwd.length < 7) {
    form.disabled = true
    form.errorMsg = '密码长度不能少于 7 位'
    return
  }

  if (form.pwdConfirm !== form.pwd) {
    form.disabled = true
    form.errorMsg = '两次输入的密码不一致'
    return
  }

  form.errorMsg = ''
  form.disabled = false
})

async function _login() {
  form.pending = true
  const rz: any = await $fetch(`${CONST.apiHost}/user/register`, {
    method: 'POST',
    body: { name: form.name, pwd: form.pwd },
  })
  form.pending = false
  if (rz.error) {
    form.error = true
    form.errorMsg = rz.msg
    return
  }
  const { info } = $(useAccountStore())
  info.id = rz.id
  info.name = rz.name
  info.token = rz.token

  router.replace('/user')
}
</script>

<template lang="pug">
.w-full.max-w-md.flex-cx.flex-col.rounded.p-5
  .flex-cc
    span.w-20 昵称
    input.text-black.flex-1.h-12.border.rounded-2.px-2(v-model="form.name" type="account" placeholder="请输入昵称")

  .flex-cc.mt-5
    span.w-20 密码：
    .flex.flex-1.flex-cc.relative
      input.w-full.text-black.h-12.border.rounded-2.px-2(v-model="form.pwd" :type="_showSecret? 'text': 'password'" placeholder="请输入密码")
      span.i-carbon-view-filled.absolute.right-2(v-show="_showSecret" @click="_showSecret = !_showSecret")
      span.i-carbon-view-off-filled.absolute.right-2(v-show="!_showSecret" @click="_showSecret = !_showSecret")

  .flex-cc.mt-5
    span.w-20 确认密码：
    .flex.flex-1.flex-cc.relative
      input.w-full.text-black.h-12.border.rounded-2.px-2(v-model="form.pwdConfirm" :type="_showSecret? 'text': 'password'" placeholder="请输入密码")
      span.i-carbon-view-filled.absolute.right-2(v-show="_showSecret" @click="_showSecret = !_showSecret")
      span.i-carbon-view-off-filled.absolute.right-2(v-show="!_showSecret" @click="_showSecret = !_showSecret")

  .mt-5.text-red {{ form.errorMsg }}
  button.flex-cc.mt-5.rounded.h-12(:disabled="form.disabled" :class="form.disabled ? 'text-gray bg-green50' : 'bg-green400'" @click="_login")
    span.mr-2.flex.i-line-md-loading-twotone-loop(v-if="form.pending")
    span 注册

  .mt-10.flex-cc.text-blue(@click="$router.replace('login')") 已有账号？立即登录
</template>
