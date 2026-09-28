export function StaticArchitecture() {
  return (
    <svg
      viewBox="0 0 560 460"
      role="img"
      aria-label="Client connects to API and service, then database and cache"
      className="static-architecture"
    >
      <g fill="none" stroke="#55534e" strokeWidth="1">
        <path d="M130 130H280V225H420M280 225V345H160M280 345h140" />
        <path d="m55 115 75-40 75 40-75 40Zm0 0v25l75 40 75-40v-25m-75 40v25M205 220l75-40 75 40-75 40Zm0 0v25l75 40 75-40v-25m-75 40v25M350 330l70-40 70 40-70 40Zm0 0v30l70 40 70-40v-30m-70 40v30M90 340l70-40 70 40-70 40Zm0 0v30l70 40 70-40v-30m-70 40v30" />
        <path
          d="M205 220l75-40 75 40-75 40Z"
          fill="#caa47833"
          stroke="#caa478"
        />
      </g>
      <g fontFamily="monospace" fontSize="10" fill="#b5b2aa">
        <text x="105" y="60">
          CLIENT
        </text>
        <text x="270" y="165" fill="#caa478">
          API
        </text>
        <text x="396" y="210">
          SERVICE
        </text>
        <text x="133" y="430">
          DATABASE
        </text>
        <text x="404" y="430">
          CACHE
        </text>
      </g>
    </svg>
  );
}
