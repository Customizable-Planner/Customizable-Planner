<template>
    <v-container>
      <v-calendar>
      </v-calendar>
      <input type="text" placeholder="팀플하기" v-model = "title">
      <input type="text" placeholder="시작 날짜" v-model = "sTime">
      <input type="text" placeholder="끝나는 날짜" v-model = "eTime">
      <v-btn @click="updateCalendar"></v-btn>
    </v-container>
</template>

<script>
export default {
  name: 'google-calendar-module',
  data: function () {
    return {
      title: '일정 제목',
      sTime: '2021-06-10T14:00:00Z',
      eTime: '2021-06-14T14:00:00Z'
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

      const location = '중앙대학교'
      const description = '팀플 하기'
      // const startTime = '2021-06-10T14:00:00Z'
      // const endTime = '2021-06-12T14:00:00Z'

      // Create a dummy event for temp uses in our calendar
      const event = {
        summary: this.title,
        location: location,
        description: description,
        colorId: 1,
        start: {
          dateTime: this.sTime,
          timeZone: ''
        },
        end: {
          dateTime: this.eTime,
          timeZone: ''
        }
      }

      calendar.events.insert({ calendarId: 'primary', resource: event })
    }
  }
}
</script>
