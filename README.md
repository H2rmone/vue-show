
# Vue Show
</a>
<a href="https://npmjs.com/package/vue-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/vue-show.svg" />
</a>
<a href="https://npmjs.com/package/vue-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/v/vue-show.svg" />
</a>


A dependency-free vertical show/hide component for Vue.

This package was inspired by [React Show](https://github.com/react-tools/react-show).

## Why?
You need to show & hide vue components. Everyone does! Of course you want it to be simple and lightweight. But most of all you don't want to bloat up your app with things like custom physics-based animation frameworks or even jQuery (heaven forbid). `vue-show` is the answer. Read on!

## Live Demo
https://h2rmone.github.io/vue-show/

## Features
- Powered by CSS animations. Put that on the GPU baby!
- Extremely easy to control. It's all in the props!

## Installation
```bash
$ yarn add vue-show
# or
$ npm install --save vue-show
```

## Usage
```javascript
import VueShow from 'vue-show'
Vue.use(VueShow)
```

``` html
<x-show :show="true">
  Hello world!
</x-show>

```


## API

#### `<x-show>`
The default export and main component for Vue-Show.

###### Props
|         Prop         	| Required 	|  Default Value 	| Description                                                                 	|
|:--------------------	|:--------	|:--------------	|:-----------------------------------------------------------------------------	|
| `show`               	|  `true`   | `false`        	| Determines whether to "show" the content or not.                            	|
| `duration`           	|          	| `500`          	| The `transition-duration` of the transition used to show the content        	|
| `easing`             	|          	| `easeOutQuint` 	| The `transition-timing-function` used to show the content                   	|
| `transitionProperty` 	|          	| `height`       	| The `transition-property` used to show the content                          	|
| `unmountOnHide`      	|          	| `false`        	| Determines whether the children will be unmounted when not visible.         	|
| `transitionOnMount`  	|          	| `false`        	| Determines whether to animate from a hidden to a shown state on mount       	|
| `minHeight`          	|          	|                	| The minimum hight of the content. Beware using with `unmountOnHide={true}`! 	|
| `height`             	|          	|                	| The optional fixed height of the children when open                         	|


#### `VueShow.easings`
React-Show comes packaged with some awesome easings that are accessible via `VueShow.easings`. They are extremely simple to use too:
```javascript
import VueShow from 'vue-show'
Vue.use(VueShow)
```

``` html
<x-show
  :show="true"
  :easing="VueShow.easings.easeOutQuart"
>
  Hello world!
</x-show>

```

Below is a full list of the available easings located at `VueShow.easings`
```javascript
VueShow.easings = {
  // Cubic
  easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

  // Circ
  easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

  // Expo
  easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

  // Quad
  easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

  // Quart
  easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

  // Quint
  easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

  // Sine
  easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

  // Back
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}
```

## Contributing
We are always looking for people to help us grow `vue-show`'s capabilities and examples. If you have an issue, feature request, or pull request, let us know!

## License
Vue Show uses the MIT license.
