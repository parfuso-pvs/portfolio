"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

const boardCorners = {
  topLeft: { x: 150, y: 516 },
  topRight: { x: 340, y: 552 },
  bottomRight: { x: 397, y: 513 },
  bottomLeft: { x: 207, y: 477 },
} satisfies Record<string, Point>;

function interpolate(start: Point, end: Point, amount: number): Point {
  return {
    x: start.x + (end.x - start.x) * amount,
    y: start.y + (end.y - start.y) * amount,
  };
}

function boardPoint(row: number, column: number): Point {
  const rowRatio = row / 8;
  const columnRatio = column / 8;
  const left = interpolate(
    boardCorners.topLeft,
    boardCorners.bottomLeft,
    rowRatio,
  );
  const right = interpolate(
    boardCorners.topRight,
    boardCorners.bottomRight,
    rowRatio,
  );

  return interpolate(left, right, columnRatio);
}

const boardSquares = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, column) => {
    const points = [
      boardPoint(row, column),
      boardPoint(row, column + 1),
      boardPoint(row + 1, column + 1),
      boardPoint(row + 1, column),
    ]
      .map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ");

    return { column, points, row };
  }),
).flat();

type PieceProps = {
  className?: string;
  tone: "ochre" | "teal";
  transform: string;
};

// Font Awesome Free 7.3.1 — chess-knight (CC BY 4.0)
// https://fontawesome.com/license/free
const chessKnightPath =
  "M192-32c106 0 192 86 192 192v133.5c0 17-6.8 33.2-18.7 45.2L320 384l50.8 50.7c8.5 8.5 13.2 20 13.2 32 0 25-20.3 45.2-45.2 45.3H45.3C20.3 512 .1 491.7.1 466.7c0-12 4.8-23.5 13.2-32L64 384v-34.6c0-18.7 8.2-36.4 22.3-48.6L176 224h-48l-12.1 12.1c-12.7 12.7-30 19.9-48 19.9C30.4 256 0 225.6 0 188.1v-8.7c0-22.8 8.2-44.9 23.1-62.3L96 32V0c0-17.7 14.3-32 32-32h64zM160 72a24 24 0 1 0 0 48 24 24 0 1 0 0-48z";

function Pawn({ className = "", tone, transform }: PieceProps) {
  return (
    <g className={`chess-piece chess-piece-${tone} ${className}`} transform={transform}>
      <ellipse className="piece-shadow" cx="0" cy="1" rx="13" ry="4" />
      <path className="piece-base-dark" d="m-12-2 3-5H9l3 5-4 4H-8Z" />
      <path className="piece-base-light" d="m-9-7 2-5H7l2 5Z" />
      <path className="piece-rim" d="m-7-12 2-4H5l2 4Z" />
      <path className="piece-fill" d="M-5-16c2-5 3-9 3-13h4c0 4 1 8 3 13Z" />
      <path className="piece-plane-light" d="M-5-16c2-5 3-9 3-13h2c-1 6-1 10 0 13Z" />
      <path className="piece-plane-dark" d="M0-16c1-5 1-9 0-13h2c0 4 1 8 3 13Z" />
      <path className="piece-rim" d="m-4-29-1-3H5l-1 3Z" />
      <circle className="piece-fill" cx="0" cy="-38" r="6.5" />
      <path className="piece-plane-light" d="M-5-42a6.5 6.5 0 0 0 3 10 7 7 0 0 1 2-12 6.5 6.5 0 0 0-5 2Z" />
      <path className="piece-plane-dark" d="M2-44a6.5 6.5 0 0 1 2 11 7 7 0 0 0 0-10Z" />
      <path className="piece-detail" d="M-9-7H9M-7-12H7M-5-16H5M-5-32H5" />
      <path className="piece-etch" d="m-2-20 3-2m-4-16 4-2" />
    </g>
  );
}

