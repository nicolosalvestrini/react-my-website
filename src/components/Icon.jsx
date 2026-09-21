const PATHS = {
  code: 'M9 18l-5-6 5-6M15 6l5 6-5 6',
  atom: 'M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z|M4 12c0-3.5 3.5-8 8-8s8 4.5 8 8-3.5 8-8 8-8-4.5-8-8z|M12 2c-2.5 2-4 6-4 10s1.5 8 4 10|M12 2c2.5 2 4 6 4 10s-1.5 8-4 10',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z|M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6|M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c2.5 2.7 4 6.5 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.5-4-10s1.5-7.3 4-10z',
  folder: 'M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3H9.8l-.4 2.5a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2l.4 2.5h4.4l.4-2.5c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z',
  briefcase: 'M4 8h16v11H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13h16',
  mail: 'M4 5h16v14H4zM4 6l8 7 8-7',
  message: 'M4 4h16v12H8l-4 4z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  check: 'M5 12l4 4 10-10',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  external: 'M14 5h5v5M19 5L10 14M6 5H5v14h14v-1',
  download: 'M12 4v11M8 11l4 4 4-4M5 19h14',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4-1 4-4.5 0-1.1-.4-2-1-2.7.1-.3.4-1.4-.1-2.8 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.6 0C5 5.7 3.9 6 3.9 6c-.5 1.4-.2 2.5-.1 2.8-.6.7-1 1.6-1 2.7 0 3.5 2 4.3 4 4.5-.6.6-.6 1.2-.5 2V21',
  linkedin: 'M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 0 1 4 0V16M12 12.5v3.5',
  clock: 'M12 7v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  quote: 'M7 7h4v6H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM15 7h4v6h-4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.8, style }) {
  const value = PATHS[name] || PATHS.code;
  const subPaths = value.split('|');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {subPaths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
