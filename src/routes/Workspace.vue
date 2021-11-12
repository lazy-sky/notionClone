<template>
  <h1>Workspace Page</h1>
</template>

<script>
export default {
  created () {
    // this.$store.dispatch('workspace/createWorkspace')
    this.$store.dispatch('workspace/readWorkspaces')
  }
}
</script>
