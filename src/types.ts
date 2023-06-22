/**
 * Augment the typings of HTMLElement to include directive-specific properties.
 */
declare global {
  interface HTMLElement {
    _vueTrackRemoveListener: () => void;
  }
}

/**
 * Position of the element relative to the viewport or scroll container.
 */
export type VueTrackPosition = {
  top: number;
  left: number;
};

/**
 * Visibility of the element relative to the viewport or scroll container.
 */
export type VueTrackVisibility = {
  vertical: boolean;
  horizontal: boolean;
};

/**
 * Configuration options for the TrackScroll directive.
 */
export interface VueTrackConfig {
  /**
   * CSS selector for the scroll container.
   */
  selector?: string;

  /**
   * Callback function that is called when the element is scrolled. Receives the position and visibility of the element.
   *
   * @param position
   * @param visibility
   */
  callback?: (position: VueTrackPosition, visibility: VueTrackVisibility) => void;

  /**
   * Offset for the vertical and horizontal visibility check.
   */
  offset?: number;
}

export type VueTrackDirectiveBindingValue = VueTrackConfig["selector"] | VueTrackConfig["callback"] | VueTrackConfig;
