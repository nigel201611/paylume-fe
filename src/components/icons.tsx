type IconProps = { index: number }

export function CapabilityIcon({ index }: IconProps) {
  const paths = [
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M3 10h18" />
      <circle cx="17" cy="14" r="1" />
    </>,
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>,
    <>
      <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>,
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3" />
    </>,
  ]

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {paths[index] ?? paths[0]}
    </svg>
  )
}

export function SolutionIcon({ index }: IconProps) {
  const paths = [
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M3 10h18" />
      <path d="m8 15 2.5-2.5L13 15l3-4" />
    </>,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>,
    <>
      <path d="M4 20V11M10 20V4M16 20v-6M22 20H2" />
    </>,
  ]

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {paths[index] ?? paths[0]}
    </svg>
  )
}
