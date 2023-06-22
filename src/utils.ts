import type { VueTrackConfig, VueTrackDirectiveBindingValue } from "./types.ts";

/**
 * constants for the directive
 */
export const SCROLL_EVENT = "scroll";
export const REMOVE_LISTENER = "_vueTrackRemoveListener";

/**
 * Parse the binding value to a VueTrackConfig object.
 *
 * @param {VueTrackDirectiveBindingValue} value
 * @returns VueTrackConfig
 */
export const parseBinding = (value: VueTrackDirectiveBindingValue): VueTrackConfig => {
  let config: VueTrackConfig = {};
  if (typeof value === "string") {
    config.selector = value;
  } else if (typeof value === "function") {
    config.callback = value;
  } else if (typeof value === "object" && value !== null) {
    config = value;
  }

  return config;
};

/**
 * Set a css property on an element.
 *
 * @param {HTMLElement} el
 * @param {string} property
 * @param {string} value
 */
export const setCssProperty = (el: HTMLElement, property: string, value: string) => {
  el.style.setProperty(property, value);
};

/**
 * Get the scroll container element.
 *
 * @param {string} selector
 * @returns HTMLElement | Window
 */
export const getScrollContainer = (selector?: string) => {
  const container = selector ? document.querySelector(selector) : window;
  if (!container) {
    console.warn(`No element found for selector "${selector}"`);
  }

  return container ?? window;
};
