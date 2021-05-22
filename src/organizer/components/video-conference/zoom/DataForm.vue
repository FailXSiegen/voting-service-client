<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>title *</label>
      <input v-model="meeting.title" required="required" class="form-control">
    </div>
    <div class="form-group">
      <label>apiKey *</label>
      <input v-model="meeting.apiKey" required="required" class="form-control">
    </div>
    <div class="form-group">
      <label>apiSecret *</label>
      <input v-model="meeting.apiSecret" required="required" class="form-control">
    </div>
    <div class="form-group">
      <label>meetingId *</label>
      <input v-model="meeting.meetingId" required="required" class="form-control">
    </div>
    <div class="form-group">
      <label>meetingPassword</label>
      <input v-model="meeting.meetingPassword" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    meeting: {
      type: Object,
      required: false,
      default () {
        return {
          title: '',
          apiKey: '',
          apiSecret: '',
          meetingId: '',
          meetingPassword: ''
        }
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', {
        meeting: this.meeting
      })
    }
  }
}
</script>
