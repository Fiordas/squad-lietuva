<template>
  <form action>
    <b-field label='El. paštas' custom-class='is-small'>
      <b-input type='email' size='is-small' required autofocus></b-input>
    </b-field>
    <b-field label='Slaptažodis' custom-class='is-small'>
      <b-input type='password' size='is-small' password-reveal required></b-input>
    </b-field>
    <b-field>
      <b-checkbox size='is-small'>Prisiminti mane</b-checkbox>
    </b-field>
    <b-field>
      <button class='button is-primary is-fullwidth is-rounded'>Prisijungti</button>
    </b-field>
  </form>
</template>
