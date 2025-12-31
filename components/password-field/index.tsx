import React, { useRef, useState } from "react"
import { Button } from "../ui/button"

interface PasswordInputFieldProps {
  length?: number
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  length = 4,
  onChange,
  onComplete,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const [show, setShow] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)

    const joined = newValues.join("")
    onChange?.(joined)

    // Move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    // Auto submit
    if (joined.length === length && !newValues.includes("")) {
      onComplete?.(joined)
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newValues = [...values]

      if (values[index]) {
        newValues[index] = ""
      } else if (index > 0) {
        newValues[index - 1] = ""
        inputsRef.current[index - 1]?.focus()
      }

      setValues(newValues)
      onChange?.(newValues.join(""))
    }
  }

  // Handle paste OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!pasted) return

    const newValues = pasted.slice(0, length).split("")
    while (newValues.length < length) newValues.push("")

    setValues(newValues)
    onChange?.(newValues.join(""))

    if (newValues.length === length) {
      onComplete?.(newValues.join(""))
    }

    const nextIndex = Math.min(pasted.length, length - 1)
    inputsRef.current[nextIndex]?.focus()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {Array.from({ length }).map((_, index) => {
          const disabled =
            index !== 0 && values[index - 1] === ""

          return (
            <input
              key={index}
              ref={(el:any) => (inputsRef.current[index] = el)}
              type={show ? "text" : "password"}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={1}
              disabled={disabled}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-lg border rounded-lg
                focus:outline-none focus:border-black
                disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
          )
        })}
      </div>

      
      {/* <Button
        type="button"
        variant={'outline'}
        size="sm"
        onClick={() => setShow((prev) => !prev)}
        className="text-sm text-gray-600 hover:text-black"
      >
        {show ? "Hide PIN" : "Show PIN"}
      </Button> */}
    </div>
  )
}

export default PasswordInputField
