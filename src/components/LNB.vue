<template>
  <nav style="width: 240px">
    <div class="header"></div>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="$store.dispatch('workspace/createWorkspace')">
        <span class="material-icons">add</span> 새로운 페이지
      </div>
    </div>
  </nav>
</template>

<script>
import WorkspaceItem from '~/components/WorkspaceItem'

export default {
  components: {
    WorkspaceItem
  },

  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces
    }
  },
  
  created () {
    this.$store.dispatch('workspace/readWorkspaces')
  }
}
</script>

<style lang="scss" scoped>
nav {
  max-width: 500px;
  min-width: 160px;
  height: 100%;
  background-color: $color-background;
  flex-shrink: 0; // 뷰포트 가로 너비가 작을 때 찌그러짐 방지
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .header {
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  ul {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .actions {
    border-top: 1px solid $color-border;

    .action {
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: $color-icon;
      cursor: pointer;
  
      &:hover {
        background-color: $color-background--hover1;
      }
  
      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }
}
</style>
