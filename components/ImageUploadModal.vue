<template>
  <div class="modal-card" style="width: auto">
    <section class="modal-card-body has-text-centered">
      <h1 class="title">{{ $t('IMAGE_UPLOAD.TITLE') }}</h1>
      <div class="field has-addons" v-for="(input, index) in linkInputCount" :key="index">
        <p class="control">
          <a class="button is-static">
            <b-icon icon="link"></b-icon>
          </a>
        </p>
        <p class="control is-expanded">
          <input v-model="linkFiles[index]" class="input" type="text" placeholder="imgur.com" />
        </p>
        <p class="control">
          <a @click="linkInputCount++" class="button is-primary">
            <b-icon icon="plus-circle-outline"></b-icon>
          </a>
        </p>
      </div>

      <div class="is-divider" :data-content="$t('GENERAL.OR').toUpperCase()"></div>

      <section>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop>
            <section class="section">
              <div class="content has-text-centered has-text-light">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>{{ $t('IMAGE_UPLOAD.DRAG_OR_SELECT_IMAGES') }}</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
            {{ file.name }}
            <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
          </span>
        </div>
      </section>

      <br />

      <button @click="$parent.close()" class="button is-light is-inverted is-pulled-left">
        {{ $t('GENERAL.CANCEL') }}
      </button>
      <button @click="addImages()" class="button is-primary is-outlined is-pulled-right">
        {{ $t('GENERAL.ADD') }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: ['postId'],
  data() {
    return {
      linkInputCount: 1,
      linkFiles: [],
      dropFiles: [],
      imageSources: []
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    async addImages() {
      if (this.linkFiles && this.linkFiles.length > 0) {
        this.linkFiles.forEach(link => {
          this.imageSources.push(link)
        })
      }

      if (this.dropFiles && this.dropFiles.length > 0) {
        await Promise.all(
          this.dropFiles.map(async (file, index) => {
            const formData = new FormData()
            formData.append('file', file, file.name)

            const result = await this.$axios.$post(
              `https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o?name=newsImages/${this.postId}/${index}_${file.name}`,
              formData
            )
            this.imageSources.push(
              `https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/newsImages%2F${
                this.postId
              }%2F${result.name.split('/').pop()}?alt=media&token=${result.downloadTokens}`
            )
          })
        )
      }

      if (!this.imageSources || !this.imageSources.length > 0) {
        return
      }
      this.$emit('addImages', this.imageSources)
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
.is-divider::after {
  background: #4a4a4a;
  color: #dbdbdb;
}

.tags {
  max-width: 300px;
}

.content {
  max-width: 300px;
}
</style>
