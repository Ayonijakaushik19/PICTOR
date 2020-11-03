export const state = () => ({
  username: 'Guest',
  email: '',
  password: '',
  logged: false,
  currentCanvas: {},
  savedCanvas: [],
})

export const mutations = {
  register(state, un, em, pw) {
    if (state.logged === true) throw new Error('Already Registered')
    state.username = un
    state.email = em
    state.password = pw
    state.logged = true
  },
  logout(state) {
    if (state.logged === false) throw new Error('Not logged in')
    state.username = 'Guest'
    state.email = ''
    state.password = ''
    state.logged = false
  },
  currentCanvas(state, val) {
    state.currentCanvas = val
  },
  savedCanvas(state, val) {
    state.savedCanvas.push(val)
  },
  deleteSaved(state, id) {
    state.savedCanvas.splice(id, 1)
  },
}
