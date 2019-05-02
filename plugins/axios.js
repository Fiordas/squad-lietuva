export default function({ $axios, store }) {
  $axios.onRequest(request => {
    if (request.url.includes('https://firestore.googleapis.com/v1/')) {
      if (store.getters['auth/token']) {
        request.headers.common['Authorization'] = `Bearer ${store.getters['auth/token']}`
      }
    }
  })
}
