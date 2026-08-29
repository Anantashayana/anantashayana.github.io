// HeroScene — an animated "distributed system" constellation of the tech
// stack. Tool logos are nodes connected by links, with data pulses flowing
// along the edges. Abstract, clean, all-code. Themeable + reduced-motion aware.
import React from 'react';
import './HeroScene.css';

const CDN = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;

// Node positions in a 440 x 360 viewBox.
const nodes = [
  { id: 'java', name: 'Java', src: CDN('openjdk', 'E76F00'), x: 96, y: 70, r: 26 },
  { id: 'spring', name: 'Spring Boot', src: CDN('springboot', '6DB33F'), x: 232, y: 44, r: 24 },
  { id: 'scala', name: 'Scala', src: CDN('scala', 'DC322F'), x: 356, y: 92, r: 24 },
  { id: 'kafka', name: 'Kafka', src: CDN('apachekafka', 'B0B0B0'), x: 220, y: 172, r: 30 },
  { id: 'spark', name: 'Spark', src: CDN('apachespark', 'E25A1C'), x: 372, y: 214, r: 24 },
  { id: 'go', name: 'Go', src: CDN('go', '00ADD8'), x: 70, y: 190, r: 24 },
  { id: 'postgres', name: 'PostgreSQL', src: CDN('postgresql', '4169E1'), x: 150, y: 296, r: 26 },
  { id: 'spark2', name: 'Google Cloud', src: CDN('googlecloud', '4285F4'), x: 316, y: 306, r: 22 },
  { id: 'aws', name: 'AWS', inline: 'aws', x: 44, y: 300, r: 22 },
];

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

// Edges — Kafka is the hub of the data pipeline; clouds host the services.
const edges = [
  ['java', 'spring'],
  ['spring', 'scala'],
  ['java', 'kafka'],
  ['spring', 'kafka'],
  ['scala', 'kafka'],
  ['kafka', 'spark'],
  ['kafka', 'postgres'],
  ['spark', 'spark2'],
  ['go', 'kafka'],
  ['go', 'postgres'],
  ['aws', 'go'],
  ['postgres', 'spark2'],
];

