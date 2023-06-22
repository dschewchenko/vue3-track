/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, suite, test, beforeAll, Mock } from "vitest";
import { mount } from "@vue/test-utils";
import jest from "jest-mock";
import { ref } from "vue";
import { VueTrackDirective } from "../src/directive";

// TODO: fix tests
suite("VueTrackDirective", () => {
  let scrollHandler: Mock;

  beforeAll(() => {
    scrollHandler = jest.fn() as any;

    window.requestAnimationFrame = jest.fn((callback) => callback());
    window.addEventListener = jest.fn((event, handler) => {
      if (event === "scroll") {
        scrollHandler.mockClear();
        scrollHandler.mockImplementation(handler);
      }
    });
  });

  test("should call the scroll handler on mounted", async () => {
    const el = document.createElement("div");
    const binding = {
      value: {}
    };

    await mount(
      {
        template: `
        <div v-track-scroll></div>
      `,
        directives: {
          trackScroll: VueTrackDirective
        }
      },
      el
    );

    expect(scrollHandler).toHaveBeenCalledTimes(1);
  });

  test("should add scroll event listener on mounted", async () => {
    const el = document.createElement("div");
    const binding = {
      value: {}
    };

    await mount(
      {
        template: `
        <div v-track-scroll></div>
      `,
        directives: {
          trackScroll: VueTrackDirective
        }
      },
      el
    );

    expect(window.addEventListener).toHaveBeenCalledWith("scroll", scrollHandler, {
      passive: true
    });
  });

  test("should remove scroll event listener on beforeUnmount", async () => {
    const el = document.createElement("div");

    await mount(
      {
        template: `
        <div v-track-scroll></div>
      `,
        directives: {
          trackScroll: VueTrackDirective
        }
      },
      el
    );

    expect(window.removeEventListener).toHaveBeenCalledWith("scroll", scrollHandler);
  });

  test("should set CSS variables for position and visibility", async () => {
    const el = document.createElement("div");
    const positionRef = ref({ top: 100, left: 200 });
    const visibilityRef = ref({ vertical: true, horizontal: true });

    await mount(
      {
        template: `
        <div v-track-scroll>
          <p>Content</p>
        </div>
      `,
        directives: {
          trackScroll: VueTrackDirective
        },
        setup() {
          return {
            positionRef,
            visibilityRef
          };
        }
      },
      el
    );

    console.log(el);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(el.style.getPropertyValue("--vue-track-y")).toBe("100px");
    expect(el.style.getPropertyValue("--vue-track-x")).toBe("200px");
    expect(el.style.getPropertyValue("--vue-track-visible-y")).toBe("1");
    expect(el.style.getPropertyValue("--vue-track-visible-x")).toBe("1");
  });
});
