"use client";

import { useEffect, useRef } from "react";

import styles from "./pointer-trail.module.css";

type TrailPoint = {
  x: number;
  y: number;
};

const trailLength = 26;
const interactiveSelector =
  'a, button, input, textarea, select, summary, [role="button"]';

export function PointerTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let cleanupCursor: (() => void) | undefined;

    const enableCursor = () => {
      const canvas = canvasRef.current;
      const cursor = cursorRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !cursor || !context) {
        return undefined;
      }

      const root = document.documentElement;
      const points: TrailPoint[] = Array.from(
        { length: trailLength },
        () => ({ x: 0, y: 0 }),
      );
      const trailColor =
        getComputedStyle(root).getPropertyValue("--coral").trim() || "#cc785c";
      let frameId = 0;
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      let targetX = 0;
      let targetY = 0;
      let isVisible = false;

      const resizeCanvas = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        canvas.width = Math.round(viewportWidth * pixelRatio);
        canvas.height = Math.round(viewportHeight * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      };

      const setVisible = (visible: boolean) => {
        isVisible = visible;
        canvas.dataset.visible = String(visible);
        cursor.dataset.visible = String(visible);

        if (!visible) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
          context.clearRect(0, 0, viewportWidth, viewportHeight);
        }
      };

      const renderTrail = () => {
        frameId = 0;
        context.clearRect(0, 0, viewportWidth, viewportHeight);

        if (!isVisible) {
          return;
        }

        points[0].x += (targetX - points[0].x) * 0.42;
        points[0].y += (targetY - points[0].y) * 0.42;
        let remainingDistance = Math.hypot(
          targetX - points[0].x,
          targetY - points[0].y,
        );

        for (let index = 1; index < points.length; index += 1) {
          const followStrength = Math.max(0.2, 0.34 - index * 0.0045);
          points[index].x +=
            (points[index - 1].x - points[index].x) * followStrength;
          points[index].y +=
            (points[index - 1].y - points[index].y) * followStrength;
          remainingDistance = Math.max(
            remainingDistance,
            Math.hypot(
              points[index - 1].x - points[index].x,
              points[index - 1].y - points[index].y,
            ),
          );
        }

        if (remainingDistance < 0.12) {
          return;
        }

        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = trailColor;

        for (let index = points.length - 2; index >= 0; index -= 1) {
          const strength = 1 - index / (points.length - 1);
          const leadingPoint = points[index];
          const trailingPoint = points[index + 1];

          context.beginPath();
          context.moveTo(trailingPoint.x, trailingPoint.y);
          context.lineTo(leadingPoint.x, leadingPoint.y);
          context.globalAlpha = 0.06 + strength * 0.62;
          context.lineWidth = 0.35 + strength * 2.65;
          context.stroke();
        }

        context.globalAlpha = 1;
        frameId = window.requestAnimationFrame(renderTrail);
      };

      const scheduleTrail = () => {
        if (frameId === 0) {
          frameId = window.requestAnimationFrame(renderTrail);
        }
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          return;
        }

        targetX = event.clientX;
        targetY = event.clientY;
        cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

        if (!isVisible) {
          points.forEach((point) => {
            point.x = targetX;
            point.y = targetY;
          });
          setVisible(true);
        }

        scheduleTrail();

        const target = event.target instanceof Element ? event.target : null;
        cursor.dataset.interactive = String(
          Boolean(target?.closest(interactiveSelector)),
        );
      };

      const handlePointerOut = (event: PointerEvent) => {
        if (event.relatedTarget === null) {
          setVisible(false);
        }
      };

      const handlePointerDown = () => {
        cursor.dataset.pressed = "true";
      };

      const handlePointerUp = () => {
        cursor.dataset.pressed = "false";
      };

      const handleBlur = () => {
        setVisible(false);
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          setVisible(false);
        }
      };

      root.classList.add("portfolio-custom-cursor");
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerout", handlePointerOut);
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("blur", handleBlur);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        root.classList.remove("portfolio-custom-cursor");
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerout", handlePointerOut);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("blur", handleBlur);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
        context.clearRect(0, 0, viewportWidth, viewportHeight);
      };
    };

    const syncCursor = () => {
      cleanupCursor?.();
      cleanupCursor = undefined;

      if (finePointerQuery.matches && !reducedMotionQuery.matches) {
        cleanupCursor = enableCursor();
      }
    };

    syncCursor();
    finePointerQuery.addEventListener("change", syncCursor);
    reducedMotionQuery.addEventListener("change", syncCursor);

    return () => {
      finePointerQuery.removeEventListener("change", syncCursor);
      reducedMotionQuery.removeEventListener("change", syncCursor);
      cleanupCursor?.();
    };
  }, []);

  return (
    <div className={styles.cursorLayer} aria-hidden="true">
      <canvas className={styles.trailCanvas} ref={canvasRef} />
      <div className={styles.cursorPosition} ref={cursorRef}>
        <span className={styles.cursorRing} />
        <span className={styles.cursorDot} />
      </div>
    </div>
  );
}