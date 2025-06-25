export default function UserIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="8" r="4" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M4 20v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}
