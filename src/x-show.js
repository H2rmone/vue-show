import easings from './easings'

const transitionEvent = (() => {
  if (typeof document === 'undefined') {
    return
  }
  const el = document.createElement('fakeelement')
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  }

  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
})()

export default {
  name: 'x-show',
  props: {
    show: {
      type: Boolean,
      default: () => true,
    },
    transitionProperty: {
      type: String,
      default: () => 'height',
    },
    duration: {
      type: Number,
      default: () => 500,
    },
    easing: {
      type: String,
      default: () => 'ease-out',
    },
    minHeight: {
      type: Number,
      default: () => 0,
    },
    maxHeight: {
      type: Number,
      default: () => 0,
    },
    transitionOnMount: {
      type: Boolean,
      default: () => false,
    },
    unmountOnHide: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: Number,
      default: () => 0,
    },
  },
  data () {
    return {
      mountContent: true,
      calcHeight: this.transitionOnMount
        ? '0px'
        : this.height !== 0
          ? `${this.measureHeight()}px`
          : 'auto',
    }
  },
  computed: {
    getStyle () {
      const {
        calcHeight,
        transitionProperty,
        duration,
        easing,
      } = this

      return {
        transitionProperty,
        height: calcHeight,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easings[easing] || easing,
        overflow: 'hidden',
      }
    },
  },
  watch: {
    show (val) {
      this[val ? 'animateIn' : 'animateOut']()
    },
  },
  created () {
    this.$nextTick(() => {
      this.bindEvent()
      if (this.transitionOnMount) this.animateIn()
    })
  },
  beforeUpdate () {
    if (this.unmountOnHide) this.bindEvent()
  },
  methods: {
    measureHeight () {
      return this.height || this.$el.scrollHeight
    },
    animateIn () {
      const { minHeight, maxHeight } = this
      this.mountContent = true
      this.calcHeight = `${minHeight || 0}px`
      this.$nextTick(() => {
        const height = this.measureHeight()
        setTimeout(() => {
          this.calcHeight = `${maxHeight || height}px`
        }, 16)
      })
    },
    animateOut () {
      const { minHeight, maxHeight } = this
      const minimize = () => {
        setTimeout(() => {
          if (this.$el.style.height === 'auto') {
            minimize()
            return
          }
          this.calcHeight = `${minHeight || 0}px`
        }, 16)
      }
      if (this.$el.style.height !== 'auto') {
        minimize()
      } else {
        const height = this.measureHeight()
        this.calcHeight = `${maxHeight || height}px`
        minimize()
      }
    },
    onTransitionEnd () {
      const { unmountOnHide, show } = this
      if (!show && unmountOnHide) this.mountContent = false
    },
    bindEvent () {
      this.$el.addEventListener(
        transitionEvent,
        this.onTransitionEnd,
      )
    },
  },
  render () {
    return (
      this.mountContent ? (
        <div style={this.getStyle}>
          {this.$slots.default}
        </div>
      ) : null
    )
  },
}
