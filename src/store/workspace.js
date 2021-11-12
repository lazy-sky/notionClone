import axios from 'axios'
import router from '~/routes'

export default {
  namespaced: true,
  state: () => ({
    workspaces: [],
    currentWorkspace: {}
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
    readWorkspaces() {

    },

    // Item
    readWorkspace() {

    },

    async createWorkspace({ commit }) {
      const currentWorkspace = await request({
        method: 'POST',
        data: {
          title: ''
        }
      })

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

    updateWorkspace() {

    },

    deleteWorkspace() {

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
