import { ThemeProvider } from "@fluentui/react"
import { useState } from "react"
import { prefersDark, darkTheme, lightTheme } from "./theme"

export const ThemeHook = ({ children }: { children: JSX.Element }) => {
    const [isDark, setIsDark] = useState(prefersDark)
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { toggleTheme() })
  
    const toggleTheme = () => {
      setIsDark(!isDark)
    }
    return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme} >
        {children}
      </ThemeProvider>
    )
  }