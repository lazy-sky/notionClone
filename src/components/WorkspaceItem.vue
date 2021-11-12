<template>
  <li>
    {{ workspace.title || '제목 없음' }}
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
