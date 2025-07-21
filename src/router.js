import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./page/home.vue'),
    },
    {
      path: '/time',
      component: () => import('./page/secondePage/time.vue'),
    },
    {
      path: '/fiscal',
      component: () => import('./page/secondePage/fiscal.vue'),
    },
    {
      path: '/numbers',
      component: () => import('./page/secondePage/numbers.vue'),
    },
    {
      path: '/conversions',
      component: () => import('./page/secondePage/conversions.vue'),
    },
    {
      path: '/health',
      component: () => import('./page/secondePage/health.vue'),
    },
    {
      path: '/math',
      component: () => import('./page/secondePage/math.vue'),
    },
    {
      path: '/technology',
      component: () => import('./page/secondePage/technology.vue'),
    },
    {
      path: '/text',
      component: () => import('./page/secondePage/text.vue'),
    },
    {
      path: '/other',
      component: () => import('./page/secondePage/other.vue'),
    },
    {
      path: '/time/date',
      component: () => import('./page/thirePage/time/date.vue'),
    },
    {
      path: '/time/cleander',
      component: () => import('./page/thirePage/time/cleander.vue'),
    },
    {
      path: '/time/convertor',
      component: () => import('./page/thirePage/time/convertor.vue'),
    },
    {
      path: '/time/mathAge',
      component: () => import('./page/thirePage/time/mathAge.vue'),
    },
    {
      path: '/time/religious',
      component: () => import('./page/thirePage/time/religious.vue'),
    },
    {
      path: '/time/alarm',
      component: () => import('./page/thirePage/time/alarm.vue'),
    },
    {
      path: '/time/timer',
      component: () => import('./page/thirePage/time/timer.vue'),
    },
    {
      path: '/time/cornometr',
      component: () => import('./page/thirePage/time/cornometr.vue'),
    },
    {
      path: '/time/spacingDate',
      component: () => import('./page/thirePage/time/spacingDate.vue'),
    },
    {
      path: '/fiscal/loanInterest',
      component: () => import('./page/thirePage/fiscal/loanInterest.vue'),
    },
    {
      path: '/fiscal/Interest',
      component: () => import('./page/thirePage/fiscal/Interest.vue'),
    },
    {
      path: '/fiscal/numberCard',
      component: () => import('./page/thirePage/fiscal/numberCard.vue'),
    },
    {
      path: '/fiscal/exchangeRial',
      component: () => import('./page/thirePage/fiscal/exchangeRial.vue'),
    },
    {
      path: '/fiscal/marketProfit',
      component: () => import('./page/thirePage/fiscal/marketProfit.vue'),
    },
    {
      path: '/numbers/percent',
      component: () => import('./page/thirePage/numbers/percent.vue'),
    },
    {
      path: '/numbers/increasePercent',
      component: () => import('./page/thirePage/numbers/increasePercent.vue'),
    },
    {
      path: '/numbers/decreasePercent',
      component: () => import('./page/thirePage/numbers/decreasePercent.vue'),
    },
    {
      path: '/numbers/changePercent',
      component: () => import('./page/thirePage/numbers/changePercent.vue'),
    },
    {
      path: '/numbers/errPercent',
      component: () => import('./page/thirePage/numbers/errPercent.vue'),
    },
    {
      path: '/numbers/randomNumber',
      component: () => import('./page/thirePage/numbers/randomNumber.vue'),
    },
    {
      path: '/numbers/exchangeNumber',
      component: () => import('./page/thirePage/numbers/exchangeNumber.vue'),
    }, 
    {
      path: '/numbers/numberToString',
      component: () => import('./page/thirePage/numbers/numberToString.vue'),
    }, 
    {
      path: '/numbers/numberToStringEN',
      component: () => import('./page/thirePage/numbers/numberToStringEN.vue'),
    }, 
    {
      path: '/conversions/convert-length',
      component: () => import('./page/thirePage/conversions/convert-length.vue'),
    }, 
    {
      path: '/conversions/convert-speed',
      component: () => import('./page/thirePage/conversions/convert-speed.vue'),
    }, 
    {
      path: '/conversions/convert-temperature',
      component: () => import('./page/thirePage/conversions/convert-temperature.vue'),
    }, 
    {
      path: '/conversions/convert-time',
      component: () => import('./page/thirePage/conversions/convert-time.vue'),
    }, 
    {
      path: '/conversions/convert-weight',
      component: () => import('./page/thirePage/conversions/convert-weight.vue'),
    }, 
    {
      path: '/health/BMI',
      component: () => import('./page/thirePage/health/BMI.vue'),
    }, 
    {
      path: '/health/BMR',
      component: () => import('./page/thirePage/health/BMR.vue'),
    }, 
    {
      path: '/math/first-linear-equation',
      component: () => import('./page/thirePage/math/first-linear-equation.vue'),
    }, 
    {
      path: '/math/average',
      component: () => import('./page/thirePage/math/average.vue'),
    }, 
    {
      path: '/math/factor',
      component: () => import('./page/thirePage/math/factor.vue'),
    },
    {
      path: '/math/pow',
      component: () => import('./page/thirePage/math/pow.vue'),
    },
    {
      path: '/math/sqrt',
      component: () => import('./page/thirePage/math/sqrt.vue'),
    },
    {
      path: '/math/legarithm',
      component: () => import('./page/thirePage/math/legarithm.vue'),
    },
    {
      path: '/math/prime-number',
      component: () => import('./page/thirePage/math/prime-number.vue'),
    },
    {
      path: '/math/rectangle',
      component: () => import('./page/thirePage/math/rectangle.vue'),
    },
    {
      path: '/math/square',
      component: () => import('./page/thirePage/math/square.vue'),
    },
    {
      path: '/technology/password-random',
      component: () => import('./page/thirePage/technology/password-random.vue'),
    },
    {
      path: '/technology/MyIP',
      component: () => import('./page/thirePage/technology/MyIP.vue'),
    },
    {
      path: '/technology/TimeStamp',
      component: () => import('./page/thirePage/technology/TimeStamp.vue'),
    },
    {
      path: '/technology/binary',
      component: () => import('./page/thirePage/technology/binary.vue'),
    },
    {
      path: '/text/convert-word',
      component: () => import('./page/thirePage/text/convert-word.vue'),
    },
    {
      path: '/text/counter-word',
      component: () => import('./page/thirePage/text/counter-word.vue'),
    },
    {
      path: '/text/Lorem',
      component: () => import('./page/thirePage/text/Lorem.vue'),
    },
    {
      path: '/other/fuel',
      component: () => import('./page/thirePage/other/fuel.vue'),
    },
    {
      path: '/other/smoking',
      component: () => import('./page/thirePage/other/smoking.vue'),
    },
    {
      path: '/other/national-number',
      component: () => import('./page/thirePage/other/national-number.vue'),
    },
    {
      path: '/other/ielts-score',
      component: () => import('./page/thirePage/other/ielts-score.vue'),
    },
  ]
})
export default router