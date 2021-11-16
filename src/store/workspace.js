import axios from 'axios'
import router from '~/routes'

export default {
  namespaced: true,
  state: () => ({
    workspaces: [],
    currentWorkspace: {},
    currentWorkspacePath: []
  }),

  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },

  actions: {
    // List
    async readWorkspaces({ commit }) {
      const workspaces = await request({
        method: 'GET'
      })

      commit('assignState', {
        workspaces
      })

      console.log(workspaces)
    },

    // Item
    async readWorkspace({ commit }, payload) {
      const { id } = payload

      const workspace = await request({
        method: 'GET',
        workspaceId: id
      })

      commit('assignState', {
        currentWorkspace: workspace
      })
    },

    async createWorkspace({ commit, dispatch }, payload = {}) {
      const { parentId } = payload

      const currentWorkspace = await request({
        method: 'POST',
        data: {
          title: '',
          parentId
        }
      })

      await dispatch('readWorkspaces')

      commit('assignState', {
        currentWorkspace
      })

      // router === this.$router
      router.push({
        name: 'Workspace',
        params: {
          id: currentWorkspace.id
        }
      })
    },

    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content, poster } = payload

      await request({
        method: 'PUT',
        workspaceId: id,
        data: {
          title,
          content,
          poster
        }
      })

      await dispatch('readWorkspaces')
    },

    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload

      await request({
        method: 'DELETE',
        workspaceId: id
      })

      // 프론트에서 해결해도 되는 걸 다시 요청하는 것이기 때문에 좋은 방법은 아니다. 다만 매우 편리하다.
      await dispatch('readWorkspaces')

      if (id === router.currentRoute.value.params.id) {
        router.push({
          name: 'Workspace',
          params: {
            id: state.workspaces[0].id
          }
        })
      }
    },

    findWorkspacePath({ state, commit }) {
      const currentWorkspaceId = router.currentRoute.value.params.id

      function _find(workspace, parents) {
        if (workspace.id === currentWorkspaceId) {
          commit('assignState', {
            currentWorkspacePath: [...parents, workspace]
          })

          console.log(state.currentWorkspacePath)
        }

        if (workspace.children) {
          workspace.children.forEach(ws => _find(ws, [...parents, workspace]))
        }
      }

      state.workspaces.forEach(workspace => _find(workspace, []))
    }
  }
}

async function request(options) {
  const { workspaceId = '', method, data } = options

  const { data: dataToReturn } = await axios({ // 이름이 중복돼서 data를 꺼내오는데 dataToReturn으로 이름을 바꾸겠다.
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${workspaceId}`,
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'abcde'
    },
    data
  })

  return dataToReturn
}
