<template>
  <div class="inner">
    <div class="title">
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
  }
}
</script>
