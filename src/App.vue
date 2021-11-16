<template>
  <div class="app__inner">
    <LNB />
    <div class="app__page">
      <TheHeader />
      <div class="page__container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import LNB from '~/components/LNB'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    LNB,
    TheHeader
  }
}
</script>

<style lang="scss" scoped>
.app__inner {
  display: flex;

  height: 100vh;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: $color-font;

  .app__page {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  
    .page__container {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>
