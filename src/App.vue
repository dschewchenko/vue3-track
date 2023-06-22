<template>
  <div class="docs">
    <h1>Vue3 Track</h1>

    <p>
      Vue3 Track is a Vue.js directive and composable function that allows you to track the scroll position of an
      element relative to the viewport or a scroll container. It provides a simple and flexible way to create
      scroll-based effects and animations. It provides the following features:
    </p>

    <ul>
      <li>Tracks the vertical and horizontal position</li>
      <li>Tracks the vertical and horizontal visibility (with an optional offset)</li>
      <li>Supports custom scroll containers.</li>
      <li>Supports callback functions.</li>
      <li>Provides CSS variables for styling.</li>
    </ul>
    <h2>Installation</h2>

    <p>You can install Vue3 Track using npm or yarn:</p>

    <pre><code>npm install vue3-track</code></pre>

    <pre><code>yarn add vue3-track</code></pre>

    <h2>Usage</h2>

    <h3>Composable Function</h3>

    <p>
      To use Vue3 Track as a composable function, you need to import it and call it in the setup function of your
      component:
    </p>

    <pre><code>
import { useVueTrack } from 'vue3-track';

export default {
  setup() {
    const element = ref(null); // reference to element that should be tracked
    const { position, visibility } = useVueTrack(element, { // same options as in directive
      selector: '.scroll-container',
      offset: 100,
      callback: (position, visibility) => {
        // ...
      }
    });

    return {
      position,
      visibility
    };
  }
};
    </code></pre>

    <p>The <code>useVueTrack</code> function returns the following reactive properties:</p>

    <ul>
      <li>
        <code>position</code>: The vertical and horizontal position of the element relative to the scroll container or
        window.
      </li>
      <li>
        <code>visibility</code>: The vertical and horizontal visibility of the element relative to the scroll container
        or window.
      </li>
      <li>
        <code>addListener</code>: A function that adds a listener to the scroll container. For manual setup. Use only
        with 3rd argument `false`. By default, it is `true` and the listener is added automatically in the `onMounted`
        hook.
      </li>
      <li>
        <code>removeListener</code>: A function that removes the listener from the scroll container. For manual setup.
        Use only with 3rd argument `false`. By default, it is `true` and the listener is removed automatically in the
        `onUnmounted` hook.
      </li>
    </ul>

    <h3>Directive</h3>
    <h4>Global Registration</h4>

    <p>To use Vue3 Track globally in your project, you need to register it as a directive in your main entry file:</p>

    <pre><code>
import { createApp } from 'vue';
import { VueTrackDirective, VueTrackPlugin } from 'vue3-track';

const app = createApp(App);

app.use(VueTrackPlugin);

app.mount('#app');
  </code></pre>

    <h4>Local Registration</h4>

    <p>
      To use Vue3 Track locally in a specific component, you can import the directive and register it within the
      component:
    </p>

    <pre><code>
import { VueTrackDirective } from 'vue3-track';

