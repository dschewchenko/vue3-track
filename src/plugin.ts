import { VueTrackDirective } from "./directive";
import { parseBinding } from "./utils";
import type { VueTrackConfig, VueTrackDirectiveBindingValue } from "./types";
import type { App, DirectiveBinding } from "vue";

export type VueTrackPluginConfig = VueTrackConfig & { name?: string };

/**
 * Vue plugin to register the TrackScroll directive globally.
 */
export const VueTrackPlugin = {
  install: (app: App, options?: VueTrackPluginConfig) => {
    app.directive(options?.name || "track-scroll", {
      ...VueTrackDirective,
      mounted(el, binding: DirectiveBinding<VueTrackDirectiveBindingValue>) {
        // parse original binding
        const config = parseBinding(binding.value);
        // merge options
        binding.value = { ...options, ...config } as VueTrackConfig;
        // call directive
        VueTrackDirective.mounted(el, binding);
      }
    });
  }
};
