import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// Generate smooth non-linear declining curve points
const generateCurve = (startY: number, steepness: number, count: number) => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    // Non-linear easing: slow start, steep middle, gentle tail to zero
    const ease = 1 - Math.pow(t, steepness) * (1 - 0.08 * Math.sin(t * Math.PI));
    const x = 80 + t * 1280;
    const y = 60 + (1 - ease) * (740 - 60);
    // Push toward zero at the end
    const finalY = y + (740 - y) * Math.pow(t, 3) * 0.3;
    points.push({ x, y: Math.min(finalY, 740) });
  }
  // Ensure last point is at net zero line
  points[points.length - 1] = { x: 1360, y: 740 };
  return points;
};

const scope1Points = generateCurve(80, 1.8, 60);
const scope2Points = generateCurve(120, 2.2, 60);
const scope3Points = generateCurve(160, 2.8, 60);

const pointsToPath = (pts: { x: number; y: number }[]) => {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.5;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.5;
    d += ` C${cpx1} ${prev.y} ${cpx2} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return d;
};

const scope1Path = pointsToPath(scope1Points);
const scope2Path = pointsToPath(scope2Points);
const scope3Path = pointsToPath(scope3Points);

interface ScopeInfo {
  key: string;
  label: string;
  color: string;
  description: string;
  value: string;
}

const scopes: ScopeInfo[] = [
  {
    key: 'scope1',
    label: 'Scope 1',
    color: 'hsl(0, 84%, 60%)',
    description: 'Direct emissions from owned sources',
    value: '85k tCO₂e',
  },
  {
    key: 'scope2',
    label: 'Scope 2',
    color: 'hsl(38, 92%, 50%)',
    description: 'Indirect emissions from purchased energy',
    value: '62k tCO₂e',
  },
  {
    key: 'scope3',
    label: 'Scope 3',
    color: 'hsl(158, 100%, 41%)',
    description: 'Value chain emissions',
    value: '48k tCO₂e',
  },
];

const scopePaths: Record<string, string> = {
  scope1: scope1Path,
  scope2: scope2Path,
  scope3: scope3Path,
};

const scopePointArrays: Record<string, { x: number; y: number }[]> = {
  scope1: scope1Points,
  scope2: scope2Points,
  scope3: scope3Points,
};

export const NetZeroChart = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (scopeKey: string, e: React.MouseEvent<SVGPathElement>) => {
      const svg = ref.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 1440;
      const svgY = ((e.clientY - rect.top) / rect.height) * 800;
      setHovered(scopeKey);
      setMousePos({ x: svgX, y: svgY });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setMousePos(null);
  }, []);

  const hoveredScope = scopes.find((s) => s.key === hovered);

  return (
    <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '70vh' }}>
      <svg
        ref={ref}
        className="w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle grid lines */}
        {[200, 370, 540].map((y) => (
          <line
            key={y}
            x1="80"
            y1={y}
            x2="1360"
            y2={y}
            stroke="hsl(214, 32%, 91%)"
            strokeWidth="1"
            strokeDasharray="6 6"
            opacity="0.5"
          />
        ))}

        {/* Net zero baseline */}
        <line
          x1="80"
          y1="740"
          x2="1360"
          y2="740"
          stroke="hsl(158, 100%, 41%)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          opacity="0.4"
        />
        <text
          x="1370"
          y="745"
          fill="hsl(158, 100%, 41%)"
          fontSize="13"
          fontWeight="600"
          opacity="0.6"
        >
          Net Zero
        </text>

        {/* Scope lines */}
        {scopes.map((scope, i) => {
          const path = scopePaths[scope.key];
          const isActive = hovered === scope.key;
          const isDimmed = hovered !== null && !isActive;

          return (
            <g key={scope.key}>
              {/* Glow layer */}
              <motion.path
                d={path}
                stroke={scope.color}
                strokeWidth={isActive ? 10 : 6}
                strokeLinecap="round"
                fill="none"
                opacity={isActive ? 0.25 : 0.08}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.5, delay: i * 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ filter: `blur(${isActive ? 12 : 8}px)` }}
              />

              {/* Main line */}
              <motion.path
                d={path}
                stroke={scope.color}
                strokeWidth={isActive ? 4 : 2.5}
                strokeLinecap="round"
                fill="none"
                opacity={isDimmed ? 0.25 : 1}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.5, delay: i * 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
              />

              {/* Invisible fat hit area */}
              <path
                d={path}
                stroke="transparent"
                strokeWidth="28"
                fill="none"
                style={{ cursor: 'pointer' }}
                onMouseMove={(e) => handleMouseMove(scope.key, e)}
                onMouseLeave={handleMouseLeave}
              />

              {/* Start dot */}
              <motion.circle
                cx={scopePointArrays[scope.key][0].x}
                cy={scopePointArrays[scope.key][0].y}
                r={isActive ? 7 : 5}
                fill={scope.color}
                opacity={isDimmed ? 0.3 : 1}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: i * 0.3 }}
                style={{ transition: 'opacity 0.3s' }}
              />
            </g>
          );
        })}

        {/* Hover dot on line */}
        {hovered && mousePos && (
          <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r="6"
            fill={hoveredScope?.color}
            stroke="white"
            strokeWidth="2.5"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </svg>

      {/* Hover scope card */}
      {hoveredScope && mousePos && ref.current && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${(mousePos.x / 1440) * 100}%`,
            top: `${(mousePos.y / 800) * 100}%`,
            transform: 'translate(-50%, -120%)',
          }}
        >
          <div
            className="rounded-xl px-5 py-3.5 shadow-lg border backdrop-blur-sm"
            style={{
              backgroundColor: 'hsla(0, 0%, 100%, 0.95)',
              borderColor: hoveredScope.color,
              borderWidth: '1.5px',
              minWidth: '180px',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredScope.color }}
              />
              <span
                className="font-semibold text-sm"
                style={{ color: 'hsl(222, 47%, 11%)' }}
              >
                {hoveredScope.label}
              </span>
            </div>
            <p
              className="text-xs mb-1"
              style={{ color: 'hsl(215, 16%, 47%)' }}
            >
              {hoveredScope.description}
            </p>
            <p
              className="text-base font-bold"
              style={{ color: hoveredScope.color }}
            >
              {hoveredScope.value}
            </p>
          </div>
        </div>
      )}

      {/* Bottom scope legend pills */}
      <div className="flex justify-center gap-6 mt-4">
        {scopes.map((scope) => (
          <div key={scope.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: scope.color }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: 'hsl(215, 16%, 47%)' }}
            >
              {scope.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
