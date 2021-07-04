<template>
  <div class="iframe-container"></div>
</template>

<script>
import { ZoomMtg } from '@zoomus/websdk'

export default {
  data () {
    return {
      src: '',
      meetConfig: {},
      signature: {}
    }
  },
  props: {
    nickname: String,
    meetingId: String,
    password: String,
    returnUrl: String
  },
  mounted () {
    document.getElementById('zmmtg-root').style.display = 'block'

    // eslint-disable-next-line
    console.log('checkSystemRequirements')
    // eslint-disable-next-line
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()))

    // CDN version default
    ZoomMtg.setZoomJSLib(
      'https://dmogdx0jrul3u.cloudfront.net/1.9.6/lib',
      '/av'
    )
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareJssdk()
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('de-DE')
    ZoomMtg.i18n.reload('de-DE')

    var API_KEY = 'O7OouRYfS--ru2f-HFyzgQ'
    var API_SECRET = 'bT7DdTd2cuw89ecX0OqNVenJ9Jb3soI6Ovsz'

    var me = this
    // Meeting config object
    this.meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: this.meetingId,
      userName: this.nickname,
      passWord: this.password,
      leaveUrl: this.returnUrl,
      role: 0,
      lang: 'de-DE',
      china: false,
      userEmail: ''
    }
    me.setCookie('meeting_number', me.meetingId)
    me.setCookie('meeting_pwd', me.password)

    // Generate Signature function
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: me.meetConfig.meetingNumber,
      apiKey: me.meetConfig.apiKey,
      apiSecret: me.meetConfig.apiSecret,
      role: me.meetConfig.role,
      success: function (res) {
        me.join(me, res)
      }
    })
  },
  methods: {
    setCookie (cname, cvalue) {
      var exdays = 1
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    join (me, res) {
      // eslint-disable-next-line
      console.log('success signature: ' + res.result)

      me.meetConfig.signature = res.result

      // join function
      ZoomMtg.init({
        leaveUrl: me.meetConfig.leaveUrl,
        webEndpoint: me.meetConfig.webEndpoint,
        success: () => {
          ZoomMtg.i18n.load(me.meetConfig.lang)
          ZoomMtg.i18n.reload(me.meetConfig.lang)
          // eslint-disable-next-line
          console.log(me.meetConfig)
          ZoomMtg.join({
            meetingNumber: me.meetConfig.meetingNumber,
            userName: me.meetConfig.userName,
            signature: me.meetConfig.signature,
            apiKey: me.meetConfig.apiKey,
            userEmail: me.meetConfig.userEmail,
            passWord: me.meetConfig.passWord,
            success: function (res) {
              // eslint-disable-next-line
              console.log(res)
              // eslint-disable-next-line
              console.log('join meeting success')
              // eslint-disable-next-line
              console.log('get attendeelist')
              ZoomMtg.getAttendeeslist({})
              ZoomMtg.getCurrentUser({
                success: function (res) {
                  // eslint-disable-next-line
                  console.log('success getCurrentUser', res.result.currentUser)
                }
              })
            },
            error: function (res) {
              // eslint-disable-next-line
              console.log('failed to connect a:')
              // eslint-disable-next-line
              console.log(res)
            }
          })
        },
        error: function (res) {
          // eslint-disable-next-line
          console.log('failed to connect b:')
          // eslint-disable-next-line
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>
#zmmtg-root {
  display: none;
}
</style>
