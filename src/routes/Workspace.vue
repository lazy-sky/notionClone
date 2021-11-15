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
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.currentWorkspace.title
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

      if (title === this.title) return

      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        title,
        content: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 100px 0 200px;

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
}
</style>
