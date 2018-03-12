<template>
  <div id="myTemplate">
      {{meg}}
  </div>
</template>

<script>
export default {
  name: 'myTemplate',
  data () {
    return {
      meg:"i am myTemplate"
    }
  }
}

</script>

<style>
 #myTemplate{
   width: 100px;
   height: 40px;
    background-color: red;
 }
</style>


