import { ComponentPropsWithoutRef } from "react"

type IdentifierType = "wrapped" | "artwork" | "user"

type RoundedButtonProps = ComponentPropsWithoutRef<"button"> & {
  identifier: IdentifierType
}

// identifier : wrapped 인 경우 배경색 white으로, 나머지 경우 primary-color로
// children : icon
// props : rest pattern
export default function RoundedButton({ identifier, children, ...props }: RoundedButtonProps) {
  let bgColor

  if (identifier === "wrapped") bgColor = "bg-white"
  else bgColor = "bg-primary"
  return (
    <button className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center cursor-pointer`} {...props}>
      {children}
    </button>
  )
}
