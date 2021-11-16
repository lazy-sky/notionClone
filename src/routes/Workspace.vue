<template>
  <section :key="$route.params.id">
    <div class="inner">
      <div
        class="poster"
        @click="triggerInput">
        <img
          v-if="poster"
          :src="poster"
          alt="poster" />
        <input
          ref="inputPoster"
          type="file"
          @change="selectFile" />
        <div
          v-if="poster"
          class="delete-poster"
          @click.stop="deletePoster">
          <span class="material-icons">
            close
          </span>
        </div>
      </div>
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
  </section>
</template>

<script>
export default {
  computed: {
    poster() {
      return this.$store.state.workspace.currentWorkspace.poster
    },

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

      this.$store.dispatch('workspace/findWorkspacePath')
    }
  },

  created() {
    this.$store.dispatch('workspace/readWorkspace', {
      id: this.$route.params.id
    })
  },

  methods: {
    triggerInput() {
      // 강제 이벤트 발생
      this.$refs.inputPoster.dispatchEvent(new MouseEvent('click'))
    },

    selectFile(event) {
      const { files } = event.target

      for(const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          const poster = e.target.result

          // 업로드
          this.$store.dispatch('workspace/updateWorkspace', {
            id: this.$route.params.id,
            poster
          })

          // 갱신
          this.$store.commit('workspace/assginState', {
            currentWorkspace: {
              ...this.$store.state.workspace.currentWorkspace,
              poster
            }
          })
        })
      }
    },

    deletePoster() {
      // 갱신
      this.$store.commit('workspace/assginState', {
        currentWorkspace: {
          ...this.$store.state.workspace.currentWorkspace,
          poster: null
        }
      })

      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        poster: '-1'
      })
    },

    onInput() {
      const title = this.$refs.title.textContent
      const content = this.$refs.content.innerHTML

      if (title === this.title && content === this.content) return

      if (!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = ''
      }

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
section {
  padding: 100px 0 200px;

  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;

    .poster {
      min-height: 30px;
      max-height: 300px;
      margin-bottom: 30px;
      border-radius: 8px;
      background-color: $color-background;
      background-size: cover;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      position: relative;
      
      &:hover {
        background-color: $color-background--hover1;
      }
  
      img {
        width: 100%;
      }
      
      input[type="file"] {
        display: none;
      }
  
      .delete-poster {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        opacity: .3;
        transition: .2s;
    
        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }
    
        span {
          font-size: 20px;
        }
      }
    }
  }

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
