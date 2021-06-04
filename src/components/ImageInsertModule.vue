<template>
    <v-container>
        <v-file-input v-model="insertedImage"></v-file-input>
        <v-img :src="url" />
        <v-btn @click="updateCalendar"></v-btn>
    </v-container>
</template>

<script>
export default {
  name: 'image-insert-module',
  data: function () {
    return {
      insertedImage: null // 이미지 삽입을 위한 변수
    }
  },
  computed: {
    url () {
      if (!this.insertedImage) return
      return URL.createObjectURL(this.insertedImage)
    }
  },
  methods: {
    updateCalendar () {
      // Require google from googleapis package.
      const { google } = require('googleapis')

      // Require oAuth2 from our google instance.
      const { OAuth2 } = google.auth

      // Create a new instance of oAuth and set our Client ID & Client Secret.
      const oAuth2Client = new OAuth2(
        '1005543656495-6u9p67depvv7po9uhk19scu15btudes3.apps.googleusercontent.com',
        'mI0lJgqNvCTe6kZerRn2kO1Q'
      )

      // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
      oAuth2Client.setCredentials({
        refresh_token: '1//04ONoWLwbbwo2CgYIARAAGAQSNwF-L9IruyR9-Xlff-qV3fXRTYns39cANIzzGeAgrXbp4JbVEklJjdPBfVopjL2q7TNxGjUr7pk'
      })

      // Create a new calender instance.
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

      // Create a new event start date instance for temp uses in our calendar.
      const eventStartTime = new Date()
      eventStartTime.setDate(eventStartTime.getDay() + 2)

      // Create a new event end date instance for temp uses in our calendar.
      const eventEndTime = new Date()
      eventEndTime.setDate(eventEndTime.getDay() + 4)
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

      // Create a dummy event for temp uses in our calendar
      const event = {
        summary: '오픈소스 팀플',
        location: '중앙대학교',
        description: '팀플 하기',
        colorId: 1,
        start: {
          dateTime: '2021-06-10T14:00:00Z',
          timeZone: ''
        },
        end: {
          dateTime: '2021-06-12T14:00:00Z',
          timeZone: ''
        }
      }

      // Check if we a busy and have an event on our calendar for the same time.
      calendar.freebusy.query(
        {
          resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: '',
            items: [{ id: 'primary' }]
          }
        },
        (err, res) => {
          // Check for errors in our query and log them if they exist.
          if (err) return console.error('Free Busy Query Error: ', err)

          // Create an array of all events on our calendar during that time.
          const eventArr = res.data.calendars.primary.busy

          // Check if event array is empty which means we are not busy
          if (eventArr.length === 0) { // If we are not busy create a new calendar event.
            return calendar.events.insert(
              { calendarId: 'primary', resource: event },
              err => {
              // Check for errors and log them if they exist.
                if (err) return console.error('Error Creating Calender Event:', err)
                // Else log that the event was created.
                return console.log('Calendar event successfully created.')
              }
            )
          }

          // If event array is not empty log that we are busy.
          return console.log('Sorry I\'m busy...')
        }
      )
    }
  }
}
</script>
