<template>
  <div class="app__inner">
    <LNB />
    <div class="app__page">
      <RouterView />
    </div>
  </div>
</template>

<script>
import LNB from '~/components/LNB'

export default {
  components: {
    LNB
  }
}
</script>

<style lang="scss" scoped>
.app__inner {
  display: flex;

  height: 100vh;

  font-family: 'Noto Sans KR', sans-serif;
  
  .app__page {
    flex-grow: 1;

    box-sizing: border-box;
    border: 4px solid red;
    height: 100%;
  }
}
</style>
