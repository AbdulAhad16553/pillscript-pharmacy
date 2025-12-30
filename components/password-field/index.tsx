
import React, { useState, useRef } from "react"


const PasswordInputField= ({ length = 4, onChange }:any) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return // allow only one char
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)
    onChange?.(newValues.join(""))

    // move focus to next
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values]
      newValues[index - 1] = ""
      setValues(newValues)
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="password"
          maxLength={1}
          className="w-12 h-12 text-center border rounded-lg text-lg focus:border-black focus:outline-none"
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el:any) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  )
}

export default PasswordInputField
