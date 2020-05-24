<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ $t('EVENTS.UPCOMING_EVENTS') }}</h1>
      <div class="columns">
        <div class="column">
          <b-datepicker
            :first-day-of-week="1"
            :month-names="[
              $t('EVENTS.JANUARY'),
              $t('EVENTS.FEBRUARY'),
              $t('EVENTS.MARCH'),
              $t('EVENTS.APRIL'),
              $t('EVENTS.MAY'),
              $t('EVENTS.JUNE'),
              $t('EVENTS.JULY'),
              $t('EVENTS.AUGUST'),
              $t('EVENTS.SEPTEMBER'),
              $t('EVENTS.OCTOBER'),
              $t('EVENTS.NOVEMBER'),
              $t('EVENTS.DECEMBER')
            ]"
            :day-names="[
              $t('EVENTS.SUNDAY_SHORT'),
              $t('EVENTS.MONDAY_SHORT'),
              $t('EVENTS.TUESDAY_SHORT'),
              $t('EVENTS.WEDNESDAY_SHORT'),
              $t('EVENTS.THURSDAY_SHORT'),
              $t('EVENTS.FRIDAY_SHORT'),
              $t('EVENTS.SATURDAY_SHORT')
            ]"
            inline
          ></b-datepicker>
        </div>
        <div class="column is-two-thirds">
          <div class="box has-background-dark has-text-light">
            <h1 class="subtitle">Lorem ipsum dolor</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida,
              nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio,
              sollicitudin vel erat vel, interdum mattis neque.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      lt: '/renginiai',
      en: '/events'
    }
  }
}
</script>
