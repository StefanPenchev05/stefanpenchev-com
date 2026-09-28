const nodes = [
  { name: "CLIENT", x: 130, y: 70 },
  { name: "API", x: 270, y: 155 },
  { name: "SERVICE", x: 300, y: 245 },
  { name: "DATABASE", x: 155, y: 365 },
  { name: "CACHE", x: 430, y: 365 },
];
export function StaticArchitecture() {
  return (
    <svg
      viewBox="0 0 560 460"
      role="img"
      aria-label="Client connects to API, API to service, and service to database and cache"
      className="static-architecture"
    >
      <g fill="none" stroke="#79796e" strokeWidth="1">
        <path d="M130 105V116H270V129M270 190V205H300V219M300 280V311H155V339M300 311H430V339" />
        {nodes.map((node) => (
          <g key={node.name} transform={`translate(${node.x} ${node.y})`}>
            <path
              d="M-50 0 0-26 50 0 0 26ZM-50 0v14L0 40l50-26V0M0 26v14"
              fill={node.name === "API" ? "#30291f" : "#121410"}
              stroke={node.name === "API" ? "#c7a77d" : "#79796e"}
            />
            <text
              x="0"
              y={node.name === "DATABASE" || node.name === "CACHE" ? 67 : -42}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="12"
              fill={node.name === "API" ? "#c7a77d" : "#c4c6bb"}
              stroke="none"
            >
              {node.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
