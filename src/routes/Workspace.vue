<template>
  <div class="inner">
    <div
      ref="title"
      placeholder="제목 없음"
      contenteditable
      class="title"
      @blur="onInput">
      {{ title }}
    </div>
    <div
      ref="content"
      class="content"
      contenteditable
      placeholder="내용을 입력하세요"
      @blur="onInput"
      v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.currentWorkspace.title
    },

    content() {
      return this.$store.state.workspace.currentWorkspace.content
    }
  },

  watch: {
    $route() {
      this.$store.dispatch('workspace/readWorkspace', {
        id: this.$route.params.id
      })
    }
  },

  created() {
    this.$store.dispatch('workspace/readWorkspace', {
      id: this.$route.params.id
    })
  },

  methods: {
    onInput() {
      const title = this.$refs.title.textContent
      const content = this.$refs.content.innerHTML

      if (title === this.title && content === this.content) return

      // TODO: 내용이 모두 지워졌을 때 실제로 내용 비우기
      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        title,
        content
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;

    [contenteditable] {
      outline: none;
      cursor: text;

      &.title {
        font-size: 44px;
        font-weight: 700;
        margin-bottom: 20px;
      }

      &.content {
        font-size: 16px;
        line-height: 1.8;
      }

      &:empty::before {
        content: attr(placeholder);
        color: rgba($color-font, .3);
      }
    }
  }
</style>
