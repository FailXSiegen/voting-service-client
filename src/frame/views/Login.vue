<template>
  <div class="login container-fluid min-vh-100">
    <div class="container">
      <div
        class="login__row row align-items-center justify-content-around h-100"
      >
        <div class="login__col col-12 my-5">
          <h1 class="login__headline text-center">
            {{ localize('view.login.headline.title') }}
          </h1>
          <h2 class="login__subheadline mb-4 text-center subheader">
            {{ localize('view.login.headline.subtitle') }}
          </h2>
          <div class="login__row row justify-content-around mt-5">
            <div class="login__event mb-5 col-md-5">
              <form
                id="event-form"
                class="login__event--form p-3 border border-info"
                @submit.prevent="onLoginById"
                autocomplete="off"
              >
                <h2 class="login__headline mb-4">
                  {{ localize('view.login.headline.eventIdent') }}
                </h2>
                <div class="login__form-group form-group">
                  <label class="login__event--label" for="eventSlug">
                    {{ localize('view.login.label.eventIdent') }}
                  </label>
                  <input
                    id="eventSlug"
                    class="login__form-control form-control"
                    v-model="eventSlug"
                    type="text"
                    required="required"
                  />
                </div>
                <button
                  type="submit"
                  class="login__button btn btn-info btn-block"
                >
                  {{ localize('view.login.submitToEvent') }}
                </button>
              </form>
            </div>
            <div class="login__organizer mb-5 col-md-5">
              <form
                id="organizer-form"
                class="login__form login__form--organizer border border-primary p-3"
                @submit.prevent="onLoginUser"
              >
                <h2 class="login__form--headline mb-4">
                  {{ localize('view.login.headline.orgaLogin') }}
                </h2>
                <div class="login__form-group from-group">
                  <label class="login__label" for="username">{{
                    localize('view.organizers.username')
                  }}</label>
                  <input
                    v-model="user.username"
                    type="input"
                    name="username"
                    id="username"
                    class="login__form-control form-control"
                    required="required"
                  />
                </div>
                <div class="login__form-group form-group">
                  <label class="login__label" for="password">
                    {{ localize('view.login.label.password') }}
                  </label>
                  <input
                    id="password"
                    class="login__form-control form-control"
                    v-model="user.password"
                    type="password"
                    name="password"
                    required="required"
                    autocomplete="new-password"
                  />
                </div>
                <div class="login__form-group form-group">
                  <button class="login__button btn btn-primary btn-block mt-3">
                    {{ localize('view.login.submit') }}
                  </button>
                </div>
                <small>
                  <a href="/passwort-vergessen">
                    Passwort vergessen? Hier Link anfordern
                  </a>
                </small>
              </form>
              <div class="login__organizer border border-secondary mt-3 p-3">
                <h3 class="login__form--headline mb-4">
                  {{ localize('view.login.headline.orgaRegister') }}
                </h3>
                <router-link
                  to="/register"
                  class="login__button btn btn-secondary btn-block w-100 h-100"
                >
                  {{ localize('view.login.registerAsOrganizer') }}
                </router-link>
                <span class="w-100 d-inline-block text-center">
                  <small><b>ACHTUNG: Betastatus!</b></small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
export { default } from '@/frame/views/login.vue.js'
</script>
