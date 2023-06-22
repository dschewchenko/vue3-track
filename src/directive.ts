import type { DirectiveBinding } from "vue";
import type { VueTrackDirectiveBindingValue } from "./types";
import {
  OFFSET,
  parseBinding,
  SCROLL_CONTAINER,
  SCROLL_EVENT,
  SCROLL_HANDLER,
  setCssProperty,
  VISIBILITY_CALLBACK
} from "./utils";

/**
 * Vue directive for tracking the scroll position of an element relative to the viewport or a scroll container.
 *
 * @example
 * ```html
 * <div v-track-scroll>
 *   <!-- ... -->
 * <div v-track-scroll="{ selector: '#scroll-container' }">
 *   <!-- ... -->
 * <div v-track-scroll="{ callback: (position, visibility) => { console.log(position, visibility); } }">
 *   <!-- ... -->
 * <div v-track-scroll="{ selector: '#scroll-container', callback: (position, visibility) => { // some code }, offset: 100 }">
 *   <!-- ... -->
 * ```
 */
export const VueTrackDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<VueTrackDirectiveBindingValue>) {
    const config = parseBinding(binding.value);

    // get scroll container
    el[SCROLL_CONTAINER] = config.selector
      ? (document.querySelector(config.selector) as HTMLElement)
      : (window as Window);

    // check if callback is a function
    el[VISIBILITY_CALLBACK] = config.callback;

    if (!el[SCROLL_CONTAINER] && config.selector) {
      console.warn(`No element found for selector "${config.selector}"`);
    }

    // Scroll handler function
    el[SCROLL_HANDLER] = () => {
      window.requestAnimationFrame(() => {
        // get element position and size
        const { top: offsetTop, left: offsetLeft, width, height } = el.getBoundingClientRect();

        // top and left position
        const top = offsetTop;
        const left = offsetLeft;
        let windowHeight = (el[SCROLL_CONTAINER] as Window).innerHeight;
        let windowWidth = (el[SCROLL_CONTAINER] as Window).innerWidth;

        // calculate top and left position relative to scroll container
        if (el[SCROLL_CONTAINER] !== window) {
          const containerRect = (el[SCROLL_CONTAINER] as HTMLElement).getBoundingClientRect();

          windowHeight = containerRect.height;
          windowWidth = containerRect.width;
        }

        // Visibility check
        const offset = config[OFFSET] || 0;
        const isVerticalVisible = top + height + offset > 0 && top + offset < windowHeight;
        const isHorizontalVisible = left + width + offset > 0 && left + offset < windowWidth;

        // set css variables for visibility
        setCssProperty(el, "--vue-track-visible-y", String(Number(isVerticalVisible)));
        setCssProperty(el, "--vue-track-visible-x", String(Number(isHorizontalVisible)));

        // set css variables for position
        setCssProperty(el, "--vue-track-y", `${top}px`);
        setCssProperty(el, "--vue-track-x", `${left}px`);

        // pass position and visibility to callback
        if (el[VISIBILITY_CALLBACK]) {
          el[VISIBILITY_CALLBACK]({ top, left }, { vertical: isVerticalVisible, horizontal: isHorizontalVisible });
        }
      });
    };

    // Initial call of scroll handler
    el[SCROLL_HANDLER]();

    // Add scroll event listener
    if (el[SCROLL_CONTAINER]) {
      el[SCROLL_CONTAINER].addEventListener(SCROLL_EVENT, el[SCROLL_HANDLER], { passive: true });
    }
  },
  beforeUnmount(el: HTMLElement) {
    if (el[SCROLL_CONTAINER] && el[SCROLL_HANDLER]) {
      // Remove scroll event listener
      el[SCROLL_CONTAINER].removeEventListener(SCROLL_EVENT, el[SCROLL_HANDLER]);
    }
  }
};