export default {
  directives: {
    trackScroll: VueTrackDirective
  },
  // ...
};
  </code></pre>

    <h2>CSS Variables</h2>

    <p>The following CSS variables are available for styling:</p>

    <ul>
      <li>
        <code>--vue-track-y</code>: The vertical position of the element relative to the scroll container or window.
      </li>
      <li>
        <code>--vue-track-x</code>: The horizontal position of the element relative to the scroll container or window.
      </li>
      <li>
        <code>--vue-track-visible-y</code>: The visibility of the element in the vertical direction. It is 1 when the
        element is visible and 0 when it is not.
      </li>
      <li>
        <code>--vue-track-visible-x</code>: The visibility of the element in the horizontal direction. It is 1 when the
        element is visible and 0 when it is not.
      </li>
    </ul>

    <p>
      You can use these CSS variables to apply different styles based on the scroll position and visibility of the
      tracked elements.
    </p>

    <h2>Options</h2>

    <p>The <code>vue3-track</code> supports the following options:</p>

    <ul>
      <li>
        <code>selector</code> (optional): CSS selector for the scroll container. By default, it uses the window as the
        scroll container.
      </li>
      <li>
        <code>callback</code> (optional): Callback function that is called when the element is scrolled. It receives the
        position and visibility of the element.
      </li>
      <li>
        <code>offset</code> (optional): Offset for the vertical and horizontal visibility check. It adds a margin to the
        top and bottom (vertical) or left and right (horizontal) edges of the element before considering it visible.
      </li>
    </ul>

    <p>
      <strong>Note:</strong> The position is calculated from the top-left corner of the element on which the function or
      directive is applied.
    </p>

    <h2>Supported Browsers</h2>

    <p>Vue3 Track supports all modern browsers (>95% market share) without IE11 support.</p>

    <h2>Examples:</h2>
  </div>
  <div class="container">
    <div ref="elementRef" v-track-scroll class="parallax-container">
      <p>Container with simple parallax effect. Scroll down to see the effect.</p>
      <p>Position: {{ position }}</p>
      <p>Visibility: {{ visibility }}</p>

      <div class="parallax-item layer1"></div>
      <div class="parallax-item layer2"></div>
      <div class="parallax-item layer3"></div>
    </div>

    <div v-track-scroll="onTrackUpdate" class="parallax-container opacity-container">
      <p>
        Container with opacity effect. Triggered when container is visible in viewport. <br />
        Make this container not visible in viewport and back to see the effect.
      </p>
      <div class="parallax-item layer1"></div>
      <div class="parallax-item layer2"></div>
      <div class="parallax-item layer3"></div>
    </div>

    <div class="scroll-container-horizontal">
      <div v-track-scroll="'.scroll-container-horizontal'" class="parallax-container">
        <p>
          Container with horizontal scroll. <br />
          Scroll horizontally to see the effect. <br />
          <b>1</b>
        </p>
        <div class="parallax-item layer1"></div>
        <div class="parallax-item layer2"></div>
        <div class="parallax-item layer3"></div>
      </div>
      <div v-track-scroll="'.scroll-container-horizontal'" class="parallax-container">
        <p>
          Container with horizontal scroll. <br />
          Scroll horizontally to see the effect. <br />
          <b>2</b>
        </p>
        <div class="parallax-item layer1"></div>
        <div class="parallax-item layer2"></div>
        <div class="parallax-item layer3"></div>
      </div>
      <div v-track-scroll="'.scroll-container-horizontal'" class="parallax-container">
        <p>
          Container with horizontal scroll. <br />
          Scroll horizontally to see the effect. <br />
          <b>3</b>
        </p>
        <div class="parallax-item layer1"></div>
        <div class="parallax-item layer2"></div>
        <div class="parallax-item layer3"></div>
      </div>
    </div>
    <div class="fixed-el">
      <p>Monitor position and visibility of the container with opacity effect.</p>
      <p>Position: {{ positionRef }}</p>
      <p>Visibility: {{ visibilityRef }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useVueTrack } from "./composable";
import type { VueTrackPosition, VueTrackVisibility } from "./types";

const elementRef = ref<HTMLElement | null>(null);
const positionRef = shallowRef({ left: 0, top: 0 } as VueTrackPosition);
const visibilityRef = shallowRef({ vertical: false, horizontal: false } as VueTrackVisibility);

// use the composable
const { position, visibility } = useVueTrack(elementRef, {});

// track update callback function for the directive
function onTrackUpdate(position: VueTrackPosition, visibility: VueTrackVisibility) {
  positionRef.value = position;
  visibilityRef.value = visibility;
}
</script>
<style>
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
}

body {
  font-family: Arial, sans-serif;
}

pre {
  overflow: auto;
  padding-bottom: 8px;
}

h1 {
  margin-top: 0;
}

h2 {
  margin-top: 30px;
}

h3 {
  margin-top: 20px;
}

p {
  margin-bottom: 10px;
}

ul {
  margin: 10px 0 20px;
  padding-left: 1rem;
}

.docs {
  padding: 20px;
}

.parallax-container {
  position: relative;
  height: 100vh;
  padding: 16px;
  overflow: hidden;
  background-color: #655bf6;
}

.parallax-item {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
}

.layer1 {
  top: 10%;
  left: 10%;
  background-color: #fc3099;
  opacity: 0.4;
  transform: translate3d(0, calc(var(--vue-track-y, 0) * 0.2), 0);
}

.layer2 {
  top: 30%;
  left: 30%;
  background-color: #f9c74f;
  opacity: 0.4;
  transform: translate3d(0, calc(var(--vue-track-y, 0) * 0.5), 0);
}

.layer3 {
  top: 50%;
  left: 50%;
  background-color: #90be6d;
  opacity: 0.4;
  transform: translate3d(0, calc(var(--vue-track-y, 0) * 0.7), 0);
}

.parallax-container:nth-child(2) {
  background-color: #ffb367;
}

.parallax-container:nth-child(3) {
  background-color: #f9c74f;
}

.opacity-container .parallax-item {
  opacity: calc(var(--vue-track-visible-y, 1) * 0.7);
  transition: opacity 3s ease-in-out;
}

.scroll-container-horizontal {
  display: flex;
  height: 100vh;
  overflow-x: scroll;
}

.scroll-container-horizontal .parallax-container {
  flex: 1 0 100%;
  height: 100%;
}

.scroll-container-horizontal .layer1 {
  transform: translate3d(calc(var(--vue-track-x, 0) * 0.65), 0, 0);
}

.scroll-container-horizontal .layer2 {
  transform: translate3d(calc(var(--vue-track-x, 0) * 0.5), 0, 0);
}

.scroll-container-horizontal .layer3 {
  transform: translate3d(calc(var(--vue-track-x, 0) * 0.3), 0, 0);
}

.fixed-el {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  line-height: 1.5;
  z-index: 100;
}

p {
  margin: 0;
}
</style>
