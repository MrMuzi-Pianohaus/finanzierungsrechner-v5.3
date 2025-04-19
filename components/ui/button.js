export function Button({ children, ...props }) {
  return <button className="bg-[#8b0000] text-white px-4 py-2 rounded hover:bg-red-800 transition" {...props}>{children}</button>;
}
