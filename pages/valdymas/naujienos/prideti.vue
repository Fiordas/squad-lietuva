<template>
  <div class='box has-background-dark'>
    <div class='columns'>
      <div class='column'>
        <h1 class='title'>Prideti naujieną</h1>
        <hr />
        <div class='field'>
          <label class='label'>Pavadinimas</label>
          <div class='control'>
            <input class='input' type='text' v-model='title' />
          </div>
        </div>
        <div class='field'>
          <label class='label'>Santrauka</label>
          <div class='control'>
            <textarea class='textarea' v-model='summary'></textarea>
          </div>
        </div>
        <div class='field'>
          <label class='label'>Tekstas</label>
          <div class='control has-text-light'>
            <no-ssr>
              <editor-menu-bar :editor='editor' v-slot='{ commands, isActive, menu }'>
                <div>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.bold() }' @click='commands.bold'>
                    <b-icon icon='format-bold'></b-icon>
                  </button>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.italic() }' @click='commands.italic'>
                    <b-icon icon='format-italic'></b-icon>
                  </button>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.strike() }' @click='commands.strike'>
                    <b-icon icon='format-strikethrough'></b-icon>
                  </button>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.heading({ level: 1 }) }' @click='commands.heading({ level: 1 })'>
                    <b-icon icon='format-header-1'></b-icon>
                  </button>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.heading({ level: 2 }) }' @click='commands.heading({ level: 2 })'>
                    <b-icon icon='format-header-2'></b-icon>
                  </button>
                  <button class='button is-primary is-small' :class='{ "is-outlined": !isActive.heading({ level: 3 }) }' @click='commands.heading({ level: 3 })'>
                    <b-icon icon='format-header-3'></b-icon>
                  </button>
                </div>
              </editor-menu-bar>
              <div class='content'>
                <editor-content :editor='editor' />
              </div>
            </no-ssr>
          </div>
        </div>
        <br />
        <div class='buttons is-right'>
          <nuxt-link to='/valdymas/naujienos' tag='button' class='button is-light is-inverted'>Atšaukti</nuxt-link>
          <button @click='createNewsPost' class='button is-primary is-outlined'>Išsaugoti</button>
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

export default {
  components: {
    EditorMenuBar,
    EditorContent
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
      summary: ''
    }
  },
  methods: {
    createNewsPost() {
      this.$store.dispatch('news/createNewsPost', {
        title: this.title,
        content: this.editor.getHTML(),
        summary: this.summary,
        authorName: this.user.username,
        authorId: this.user.userId
      })
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
        new History()
      ],
      content: `
          <h1>Antraštė</h1>
          <p>Pastraipa.</p>
        `
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
</style>

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
