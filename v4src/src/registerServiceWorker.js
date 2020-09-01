/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
   console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
      /*
      window.App.$root.alertMsgText ='Content has been cached for offline use.'
      window.App.$root.alertMsg =true
      */
    },
    updatefound () {
      console.log('New content is downloading.')
     window.App.$root.alertMsgText ='New content is downloading.'
     window.App.$root.alertMsg =true
    },
    updated () {
      console.log('New content is available; please refresh.')
     window.App.$root.alertMsgText ='New content is available; please refresh.'
     window.App.$root.alertMsg =true
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
     window.App.$root.alertMsgText ='No internet connection found. App is running in offline mode.'
     window.App.$root.alertMsg =true
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
