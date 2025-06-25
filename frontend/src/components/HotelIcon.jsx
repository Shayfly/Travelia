// Example usage: import HotelIcon from './HotelIcon';
export default function HotelIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M7 21v-4m4 4v-4m4 4v-4m-8-4h12M7 9h12" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}
