import type { ComponentType } from "react";
import type { RoutePath } from "../content/siteContent";
import { ContactPage } from "./ContactPage";
import { EvidencePage } from "./EvidencePage";
import { HomePage } from "./HomePage";
import { InterfacesPage } from "./InterfacesPage";
import { PatternsPage } from "./PatternsPage";

export const pageComponents: Record<RoutePath, ComponentType> = {
  "/": HomePage,
  "/patterns": PatternsPage,
  "/interfaces": InterfacesPage,
  "/evidence": EvidencePage,
  "/contact": ContactPage
};