function Rook({ className = "", tone, transform }: PieceProps) {
  return (
    <g className={`chess-piece chess-piece-${tone} ${className}`} transform={transform}>
      <ellipse className="piece-shadow" cx="0" cy="1" rx="15" ry="4.5" />
      <path className="piece-base-dark" d="m-14-2 3-6h22l3 6-4 4h-20Z" />
      <path className="piece-base-light" d="m-11-8 3-5H8l3 5Z" />
      <path className="piece-rim" d="m-9-13 2-4H7l2 4Z" />
      <path className="piece-fill" d="M-7-17c2-9 3-17 2-24H5c-1 7 0 15 2 24Z" />
      <path className="piece-plane-light" d="M-7-17c2-9 3-17 2-24h4c-1 10-1 18-1 24Z" />
      <path className="piece-plane-dark" d="M2-17c1-9 1-17 0-24h3c-1 7 0 15 2 24Z" />
      <path className="piece-rim" d="m-6-41-3-4H9l-3 4Z" />
      <path className="piece-fill" d="M-9-45v-11h4v4h3v-4h4v4h3v-4h4v11Z" />
      <path className="piece-plane-light" d="M-9-45v-11h3v8l3 3Z" />
      <path className="piece-plane-dark" d="M5-52v-4h4v11H4l2-3Z" />
      <path className="piece-detail" d="M-9-45H9M-6-41H6M-7-17H7M-9-13H9M-11-8h22" />
      <path className="piece-etch" d="m-3-23 5-3m-4-8 4-2m-6-13 3 1" />
    </g>
  );
}

function Knight({ className = "", tone, transform }: PieceProps) {
  const clipId = `hero-knight-${tone}-clip`;

  return (
    <g className={`chess-piece chess-piece-${tone} ${className}`} transform={transform}>
      <ellipse className="piece-shadow" cx="0" cy="1" rx="20" ry="4.5" />
      <defs>
        <clipPath id={clipId}>
          <path d={chessKnightPath} />
        </clipPath>
      </defs>
      <g transform="translate(-18 -61) scale(.095 .12)">
        <path className="piece-knight-body" d={chessKnightPath} />
        <g clipPath={`url(#${clipId})`}>
          <path className="piece-knight-light" d="M-12-48h172l82 570H-12Z" />
          <path className="piece-knight-dark" d="M258-48h148v580H315L176 182Z" />
          <path className="piece-knight-facet" d="m96 32 80 192-90 77-22 48 129-103 65 266H128L64 384v-35l22-48 90-77h-48l-12 12-48 20Z" />
        </g>
        <path className="piece-knight-outline" d={chessKnightPath} />
        <circle className="piece-knight-eye-surface" cx="160" cy="96" r="24" />
        <circle className="piece-knight-eye" cx="160" cy="96" r="9" />
        <path className="piece-knight-detail" d="m96 32 80 192-90 77M176 224l82 288M64 384h256M13 435h358" />
      </g>
    </g>
  );
}

