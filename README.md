# Vue3 Track

[![npm version](https://img.shields.io/npm/v/vue3-track.svg)](https://www.npmjs.com/package/vue3-track)
[![npm downloads](https://img.shields.io/npm/dw/vue3-track)](https://www.npmjs.com/package/vue3-track)

Vue3 Track is a Vue.js directive
that allows you to track the scroll position of an element relative to the viewport or a scroll container.
It provides a simple and flexible way to create scroll-based effects and animations. 
It provides the following features:

- Tracks the vertical and horizontal position
- Tracks the vertical and horizontal visibility (with an optional offset)
- Supports custom scroll containers.
- Supports callback functions.
- Provides CSS variables for styling.

## Installation

You can install Vue3 Track using npm or yarn:

```shell
npm install vue3-track
```

or

```shell
yarn add vue3-track
```

## Usage

### Global Registration

To use Vue3 Track globally in your project, you need to register it as a directive in your main entry file:

```javascript
import { createApp } from 'vue';
import { VueTrackDirective, VueTrackPlugin } from 'vue3-track';

const app = createApp(App);

app.use(VueTrackPlugin);

app.mount('#app');
```

### Local Registration

To use Vue3 Track locally in a specific component, you can import the directive and register it within the component:

```javascript
import { VueTrackDirective } from 'vue3-track';

export default {
  directives: {
    trackScroll: VueTrackDirective
  },
  // ...
};
```

## CSS Variables
The following CSS variables are available for styling:

- `--vue-track-y`: The vertical position of the element relative to the scroll container or window.
- `--vue-track-x`: The horizontal position of the element relative to the scroll container or window.
- `--vue-track-visible-y`: The visibility of the element in the vertical direction. It is 1 when the element is visible and 0 when it is not.
- `--vue-track-visible-x`: The visibility of the element in the horizontal direction. It is 1 when the element is visible and 0 when it is not.

You can use these CSS variables to apply different styles based on the scroll position and visibility of the tracked elements.

## Directive Options
The `vue3-track` directive supports the following options:

- `selector` (optional): CSS selector for the scroll container. By default, it uses the window as the scroll container.
- `callback` (optional): Callback function that is called when the element is scrolled. It receives the position and visibility of the element.
- `offset` (optional): Offset for the vertical and horizontal visibility check. It adds a margin to the top and bottom (vertical) or left and right (horizontal) edges of the element before considering it visible.

**Note:** The position is calculated from the top-left corner of the element on which the directive is applied.

## Supported Browsers

Vue3 Track supports all modern browsers (>95% market share) without IE11 support.

## Examples

To see some examples of using Vue3 Track,
please refer to the [src/App.vue](https://github.com/dschewchenko/vue3-track/blob/master/src/App.vue#L72) file.
And you can see the examples in action on the [demo page](https://dschewchenko.github.io/vue3-track/).

## Contributing

Contributions are welcome!
If you encounter any issues or have suggestions for improvements,
please open an issue or submit a pull request on the GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
