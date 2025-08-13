"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-yellow-500">JET TAXI</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-yellow-500 transition-colors text-gray-900 dark:text-white"
          >
            {t("header.home")}
          </Link>

          <Link
            href="/services"
            className="text-sm font-medium hover:text-yellow-500 transition-colors text-gray-900 dark:text-white"
          >
            {t("header.services")}
          </Link>

          <Link
            href="/reviews"
            className="text-sm font-medium hover:text-yellow-500 transition-colors text-gray-900 dark:text-white"
          >
            {t("header.reviews")}
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium hover:text-yellow-500 transition-colors text-gray-900 dark:text-white"
          >
            {t("header.contact")}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-gray-900 dark:text-white">{t("common.phone")}</span>
          </div>
          <a
            href="https://wa.me/905338806808"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center"
          >
            {t("header.bookNow")}
          </a>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-6 py-6">
              <div className="flex justify-center gap-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              <Link
                href="/"
                className="text-lg font-medium hover:text-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("header.home")}
              </Link>

              <Link
                href="/services"
                className="text-lg font-medium hover:text-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("header.services")}
              </Link>

              <Link
                href="/reviews"
                className="text-lg font-medium hover:text-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("header.reviews")}
              </Link>

              <Link
                href="/contact"
                className="text-lg font-medium hover:text-yellow-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("header.contact")}
              </Link>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{t("common.phone")}</span>
                </div>
                <a
                  href="https://wa.me/905338806808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center"
                >
                  {t("header.bookNow")}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
