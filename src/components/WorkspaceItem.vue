<template>
  <li>
    <div
      class="title"
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
        <span class="material-icons">
          add
        </span>
        <span class="material-icons">
          delete
        </span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
