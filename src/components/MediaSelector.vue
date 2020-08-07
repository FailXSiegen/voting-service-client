<template>
  <div>
      <div class="media-filter mt-2 mb-5">
        <div class="media-filter-select mb-3">
        <label for="type">{{ localize('view.media.filter.mediaType') }}</label>
        <select id="type" @change="onChangeType" class="form-control">
          <option value="1" selected="selected">LOGO (Test)</option>
        </select>
      </div>
          <form @submit.prevent="onFilter" class="form-inline justify-content-between">
        <div class="form-group mb-0">
          <label for="name" class="mr-3">{{ localize('view.media.filter.name') }}</label>
          <input v-model="filter.name" class="form-control" id="name">
        </div>
        <button type="submit" class="btn btn-primary">{{ localize('view.media.filter.submit') }}</button>
      </form>
        </div>
        <div class="media-list list-group border border-dark">
          <a v-for="(media, index) in medias" :key="index" @click.prevent="onSelect(media, index)" href="#" :class="(selectedIndex === index ? 'active' : '') + ' list-group-item list-group-item-action'">
            <img :src="media.publicPath" width="60" :alt="media.fileName" /> {{ media.fileName }}
          </a>
        </div>
      <p v-if="selectedMedia">Selected item: {{ selectedMedia }}</p>
    </div>
</template>

<script>
import { addSuccessMessage } from '../helper/alert-helper'
import { localize } from '../helper/localizatiion-helper'

export default {
  data () {
    return {
      medias: [
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 's dfsdfsdfdsf TEST lorem ipsum 3000',
          mimeType: 'sdfdf',
          relativePath: 'sdfsdfsd',
          extension: 'sfds',
          baseName: 'sfsfsdf',
          absolutePath: 'sdfsd'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        },
        {
          publicPath: 'https://via.placeholder.com/60',
          fileName: 'TEST lorem ipsum 3000'
        }
      ],
      selectedIndex: null,
      filter: {
        name: ''
      }
    }
  },
  methods: {
    onChangeType () {
      addSuccessMessage('Success', 'change type')
    },
    onFilter () {
      addSuccessMessage('Success', 'Filter')
    },
    onSelect (media, index) {
      this.selectedIndex = index
      this.$emit('select', {
        media
      })
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  },
  computed: {
    selectedMedia () {
      const media = this.medias[this.selectedIndex] ?? null
      return media !== null ? media.fileName : ''
    }
  }
}
</script>

<style scoped>
  .media-list {
    min-height: 400px;
    max-height: 400px;
    overflow-y: scroll;
  }
  a.list-group-item:hover {
    background-color: var(--light);
  }
  a.list-group-item:active,
  a.list-group-item.active,
  a.list-group-item:focus {
    background-color: var(--primary);
    color: white;
  }
</style>
