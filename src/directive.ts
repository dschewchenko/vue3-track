import type { DirectiveBinding } from "vue";
import type { VueTrackDirectiveBindingValue } from "./types";
import { parseBinding, REMOVE_LISTENER } from "./utils";
import { useVueTrack } from "./composable";

/**
 * Vue directive for tracking the scroll position of an element relative to the viewport or a scroll container.
 *
 * @example
 * ```html
 * <div v-track-scroll>
 *   <!-- ... -->
 * <div v-track-scroll="'#scroll-container'">
 *   <!-- ... -->
 * <div v-track-scroll="(position, visibility) => { console.log(position, visibility); }">
 *   <!-- ... -->
 * <div v-track-scroll="{ selector: '#scroll-container', callback: (position, visibility) => { // some code }, offset: 100 }">
 *   <!-- ... -->
 * ```
 */
export const VueTrackDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<VueTrackDirectiveBindingValue>) {
    const config = parseBinding(binding.value);

    const { addListener, removeListener } = useVueTrack(el, config, false);

    el[REMOVE_LISTENER] = removeListener;
    addListener();
  },
  unmounted(el: HTMLElement) {
    el[REMOVE_LISTENER]?.();
  }
};
