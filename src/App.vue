<template>
  <div class="docs">
    <h1>Vue Track Scroll Directive Documentation</h1>

    <h2>Installation</h2>
    <p>
      First, make sure you have Vue.js installed in your project. Then, you can install the Vue Track Scroll directive
      using npm or yarn:
    </p>

    <div class="code">
      <pre><code>npm install vue3-track</code></pre>
      <pre><code>yarn add vue3-track</code></pre>
    </div>

    <h2>Usage</h2>
    <p>
      To use the Vue Track Scroll directive in your Vue components, you need to import it and register it as a directive
      globally or locally:
    </p>

    <p>
      <strong>Global registration</strong> (recommended): Import the directive and register it globally in your main
      entry file:
    </p>
    <div class="code">
      <pre><code>import { createApp } from 'vue';
import { VueTrackDirective, VueTrackPlugin } from 'vue3-track';

const app = createApp(App);

app.use(VueTrackPlugin, { /* options object */ });

app.mount('#app');</code></pre>
    </div>

    <p><strong>Local registration</strong>: Import the directive and register it locally in your component:</p>
    <div class="code">
      <pre><code>import { VueTrackDirective } from 'vue3-track';

export default {
  directives: {
    trackScroll: VueTrackDirective
  }
};</code></pre>
    </div>

    <h2>Directive Options</h2>
    <p>The `v-track-scroll` directive supports the following options:</p>

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
      <b>Note:</b> The position is calculated from the top-left corner of the element on which the directive is applied.
    </p>

    <h2>Examples:</h2>
  </div>
  <div class="container">
    <div v-track-scroll class="parallax-container">
      <p>Container with simple parallax effect. Scroll down to see the effect.</p>

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
import { shallowRef } from "vue";
import type { VueTrackPosition, VueTrackVisibility } from "./types";

const positionRef = shallowRef({ left: 0, top: 0 } as VueTrackPosition);
const visibilityRef = shallowRef({ vertical: false, horizontal: false } as VueTrackVisibility);

function onTrackUpdate(position: VueTrackPosition, visibility: VueTrackVisibility) {
  console.log("position", position);
  console.log("visibility", visibility);
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

p {
  margin-bottom: 10px;
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
