import { useEffect, useMemo, useRef } from "react";

export default function useScrollPositionAnchor<
  ElementType extends HTMLElement = HTMLElement,
>(
  elementSelector: string,
  lastOnScreen: (entry: IntersectionObserverEntry) => void,
) {
  const targetRef = useRef<ElementType | null>(null);
  const elements = useMemo(
    () =>
      Array.from(targetRef.current?.querySelectorAll(elementSelector) ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetRef.current, elementSelector],
  );

  const onLastScreenRef = useRef(lastOnScreen);
  onLastScreenRef.current = lastOnScreen;
  useEffect(() => {
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (
            elements.includes(ent.target) &&
            ent.rootBounds &&
            ent.rootBounds.top > ent.target.getBoundingClientRect().top
          ) {
            onLastScreenRef.current(ent);
          }
        });
      },
      {
        rootMargin: `-15% 0px`,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [elements]);

  return { targetRef };
}
