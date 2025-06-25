// Example usage: import FlightIcon from './FlightIcon';
export default function FlightIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M2.94 12l8 3v5l-2 1v1l3-1 3 1v-1l-2-1v-5l8-3v-2l-8-3V2l2-1V0l-3 1-3-1v1l2 1v5l-8 3v2z" />
    </svg>
  );
}
