<script setup>
const { id } = defineProps(['id'])
</script>

<template>
  <css-doodle :seed="id" use="var(--rule)" />
</template>

<style scoped>
css-doodle {
  --rule: (
    @grid: 1 / 28px;
    background-color: rgba(128, 128, 128, 0.3);
    border-radius: 50%;
    background-size: 100%;
    background-position: center;
    background-image: @doodle(
      @grid: 1 / 100%;
      @size: 4px;
      font-size: 4px;
      color: hsl(@r240, 30%, 50%);
      box-shadow: @m3x5(
        calc(4em - @nx * 1em) calc(@ny * 1em) @p(@m3(currentColor),
        @m2(transparent)),
        calc(2em + @nx * 1em) calc(@ny * 1em) @lp
      );
    );
  )
}
</style>
