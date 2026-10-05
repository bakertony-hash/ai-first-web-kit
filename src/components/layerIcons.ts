import { Eye, FileText, Gauge, MousePointerClick } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LayerId } from "../content/siteContent";

export const layerIcons: Record<LayerId, LucideIcon> = {
  readable: Eye,
  fetchable: FileText,
  operable: MousePointerClick,
  measurable: Gauge
};
