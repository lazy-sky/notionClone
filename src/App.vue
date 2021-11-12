 <template>
  <TheHeader />
  <RouterView />
</template>

<script>
import dayjs from 'dayjs'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  },

  created() {
    // 서버로 전송할 땐 iso 형식으로 제출
    const iso = dayjs(dayjs('2021-11-12 20:00:00').format('YYYY-MM-DD HH:mm:ss')).toISOString()
    console.log(iso)

    let formatted = dayjs('2021-11-12T11:00:00.000Z').format('YYYY-MM-DD HH:mm:ss')
    console.log(formatted)

    // 형식은 내 마음
    formatted = dayjs('2021-11-12T11:00:00.000Z').format('YYYY년 MM월 DD일 HH시 mm분 ss초')
    console.log(formatted)

    dayjs() // 현재 시간 dayjs 객체
    console.log(dayjs())

    // 시간 비교 -> boolean 반환
    console.log(dayjs().isBefore('2021-11-12T11:00:00.000Z')) 
    console.log(dayjs().isAfter('2021-11-12T11:00:00.000Z')) 
  }
}
</script>
