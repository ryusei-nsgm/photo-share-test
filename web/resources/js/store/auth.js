const state = {
  user: null
}

const getters = {
  // 確実に真偽値を返すために二重否定
  check: state => !! state.user,
  // user が null の場合に呼ばれてもエラーが発生しないように空文字を返す
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  // user state を更新する関数
  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    // commit() => ミューテーションの呼び出し setUserでstate更新
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  // namespaced:true モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できる
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}