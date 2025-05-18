export default function Die({ id, value, isHeld, handleHold }) {
  return (
    <button
      onClick={() => handleHold(id)}
      type="button"
      className={`aspect-square p-4 rounded-2xl border-4 border-b-6 cursor-pointer text-5xl ${isHeld ? "bg-green-100 border-green-400 text-green-600" : "bg-neutral-100 border-neutral-400 text-neutral-600"} focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-4`}
    >
      {value}
    </button>
  );
}
