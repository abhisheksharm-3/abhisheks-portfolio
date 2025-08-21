import { ContactChannel } from "@/lib/types";
import { Mail, Code, ExternalLink } from "lucide-react";

/**
 * A centralized array of contact channels for the contact CTA section.
 */
export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  { 
    icon: <Mail className="h-4 w-4" />, 
    label: "Email", 
    value: "abhishek@abhisheksan.com",
    href: "mailto:abhishek@abhisheksan.com"
  },
  { 
    icon: <Code className="h-4 w-4" />, 
    label: "GitHub", 
    value: "abhisheksharm-3",
    href: "https://github.com/abhisheksharm-3"
  },
  { 
    icon: <ExternalLink className="h-4 w-4" />, 
    label: "Website", 
    value: "abhisheksan.com",
    href: "https://abhisheksan.com"
  }
];