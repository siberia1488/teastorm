export default function BrandMark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base"
  return (
    <div className={`font-semibold tracking-wide ${sizeClass} ${className}`}>
      TeaStorm
    </div>
  )
}
