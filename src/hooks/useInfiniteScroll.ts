import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(callback: () => void, isFetching: boolean) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isFetching) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, {
      threshold: 0.1,
      rootMargin: "100px", // Start loading 100px before the element is visible
    });

    if (node) observer.current.observe(node);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [node, callback, isFetching]);

  return setNode;
}
