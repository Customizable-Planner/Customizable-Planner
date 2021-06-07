<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" dark @click.stop="dialog = true">
            새 일정
          </v-btn>
          <v-btn outlined class="mr-4" @click="setToday">
            오늘로 이동
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>일간</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>주간</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>월간</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4일간</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                일정 추가
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                일정 추가
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="setDialogDate"
        @change="updateRange"
        ></v-calendar>
        <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        full-width
        offset-x
        >
          <v-card color="grey lighten-4" :width="350" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>

            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{ selectedEvent.details }}
              </form>
              <form v-else>
                <v-textarea
                v-model="selectedEvent.details"
                type="text"
                style="width: 100%"
                :min-height="100"
                placeholder="add note">
              </v-textarea>
            </form>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              닫기
            </v-btn>
            <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
              수정
            </v-btn>
            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
              저장
            </v-btn>
          </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main'
const readline = require('readline')
const fs = require('fs')
const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const TOKEN_PATH = 'token.json'
var credentials // credentials.json 을 parsing한게 요따가 저장됨
var oAuth2Client
// 토큰관련 함수
function getAccessToken (oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
    })
  })
}

export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: '월간',
      week: '주간',
      day: '일간',
      '4day': '4일간'
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false
  }),
  mounted () {
    console.log('mounted')
    this.getEvents()
    // this.testMethod()
    this.getEventAllGoogle()
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
          return `${startYear}년 ${startMonth}`
        case 'week':
        case '4day':
          return `${startYear}년 ${startMonth} ${startDay} - ${suffixYear} ${suffixMonth} ${endDay} `
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
  },
  methods: {
    testMethod () {
      console.log('testMethod를 한번 실행해보았습니다')
      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        credentials = JSON.parse(content)
        console.log('credentials.json을 잘 읽었습니다')
        console.log(credentials)
        // authorize 시작
        console.log('이제 authorize를 할겁니다')
        const clientSecret = credentials.installed.client_secret
        const clientId = credentials.installed.client_id
        const redirectUris = credentials.installed.redirect_uris
        oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0])
        console.log(oAuth2Client)
        // token.json관련 시작
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getAccessToken(oAuth2Client)
          oAuth2Client.setCredentials(JSON.parse(token))
          console.log(JSON.parse(token))
          // insert 시작
          const calendar = google.calendar({ version: 'v3', oAuth2Client })
          const event = {
            summary: '제발되라',
            location: '장소',
            description: 'description',
            colorId: 1,
            start: {
              dateTime: '2021-06-10T14:00:00+09:00',
              timeZone: ''
            },
            end: {
              dateTime: '2021-06-12T14:00:00+09:00',
              timeZone: ''
            }
          }
          calendar.events.insert({ calendarId: 'primary', resource: event })
        })
      })
    },
    insertGoogle () {
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

      // Create a dummy event for temp uses in our calendar
      const event = {
        summary: this.name,
        location: '',
        description: this.details,
        colorId: 1,
        start: {
          dateTime: this.start + 'T14:00:00+09:00',
          timeZone: ''
        },
        end: {
          dateTime: this.end + 'T14:00:00+09:00',
          timeZone: ''
        }
      }

      calendar.events.insert({ calendarId: 'primary', resource: event })
    },
    getEventAllGoogle () {
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
        refresh_token: '1//04J2jq0luKpGPCgYIARAAGAQSNwF-L9IrmemPvXXoIFw_7dM7F-L1ydQlC9x9JtL-ALCd9fiYoArb6udkk8Otda7CtLHF0KkjaZo'
      })

      // Create a new calender instance.
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
      const myEventData = calendar.events.list({ calendarId: 'primary' })
      console.log(myEventData)
      const items = String(myEventData.status)
      console.log(items)
    },
    async getEvents () {
      console.log('getEvents')
      const snapshot = await db.collection('calEvent').get()
      const events = []
      snapshot.forEach(doc => {
        const appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
    },
    setDialogDate ({ date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      console.log('viewDay')
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      alert('prev')
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async addEvent () {
      console.log('addEvent')
      // this.insertGoogle() // !!!! gogle calendar로 데이터 보냄!!!!
      if (this.name && this.start && this.end) {
        await db.collection('calEvent').add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color
        })
        this.insertGoogle() // !!!! gogle calendar로 데이터 보내야할 자리!!!
        this.getEvents()
        this.name = ''
        this.details = ''
        this.start = ''
        this.end = ''
        this.color = ''
      } else {
        alert('event name, start, end 를 입력해야합니다')
      }
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection('calEvent').doc(ev).delete()
      this.selectedOpen = false
      this.getEvents()
      console.log('deleteEvent')
    },
    showEvent ({ nativeEvent, event }) {
      alert('showEvent')
      console.log('showEvent')
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>
