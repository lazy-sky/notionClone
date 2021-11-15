<template>
  <li>
    <div
      :style="{ paddingLeft: `${14 * depth}px` }"
      class="title"
      :class="{ active: $route.params.id === workspace.id }"
      @click="$router.push({
        name: 'Workspace',
        params: {
          id: workspace.id
        }
      })">
      <span class="material-icons">
        play_arrow
      </span>
      <span class="text">
        {{ workspace.title || '제목 없음' }}
      </span>
      <div class="actions">
        <span
          class="material-icons"
          @click.stop="createWorkspace">
          add
        </span>
        <span
          class="material-icons"
          @click.stop="deleteWorkspace">
          delete
        </span>
      </div>
    </div>
    <ul v-if="hasChildren">
      <WorkspaceItem
        v-for="ws in workspace.children"
        :key="ws.id"
        :workspace="ws"
        :depth="depth + 1" />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => ({})
    },

    depth: {
      type: Number,
      default: 1
    }
  },

  computed: {
    hasChildren() {
      return this.workspace.children && this.workspace.children.length
    }
  },

  methods: {
    createWorkspace() {
      this.$store.dispatch('workspace/createWorkspace', {
        parentId: this.workspace.id
      })
    },

    deleteWorkspace() {
      this.$store.dispatch('workspace/deleteWorkspace', {
        id: this.workspace.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  user-select: none;

  .title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    height: 30px;
    padding: 0 14px;
    position: relative;
    color: rgba($color-font, .7);

    &:hover {
      background-color: $color-background--hover1;
      padding-right: 4px;

      .actions {
        display: flex;
      }
    }

    &.active {
      .text {
        font-weight: 700;
        color: rgba($color-font, .8);
      }
    }

    .material-icons {
      font-size: 18px;
      color: $color-icon;
      margin-right: 4px;

      &:hover {
        background-color: $color-background--hover2;
      }

      &.active {
        transform: rotate(90deg);
      }
    }

    .text {
      flex-grow: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .actions {
      display: none;
      align-items: center;
    }
  }

  .no-children {
    color: rgba($color-font, .35);
    height: 30px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
