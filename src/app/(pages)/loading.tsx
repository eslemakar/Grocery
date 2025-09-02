import { FaSpinner } from "react-icons/fa"
export default function Loading() {
    return (
        <div className="grid place-items-center h-full">
      <FaSpinner className="animate-spin text-4xl" />
        </div>
    )
}