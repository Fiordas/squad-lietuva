<template>
  <div class="box has-background-dark">
    <div class="columns">
      <div class="column">
        <h1 class="title">{{ $t('MANAGE.ADD_POST') }}</h1>
        <hr />
        <div class="field">
          <label class="label">{{ $t('MANAGE.POST_TITLE') }}</label>
          <div class="control">
            <input class="input" type="text" v-model="title" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('MANAGE.POST_SUMMARY') }}</label>
          <div class="control">
            <textarea class="textarea" v-model="summary" :disabled="isLoading"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('MANAGE.POST_TEXT') }}</label>
          <div class="control has-text-light">
            <no-ssr>
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, menu }">
                <div>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.bold() }"
                    @click="commands.bold"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-bold"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.italic() }"
                    @click="commands.italic"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-italic"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.strike() }"
                    @click="commands.strike"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-strikethrough"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-header-1"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-header-2"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': !isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-header-3"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small is-outlined"
                    @click="showImageUploadModal(commands.image)"
                    :disabled="isLoading"
                  >
                    <b-icon icon="image-outline"></b-icon>
                  </button>

                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': editor.activeMarkAttrs.alignment.textAlign !== 'left' }"
                    @click="commands.alignment({ textAlign: 'left' })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-align-left"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': editor.activeMarkAttrs.alignment.textAlign !== 'center' }"
                    @click="commands.alignment({ textAlign: 'center' })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-align-center"></b-icon>
                  </button>
                  <button
                    class="button is-primary is-small"
                    :class="{ 'is-outlined': editor.activeMarkAttrs.alignment.textAlign !== 'right' }"
                    @click="commands.alignment({ textAlign: 'right' })"
                    :disabled="isLoading"
                  >
                    <b-icon icon="format-align-right"></b-icon>
                  </button>
                </div>
              </editor-menu-bar>
              <div class="content">
                <editor-content :editor="editor" />
              </div>
            </no-ssr>
          </div>
        </div>
        <div class="field has-text-light">
          <b-checkbox v-model="published" :disabled="isLoading">{{ $t('MANAGE.PUBLISH_POST') }}</b-checkbox>
        </div>
        <br />
        <div class="buttons is-right">
          <nuxt-link :to="localePath('manage-news')" tag="button" class="button is-light is-inverted">{{
            $t('GENERAL.CANCEL')
          }}</nuxt-link>
          <button @click="editNewsPost" :class="{ 'is-loading': isLoading }" class="button is-primary is-outlined">
            {{ $t('GENERAL.SAVE') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

import ImageNoDrop from '~/plugins/ImageNoDrop.js'
import Alignment from '~/plugins/Alignment.js'
import ImageUploadModal from '~/components/ImageUploadModal'

export default {
  nuxtI18n: {
    paths: {
      lt: '/valdymas/naujienos/:id',
      en: '/manage/news/:id'
    }
  },
  components: {
    EditorMenuBar,
    EditorContent,
    ImageUploadModal
  },
  computed: {
    user() {
      return this.$store.getters['users/user']
    }
  },
  data() {
    return {
      editor: null,
      title: '',
      summary: '',
      published: false,
      isLoading: false
    }
  },
  created() {
    if (this.$route.params.id) {
      this.isLoading = true
      return this.$axios
        .$get(
          `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${this.$route.params.id}`
        )
        .then(async response => {
          this.sendPing()
          const postData = this.$firestoreParse(response.fields)
          this.title = postData.title
          this.summary = postData.summary
          this.editor.setContent(postData.content)
          this.published = postData.published
          this.isLoading = false
          this.interval = setInterval(() => this.sendPing(), 1000 * 5)
        })
        .catch(error => console.log(error))
    }
  },
  methods: {
    editNewsPost() {
      this.isLoading = true
      const postData = {
        title: this.title,
        content: this.editor.getHTML(),
        summary: this.summary,
        published: this.published,
        editable: true
      }
      let updateMask = ''
      Object.keys(postData).forEach(value => {
        updateMask += '&updateMask.fieldPaths=' + value
      })
      updateMask = updateMask.substring(1)
      return this.$axios
        .$patch(
          `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${this.$route.params.id}?${updateMask}`,
          {
            fields: this.$firestoreMap(postData)
          }
        )
        .then(() => {
          this.isLoading = false
          this.$router.push(this.localePath('manage-news'))
        })
        .catch(error => console.log(error))
    },
    showImageUploadModal(command) {
      this.$modal.open({
        parent: this,
        component: ImageUploadModal,
        hasModalCard: true,
        props: { postId: this.$route.params.id },
        events: {
          addImages: imageSources => {
            imageSources.forEach(src => {
              if (src) {
                command({ src })
              }
            })
          }
        }
      })
    },
    async sendPing() {
      console.log('Sending ping')
      const result = await this.$axios.$patch(
        `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${this.$route.params.id}?updateMask.fieldPaths=editPing&updateMask.fieldPaths=editable`,
        {
          fields: this.$firestoreMap({ editPing: Date.now(), editable: false })
        }
      )
      console.log(result)
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new ImageNoDrop(),
        new Alignment()
      ],
      content: '',
      editable: false
    })
  },
  watch: {
    isLoading() {
      this.editor.setOptions({
        editable: !this.isLoading
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$dialog.confirm({
      title: this.$t('GENERAL.CONFIRM_ACTION'),
      message: this.$t('GENERAL.CONFIRM_LEAVE'),
      confirmText: this.$t('GENERAL.SAVE_AND_LEAVE'),
      cancelText: this.$t('GENERAL.CANCEL'),
      type: 'is-warning',
      hasIcon: true,
      onConfirm: () => next()
    })
  },
  beforeDestroy() {
    this.editor.destroy()
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.button {
  margin-bottom: 10px;
}
.content {
  outline: 1px solid grey;
  padding: 10px;
  min-height: 30vh;
}
</style>
