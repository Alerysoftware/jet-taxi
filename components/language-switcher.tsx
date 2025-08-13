"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "tr", label: "TR", name: "Türkçe" },
    { code: "en", label: "EN", name: "English" },
    { code: "ru", label: "RU", name: "Русский" },
    { code: "el", label: "EL", name: "Ελληνικά" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <div className="flex rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(lang.code as any)}
            className={`rounded-none px-2 py-1 text-xs ${
              language === lang.code
                ? "bg-yellow-500 text-black hover:bg-yellow-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            title={lang.name}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
