"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, Check, Facebook, Twitter, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  description?: string
}

export default function ShareModal({ isOpen, onClose, title, url, description }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link kopyalandı!",
        description: "URL panoya kopyalandı.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Kopyalama başarısız",
        description: "Link kopyalanamadı.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        })
      } catch (err) {
        // User cancelled sharing
      }
    }
  }

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDesc = encodeURIComponent(description || title)

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Paylaş
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* URL Display */}
          <div className="space-y-2">
            <Label htmlFor="url">Link</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={url}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <Label>Sosyal Medyada Paylaş</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => shareOnSocial("facebook")}
                className="flex-1"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => shareOnSocial("twitter")}
                className="flex-1"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => shareOnSocial("whatsapp")}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

                    {/* Native Share Button */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button onClick={handleShare} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
          )}

          {/* Close Button */}
          <Button variant="outline" onClick={onClose} className="w-full">
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
