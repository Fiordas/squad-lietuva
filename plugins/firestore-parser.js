import FireStoreParser from 'firestore-parser'

export default ({ app }, inject) => {
  inject('firestoreParse', data => FireStoreParser(data))
}