const HeroScene = () => {
  return (
    <div className="scene" aria-hidden="true">
      <svg
        className="scene__svg"
        viewBox="0 0 440 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {/* Links */}
        <g className="scene__links">
          {edges.map(([a, b], i) => {
            const A = nodeById[a];
            const B = nodeById[b];
            return (
              <line
                key={`e-${i}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                className="link"
                style={{ animationDelay: `${(i % 5) * 0.3}s` }}
              />
            );
          })}
        </g>

        {/* Data pulses traveling along edges */}
        <g className="scene__pulses">
          {edges.map(([a, b], i) => {
            const A = nodeById[a];
            const B = nodeById[b];
            return (
              <circle key={`p-${i}`} r="2.4" className="pulse">
                <animateMotion
                  dur={`${2.4 + (i % 4) * 0.6}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                  path={`M${A.x},${A.y} L${B.x},${B.y}`}
                />
              </circle>
            );
          })}
        </g>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g
            key={n.id}
            className={`node node--${(i % 6) + 1}`}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r={n.r + 5} className="node__halo" />
            <circle cx={n.x} cy={n.y} r={n.r} className="node__disc" />
            {n.inline === 'aws' ? (
              <AwsMark cx={n.x} cy={n.y} size={n.r * 1.1} />
            ) : (
              <image
                href={n.src}
                x={n.x - n.r * 0.5}
                y={n.y - n.r * 0.5}
                width={n.r}
                height={n.r}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Inline AWS mark (the "smile" arrow) so it never depends on a flaky CDN.
const AwsMark = ({ cx, cy, size }) => {
  const s = size / 24;
  return (
    <g transform={`translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})`} fill="#FF9900">
      <path d="M6.8 10.6c0 .3 0 .5.1.7.1.2.2.4.3.6 0 .1.1.1.1.2s0 .1-.1.2l-.5.3h-.2c-.1 0-.1-.1-.2-.1-.1-.1-.2-.2-.2-.4l-.2-.4c-.6.7-1.3 1-2.2 1-.6 0-1.1-.2-1.5-.5-.4-.4-.6-.9-.6-1.5s.2-1.2.7-1.6c.5-.4 1.1-.6 2-.6.3 0 .6 0 .9.1.3 0 .6.1 1 .2v-.6c0-.6-.1-1-.4-1.2-.2-.3-.7-.4-1.3-.4-.3 0-.6 0-.9.1-.3.1-.6.2-.9.3h-.3c-.1 0-.1-.1-.1-.3v-.4c0-.1 0-.2.1-.3 0-.1.1-.1.2-.2.3-.1.6-.3 1-.4.4-.1.8-.1 1.3-.1 1 0 1.7.2 2.1.7.5.4.7 1.1.7 2v2.6zm-3 1.1c.3 0 .6-.1.9-.2.3-.1.6-.3.8-.6.1-.2.2-.3.3-.5 0-.2.1-.4.1-.7v-.3c-.3-.1-.5-.1-.8-.2-.3 0-.5-.1-.8-.1-.5 0-.9.1-1.2.3-.3.2-.4.5-.4.9 0 .4.1.7.3.9.2.1.5.2.8.2zm6 .8c-.2 0-.3 0-.3-.1-.1 0-.1-.1-.2-.3l-1.7-5.7c0-.2-.1-.3-.1-.3 0-.1.1-.2.2-.2h.7c.2 0 .3 0 .3.1.1.1.1.1.1.3l1.2 4.8 1.1-4.8c0-.2.1-.3.1-.3.1-.1.2-.1.3-.1h.6c.2 0 .3 0 .3.1.1.1.1.1.2.3l1.1 4.9 1.2-4.9c0-.2.1-.3.1-.3.1-.1.2-.1.3-.1h.7c.1 0 .2.1.2.2v.1c0 .1 0 .1-.1.2l-1.7 5.7c0 .2-.1.3-.2.3-.1.1-.2.1-.3.1h-.6c-.2 0-.3 0-.3-.1-.1-.1-.1-.2-.2-.3l-1.1-4.7-1.1 4.7c0 .2-.1.3-.2.3-.1.1-.2.1-.3.1h-.3zm9.5.2c-.4 0-.8 0-1.2-.1-.4-.1-.7-.2-.9-.3-.1-.1-.2-.2-.2-.2 0-.1-.1-.2-.1-.2v-.4c0-.2.1-.2.2-.2h.1c.1 0 .1 0 .2.1.3.1.6.2.9.3.3.1.6.1 1 .1.5 0 .9-.1 1.2-.3.3-.2.4-.4.4-.7 0-.2-.1-.4-.2-.5-.1-.1-.4-.3-.8-.4l-1.1-.3c-.6-.2-1-.4-1.2-.8-.3-.3-.4-.7-.4-1.1 0-.3.1-.6.2-.8.1-.2.3-.4.6-.6.2-.2.5-.3.8-.4.3-.1.6-.1 1-.1.2 0 .3 0 .5.1.2 0 .3.1.5.1.1 0 .3.1.4.1.1.1.2.1.3.1.1.1.1.1.2.2 0 .1.1.1.1.2v.4c0 .2-.1.2-.2.2-.1 0-.2 0-.4-.1-.5-.2-1-.3-1.6-.3-.5 0-.8.1-1.1.2-.2.2-.4.4-.4.7 0 .2.1.4.2.5.2.1.5.3.9.4l1.1.3c.6.2 1 .4 1.2.7.2.3.4.7.4 1.1 0 .3-.1.6-.2.9-.1.3-.3.5-.6.7-.2.2-.5.3-.9.4-.3.2-.7.2-1.1.2z" />
      <path d="M21.7 16.2c-2.6 1.9-6.4 2.9-9.7 2.9-4.6 0-8.7-1.7-11.8-4.5-.2-.2 0-.5.3-.3 3.4 2 7.5 3.1 11.8 3.1 2.9 0 6.1-.6 9.1-1.9.4-.2.8.3.3.7z" />
      <path d="M22.8 15c-.3-.4-2.2-.2-3-.1-.2 0-.3-.2-.1-.3 1.5-1.1 4-.8 4.3-.4.3.4-.1 2.9-1.5 4.1-.2.2-.4.1-.3-.1.3-.8 1-2.7.6-3.2z" />
    </g>
  );
};

export default HeroScene;
