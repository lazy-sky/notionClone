<template>
  <nav style="width: 240px">
    <div class="header"></div>
    <ul>
      <li
        v-for="workspace in workspaces"
        :key="workspace.id">
        {{ workspace.title || '제목 없음' }}
      </li>
    </ul>
    <div class="actions"></div>
  </nav>
</template>

<script>
export default {
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces
    }
  }
}
</script>
