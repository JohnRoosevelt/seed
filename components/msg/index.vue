<script setup>
const { item } = defineProps(['index', 'item'])

const { removeRelation, updateRelation } = $(useAccountStore())

const router = useRouter()
const _text = $computed(() => {
  if (item.status === 1) {
    if (item.isReq)
      return '好友申请已经发送'
    else
      return '请求加为好友'
  }
  if (item.text)
    return item.text.length > 12 ? `${item.text.slice(0, 12)} ...` : item.text
  else
    return '暂无聊天记录'
})

function _onClick() {
  if (item.status === 2) {
    router.push(`/msg/${item._id}`)
    return
  }

  Logger.log(item)
}

async function _userAction(isAggree) {
  // Logger.log(isAggree, item)
  WSReq({ type: 'FRIENDRES', payload: { toId: item._id, toName: item.name, isAggree } })
  await updateRelation({ ...item, status: isAggree ? 2 : 3, text: isAggree ? '你同意了对方的好友请求' : '你拒绝了对方的好友请求' })
}

async function _userDel() {
  WSReq({ type: 'FRIENDDEL', payload: { toId: item._id } })
  await removeRelation(item._id)
}
</script>

<template lang="pug">
.w-full.bg-white.bg-red100.flex-bc.p-4(@click="_onClick")
  .i-carbon-group-presentation.text-4xl(v-if="item.isGroup")
  Avatar(:id="item._id")(v-else)
  .flex-col.flex-1.ml-2
    .flex-bc.text-xs
      .text-base {{ item.name }}
      .text-gray {{ $dayjs(item.createdAt).format('L LTS') }}
    .flex.text-gray.text-sm.relative {{_text}}
      .absolute.right-0.space-x-8.flex-cc.text-base(v-if="item.status === 1 && !item.isReq")
        .flex-1.text-red(@click.stop="_userAction(false)") 忽略
        .flex-1.text-green(@click.stop="_userAction(true)") 同意
      .absolute.right-0.space-x-8.flex-cc.text-base(v-else)
        .flex-1.text-red(@click.stop="_userDel") 删除
</template>
