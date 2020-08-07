<template>
  <div class="overview-container">
    <app-header :headline="headline"></app-header>
    <slot name="alerts"></slot>
    <app-views></app-views>
  </div>
</template>

<script>
import AppHeader from './../components/Header'
import AppViews from './../components/overview/Views'

export default {
  components: {
    AppHeader,
    AppViews
  },
  data () {
    return {
      headline: 'Overview'
    }
  }
}
</script>
