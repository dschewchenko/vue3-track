import type { VueTrackConfig, VueTrackDirectiveBindingValue } from "./types.ts";

/**
 * constans for the directive
 */
export const SCROLL_EVENT = "scroll";
export const SCROLL_CONTAINER = "_scrollContainer";
export const VISIBILITY_CALLBACK = "_visibilityCallback";
export const SCROLL_HANDLER = "_scrollHandler";
export const OFFSET = "offset";

/**
 * Parse the binding value to a VueTrackConfig object.
 *
 * @param value
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
 * @param el
 * @param property
 * @param value
 */
export const setCssProperty = (el: HTMLElement, property: string, value: string) => {
  el.style.setProperty(property, value);
};
