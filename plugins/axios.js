export default function({ $axios, store }) {
  $axios.onRequest(request => {
    if (store.state.auth.token) {
      request.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`
    }
  })
}
