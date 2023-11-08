import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  behavior?: "smooth" | "auto";
  interval?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, behavior, interval }: Props) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);
  let itemToGap = 0;

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items },
    );

    return;
  }

  const goToItem = (index: number) => {
    const item = items.item(index);

    if (!isHTMLElement(item)) {
      console.warn(
        `Element at index ${index} is not an html element. Skipping carousel`,
      );

      return;
    }

    slider.scrollTo({
      top: 0,
      behavior,
      left: item.offsetLeft - root.offsetLeft,
    });
  };

  const mobileScreen = 760;
  if (root.clientWidth < mobileScreen) {
    goToItem(1);
  } else {
    goToItem(0);
  }

  const onClickPrev = () => {
    const [item] = items;
    const sliderWidth = slider.clientWidth;
    const itemWidth = item.clientWidth;

    const sliderWidthWithoutRest = sliderWidth - (sliderWidth % itemWidth);

    const quantityOfVisibleCards = sliderWidthWithoutRest / itemWidth;

    if (itemToGap === 0) {
      itemToGap = items.length;
      onClickPrev();
      return;
    }

    items[
      (quantityOfVisibleCards + itemToGap) - (quantityOfVisibleCards + 1)
    ].scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });

    if (itemToGap === items.length) {
      itemToGap -= quantityOfVisibleCards;
      return;
    }

    itemToGap--;
  };

  const onClickNext = () => {
    const [item] = items;
    const sliderWidth = slider.clientWidth;
    const itemWidth = item.clientWidth;

    const sliderWidthWithoutRest = sliderWidth - (sliderWidth % itemWidth);

    const quantityOfVisibleCards = sliderWidthWithoutRest / itemWidth;

    if (quantityOfVisibleCards + itemToGap === items.length) {
      itemToGap = -quantityOfVisibleCards;
      onClickNext();
      return;
    }

    items[quantityOfVisibleCards + itemToGap].scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });

    if (itemToGap < 0) {
      itemToGap = 0;
      return;
    }

    itemToGap++;
  };

  const observer = new IntersectionObserver(
    (items) =>
      items.forEach((item) => {
        const index =
          Number(item.target.getAttribute(ATTRIBUTES["data-slider-item"])) || 0;
        const dot = dots?.item(index);

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  items.forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
  }

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({ rootId, behavior = "smooth", interval }: Props) {
  useEffect(() => setup({ rootId, behavior, interval }), [
    rootId,
    behavior,
    interval,
  ]);

  return <div data-slider-controller-js />;
}

export default Slider;
