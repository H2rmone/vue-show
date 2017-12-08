<template lang="pug">
  div.app
    h1 Vue Show
    button(
      :class="{'active': isShow}"
      @click="isShow = !isShow"
    ) Click me! Status: {{isShow ? 'show' : 'hide'}}
    x-show.easings(
      :show="isShow"
      :easing="easing"
      :duration="700"
      transition-on-mount
      unmount-on-hide
    )
      ul
        li(v-for="(item, idx) in list")
          button(
            :class="{'active': item.active}"
            @click="handleClick(item, idx)"
          ) {{item.key}}
</template>

<script>
import xShow from '../../src/x-show'
import easings from '../../src/easings'

export default {
  name: 'app',
  data: () => ({
    list: [],
    isShow: true,
    easing: Object.keys(easings)[0],
  }),
  components: {
    xShow,
  },
  created () {
    this.list = Object.keys(easings).map(
      key => ({
        key,
        show: true,
        active: false,
      })
    )
    this.list[0].active = true
  },
  methods: {
    handleClick ({ key }, idx) {
      this.easing = key
      this.list.forEach((item, index) => {
        item.active = idx === index
      })
    },
  },
}
</script>

<style lang="scss">
@mixin box-shadow {
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Monaco;
}
li {
  list-style: none;
}
.app {
  padding: 0 80px;
}

button {
  display: block;
  width: 100%;
  margin: 0 auto;
  border-radius: 0;
  outline: none;
  padding: 10px 0;
  text-align: center;
  border: 0;
  color: gray;
  transition: all .3s ease;
  @include box-shadow;
}
h1 {
  font-size: 40px;
  text-align: center;
  padding: 50px 0;
  color: #42b983;
}

.easings {
  margin-top: 20px;
  @include box-shadow;
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
  li {
    width: 120px;
    margin: 10px;
  }
}
.active {
  color: #fff;
  background-color: #42b983;
}


</style>
