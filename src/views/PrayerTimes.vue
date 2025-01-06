<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

const props = defineProps({
  prayerTimes: {
    type: Object,
    required: false,
    default: () => null
  }
})

const timings = computed(() => props.prayerTimes?.timings || {})
const nextPrayer = ref('')
const countdown = ref('')

const prayerNames = {
  Fajr: 'Shubuh',
  Sunrise: 'Terbit',
  Dhuhr: 'Dhuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
  Imsak: 'Imsak'
}

const calculateNextPrayer = () => {
  const now = new Date()
  const prayerTimes = Object.entries(timings.value).map(([name, time]) => {
    const [hours, minutes] = time.split(':')
    const prayerTime = new Date()
    prayerTime.setHours(hours, minutes, 0, 0)
    return { name, time: prayerTime }
  })

  const upcomingPrayer = prayerTimes.find(prayer => prayer.time > now)
  if (upcomingPrayer) {
    nextPrayer.value = prayerNames[upcomingPrayer.name] || upcomingPrayer.name
    updateCountdown(upcomingPrayer.time)
  }
}

const updateCountdown = (prayerTime) => {
  const now = new Date()
  const diff = prayerTime - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  countdown.value = `${hours}h ${minutes}m ${seconds}s`
}

onMounted(() => {
  calculateNextPrayer()
  setInterval(() => {
    calculateNextPrayer()
  }, 1000)
})
</script>

<template>
  <div class="prayer-times text-center" v-if="prayerTimes">
    <h1 class="next-prayer">{{ nextPrayer }}</h1>
    <h2 class="countdown">{{ countdown }}</h2>
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Imsak'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Imsak</p>
              <p class="fw-medium fs-5">{{ timings.Imsak }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Shubuh'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Shubuh</p>
              <p class="fw-medium fs-5">{{ timings.Fajr }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Terbit'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Terbit</p>
              <p class="fw-medium fs-5">{{ timings.Sunrise }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Dhuhur'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Dhuhur</p>
              <p class="fw-medium fs-5">{{ timings.Dhuhr }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Ashar'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Ashar</p>
              <p class="fw-medium fs-5">{{ timings.Asr }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Maghrib'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Maghrib</p>
              <p class="fw-medium fs-5">{{ timings.Maghrib }}</p>
            </div>
          </div>
          <div class="col-md-4 mb-1" v-if="nextPrayer !== 'Isya'">
            <div class="p-3 bg-white shadow-sm rounded">
              <p class="fw-medium fs-4">Isya</p>
              <p class="fw-medium fs-5">{{ timings.Isha }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>