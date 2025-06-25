// Example usage: import CarIcon from './CarIcon';
export default function CarIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M3 13l1-3 2-4h12l2 4 1 3v5h-2a2 2 0 11-4 0H9a2 2 0 11-4 0H3v-5z" />
    </svg>
  );
}
