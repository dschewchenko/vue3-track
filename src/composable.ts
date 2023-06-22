import { isRef, MaybeRef, onMounted, onUnmounted, shallowRef, toRef, watch } from "vue";
import { getScrollContainer, SCROLL_EVENT, setCssProperty } from "./utils";
import type { VueTrackConfig, VueTrackPosition, VueTrackVisibility } from "./types";

/**
 * Vue composable for tracking the scroll position and visibility of an element relative to the viewport or a scroll container.
 *
 * @param {HTMLElement | null} element
 * @param {VueTrackConfig} config
 * @param {boolean} autoRegister[=true]
 *
 * @returns VueTrackPosition, VueTrackVisibility
 *
 * @example
 * ```javascript
 * import { useVueTrack } from "vue-track";
 *
 * export default {
 *  setup() {
 *  const element = ref(null);
 *  const { position, visibility } = useVueTrack(element, {
 *  selector: "#scroll-container",
 *  callback: (position, visibility) => {
 *  // some code
 *  },
 *  offset: 100
 */
export const useVueTrack = (
  element: MaybeRef<HTMLElement | null>,
  config: MaybeRef<VueTrackConfig> = {},
  autoRegister = true
) => {
  const configRef = isRef(config) ? config : toRef(config);
  const elementRef = isRef(element) ? element : toRef(element);
  const position = shallowRef<VueTrackPosition>({ top: 0, left: 0 });
  const visibility = shallowRef<VueTrackVisibility>({ vertical: false, horizontal: false });
  let currentContainer = getScrollContainer(configRef.value.selector);

  // scroll handler
  const scrollHandler = () => {
    requestAnimationFrame(() => {
      const el = elementRef.value;
      if (!el) return;

      const { top, left, width, height } = el.getBoundingClientRect() || {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };

      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      // calculate top and left position relative to scroll container
      if (currentContainer !== window && currentContainer !== null) {
        const containerRect = (currentContainer as HTMLElement).getBoundingClientRect();

        windowHeight = containerRect.height;
        windowWidth = containerRect.width;
      }

      const offsetValue = configRef.value.offset || 0;
      const isVerticalVisible = top + height + offsetValue > 0 && top + offsetValue < windowHeight;
      const isHorizontalVisible = left + width + offsetValue > 0 && left + offsetValue < windowWidth;

      position.value = { top, left };
      visibility.value = { vertical: isVerticalVisible, horizontal: isHorizontalVisible };

      // set css variables for visibility
      setCssProperty(el, "--vue-track-visible-y", String(Number(isVerticalVisible)));
      setCssProperty(el, "--vue-track-visible-x", String(Number(isHorizontalVisible)));

      // set css variables for position
      setCssProperty(el, "--vue-track-y", `${top}px`);
      setCssProperty(el, "--vue-track-x", `${left}px`);

      // pass position and visibility to callback

      if (configRef.value.callback) {
        configRef.value.callback(position.value, visibility.value);
      }
    });
  };

  // add and remove scroll listener
  const addListener = () => {
    scrollHandler();
    currentContainer.addEventListener(SCROLL_EVENT, scrollHandler);
  };

  const removeListener = () => {
    currentContainer.removeEventListener(SCROLL_EVENT, scrollHandler);
  };

  if (autoRegister) {
    // watch for changes in config
    watch(configRef, ({ selector }) => {
      if (selector) {
        currentContainer.removeEventListener(SCROLL_EVENT, scrollHandler);
        currentContainer = getScrollContainer(selector);
        currentContainer.addEventListener(SCROLL_EVENT, scrollHandler);
      }
    });

    // add scroll listener on mount and remove on unmount
    onMounted(() => {
      currentContainer.addEventListener(SCROLL_EVENT, scrollHandler);
    });

    onUnmounted(() => {
      currentContainer.removeEventListener(SCROLL_EVENT, scrollHandler);
    });
  }

  return {
    position,
    visibility,
    addListener,
    removeListener
  };
};