export function HeroArtwork() {
  const artworkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    const hero = artwork?.closest<HTMLElement>(".hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (!artwork || !hero || reducedMotion.matches || coarsePointer.matches) {
      return;
    }

    const layers = Array.from(
      artwork.querySelectorAll<SVGGElement>(".artwork-parallax"),
    ).map((element) => ({
      currentRotation: 0,
      currentX: 0,
      currentY: 0,
      depth: Number(element.dataset.depth ?? 0),
      element,
      rotation: Number(element.dataset.rotation ?? 0),
      targetRotation: 0,
      targetX: 0,
      targetY: 0,
    }));

    let frame: number | null = null;

    const render = () => {
      let stillMoving = false;

      layers.forEach((layer) => {
        layer.currentX += (layer.targetX - layer.currentX) * 0.11;
        layer.currentY += (layer.targetY - layer.currentY) * 0.11;
        layer.currentRotation +=
          (layer.targetRotation - layer.currentRotation) * 0.1;

        const remaining =
          Math.abs(layer.targetX - layer.currentX) +
          Math.abs(layer.targetY - layer.currentY) +
          Math.abs(layer.targetRotation - layer.currentRotation);

        if (remaining > 0.025) stillMoving = true;

        layer.element.style.transform = `translate3d(${layer.currentX.toFixed(3)}px, ${layer.currentY.toFixed(3)}px, 0) rotate(${layer.currentRotation.toFixed(3)}deg)`;
      });

      frame = stillMoving ? window.requestAnimationFrame(render) : null;
    };

    const requestRender = () => {
      if (frame === null) frame = window.requestAnimationFrame(render);
    };

    const setTargets = (normalizedX: number, normalizedY: number) => {
      layers.forEach((layer) => {
        layer.targetX = normalizedX * layer.depth;
        layer.targetY = normalizedY * layer.depth * 0.72;
        layer.targetRotation = normalizedX * layer.rotation;
      });
      requestRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const normalizedX = Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
      );
      const normalizedY = Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
      );

      setTargets(normalizedX, normalizedY);
    };

    const handlePointerLeave = () => setTargets(0, 0);

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="hero-artwork"
      fill="none"
      ref={artworkRef}
      viewBox="0 0 1200 675"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hero-speckles" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="7" r="0.65" fill="currentColor" opacity="0.32" />
          <circle cx="24" cy="18" r="0.45" fill="currentColor" opacity="0.24" />
          <path d="m11 27 3-1m14-22 2 2" stroke="currentColor" strokeWidth="0.55" opacity="0.24" />
        </pattern>
      </defs>

      <g className="artwork-desk-plane">
        <path className="desk-edge desk-edge-primary desk-edge-left" d="M-28 553c46-5 74-21 108-22 31-1 51 9 82 8" />
        <path className="desk-edge desk-edge-secondary desk-edge-left" d="M-28 558c46-5 74-21 108-22 31-1 51 9 82 8" />
        <path className="desk-edge desk-edge-primary desk-edge-board" d="M161 539c79 5 164 9 258 12" />
        <path className="desk-edge desk-edge-secondary desk-edge-board" d="M161 544c79 5 164 9 258 12" />
        <path className="desk-edge desk-edge-primary desk-edge-ghost" d="M419 551c143 5 286 8 438 6" />
        <path className="desk-edge desk-edge-secondary desk-edge-ghost" d="M419 556c143 5 286 8 438 6" />
        <path className="desk-edge desk-edge-primary desk-edge-right" d="M857 557c108-2 217-8 371-17" />
        <path className="desk-edge desk-edge-secondary desk-edge-right" d="M857 562c108-2 217-8 371-17" />
      </g>

      <g className="artwork-lamp">
        <g className="lamp-static">
          <path className="lamp-cord lamp-ink" d="M-22 548c42-4 64-19 96-20" />
          <ellipse className="lamp-base-shadow" cx="121" cy="526" rx="87" ry="18" />
          <path className="lamp-base-fill" d="M48 512c5-19 142-21 151 0l-3 18c-15 18-129 21-150 1Z" />
          <ellipse className="lamp-ink" cx="122" cy="511" rx="76" ry="14" />
          <path className="lamp-wear" d="M72 513c27 8 78 7 105-1M57 524c31 10 94 10 127-1" />

          <path className="lamp-arm-shadow" d="M121 510 76 308" />
          <path className="lamp-arm-fill" d="M121 510 76 308" />
          <path className="lamp-arm-highlight" d="M128 506 86 309" />
          <path className="lamp-arm-brace" d="m105 500-42-187" />

          <g className="lamp-joint" transform="translate(77 309)">
            <circle className="lamp-joint-fill" r="18" />
            <circle className="lamp-ink" r="10" />
            <circle className="lamp-joint-core" r="4" />
          </g>
          <g className="lamp-joint" transform="translate(121 500)">
            <circle className="lamp-joint-fill" r="14" />
            <circle className="lamp-ink" r="7" />
          </g>

          <g className="artwork-parallax lamp-upper-arm-motion" data-depth="0" data-rotation="0.55">
            <path className="lamp-arm-shadow" d="M76 308 169 140" />
            <path className="lamp-arm-fill" d="M76 308 169 140" />
            <path className="lamp-arm-highlight" d="M86 309 177 145" />
            <path className="lamp-arm-brace" d="m92 312 92-161" />

            <g className="lamp-joint" transform="translate(169 141)">
              <circle className="lamp-joint-fill" r="17" />
              <circle className="lamp-ink" r="9" />
              <circle className="lamp-joint-core" r="3.5" />
            </g>

            <g className="artwork-parallax lamp-head-motion" data-depth="2.4" data-rotation="1.15">
              <path className="lamp-neck lamp-ink" d="m164 138 24-11 12 14-24 16Z" />
              <g className="lamp-head" transform="rotate(-5 235 129)">
                <path className="lamp-cap-fill" d="M178 119c0-13 8-23 21-27l14 8-5 20-24 12Z" />
                <path className="lamp-shade-fill" d="M181 129l2-18c2-21 24-34 50-35 32 0 58 20 67 49-40-8-85 5-119 29-3-7-3-17 0-25Z" />
                <path className="lamp-shade-inside" d="M181 154c34-24 79-37 119-29l-3 14c-34 15-76 27-107 24Z" />
                <path className="lamp-rim lamp-ink" d="M181 154c34-24 79-37 119-29m-110 38c31 3 73-9 107-24" />
                <path className="lamp-ink" d="M181 129l2-18c2-21 24-34 50-35 32 0 58 20 67 49l-3 14c-34 15-76 27-107 24l-9-9c-3-7-3-17 0-25Z" />
                <path className="lamp-wear" d="m202 105 19-7m39-3 13 7m-66 47 18-7" />
                <path className="lamp-speckle" d="M181 129l2-18c2-21 24-34 50-35 32 0 58 20 67 49-40-8-85 5-119 29-3-7-3-17 0-25Z" />
              </g>
            </g>
          </g>
        </g>
      </g>

      <g className="artwork-chessboard">
        <g className="chessboard-static">
          <ellipse className="board-contact-shadow" cx="273" cy="550" rx="137" ry="24" />
          <path className="board-side board-side-back" d="m150 516 190 36 57-39-1 16-56 41-190-37Z" />
          <path className="board-side board-side-front" d="m150 533 190 37 56-41-2 17-54 42-189-37Z" />
          <g className="board-grid">
            {boardSquares.map(({ column, points, row }) => (
              <polygon
                className={(row + column) % 2 === 0 ? "board-square-light" : "board-square-dark"}
                key={`${row}-${column}`}
                points={points}
              />
            ))}
          </g>
          <polygon className="board-outline" points="150,516 340,552 397,513 207,477" />
          <path className="board-wear" d="m172 520 34 6m39-33 24 6m36 46 27 5m28-29 18 4" />
        </g>

        <g className="artwork-parallax chess-standing-piece" data-depth="1.25" data-rotation="0.04">
          <Rook tone="teal" transform="translate(220 500) scale(1.04)" />
        </g>
        <g className="artwork-parallax chess-standing-piece" data-depth="1.8" data-rotation="0.07">
          <Knight tone="ochre" transform="translate(286 514) scale(.92)" />
        </g>
        <g className="artwork-parallax chess-standing-piece" data-depth="1.45" data-rotation="0.05">
          <Pawn tone="ochre" transform="translate(347 521) scale(.8)" />
        </g>
        <g className="artwork-parallax chess-standing-piece" data-depth="2" data-rotation="0.08">
          <Pawn tone="teal" transform="translate(268 536) scale(.7)" />
        </g>

        <g className="chess-fallen-piece">
          <Pawn tone="ochre" transform="translate(132 551) rotate(-67) scale(.7)" />
        </g>
        <g className="chess-fallen-piece">
          <Rook tone="teal" transform="translate(171 575) rotate(76) scale(.64)" />
        </g>
      </g>

      <g className="artwork-notepad">
        <g className="notepad-static">
          <ellipse className="notepad-contact-shadow" cx="1083" cy="568" rx="70" ry="13" />
          <path className="notepad-spine-fill" d="m1015 528 92 18 46-28-1 11-44 27-91-18Z" />
          <path className="notepad-underlay" d="m1018 546 90 18 43-27-1 11-43 27-89-18Z" />
          <path className="notepad-pages" d="m1017 538 91 18 44-27-1 10-43 27-90-18Z" />
          <path className="notepad-page-line" d="m1024 548 82 16 38-23" />
          <path className="notepad-top" d="m1015 528 92 18 46-28-94-19-45 28Z" />
          <path className="notepad-ink" d="m1015 528 92 18 46-28-94-19-45 28Zm2 10 91 18 44-27m-134 28 89 18 43-27" />
          <path className="notepad-binding" d="M1052 502c-5-7-11 1-5 9m-7-1c-5-7-11 1-5 9m-7-1c-5-7-11 1-5 9" />
          <path className="notepad-wear" d="m1035 526 18 4m23-21 17 4m20 24 19-12m-101 30 24 5" />
          <path className="notepad-speckle" d="m1015 528 92 18 46-28-94-19-45 28Z" />
        </g>
      </g>

      <g className="artwork-parallax artwork-brush-oval" data-depth="1" data-rotation="0.05">
        <path className="brush-stroke brush-stroke-one" d="M1110 254c39-30 100-38 139-20m20 19c12 18-1 41-31 58-39 22-100 25-136 5" />
        <path className="brush-stroke brush-stroke-two" d="M1124 263c34-23 82-30 116-19m18 15c7 14-5 31-29 44-34 18-81 20-112 6" />
        <path className="brush-stroke brush-stroke-three" d="M1141 247c28-13 64-17 89-10m19 63c-25 14-65 18-94 10" />
        <path className="brush-dry-gaps" d="m1120 246 21 3m91-18 15 6m-145 92 23-3m94 1 19-7" />
      </g>

      <g className="artwork-parallax artwork-incidental artwork-incidental-x" data-depth="2.8" data-rotation="0.2">
        <path d="m328 574 22 18m-18 3 23-24" />
        <path className="mark-ghost" d="m325 577 22 18m-14 3 25-24" />
      </g>

      <g className="artwork-parallax artwork-incidental artwork-incidental-strokes" data-depth="1.5" data-rotation="0.08">
        <path d="m923 103 3-10m7 11 4-11" />
        <path className="mark-ghost" d="m922 105 3-9m9 10 4-12" />
      </g>
    </svg>
  );
}
