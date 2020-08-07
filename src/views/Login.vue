<template>
  <div class="login-container">
    <div id="logo" class="mb-4">
      <div class="bg-dark d-flex justify-content-center p-3">
          <img alt="Vue logo" src="../assets/logo.png" width="120">
      </div>
    </div>
    <div class="col-12 col-md-auto">
        <div id="login-row" class="row justify-content-center align-items-center">
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <form @submit.prevent="onLogin" id="login-form" class="form" action="" method="post">
                <h3 class="text-dark mb-4">{{ localize('view.login.headline') }}</h3>
                <div class="form-group">
                  <label for="email" class="text-dark">{{ localize('view.login.emailLabel') }}</label><br>
                  <input v-model="user.userEmail" type="text" name="email" id="email" class="form-control">
                </div>
                <div class="form-group">
                  <label for="password" class="text-dark">{{ localize('view.login.passwordLabel') }}</label><br>
                  <input v-model="user.password" type="password" name="password" id="password" class="form-control">
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block float-right">{{ localize('view.login.submit') }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { localize } from '../helper/localizatiion-helper'

export default {
  data () {
    return {
      user: {
        userEmail: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser: function () {
      this.login(this.user).then(() => this.$router.push('/dashboard'))
    },
    onLogin () {
      this.loginUser()
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>

<style>

</style>
