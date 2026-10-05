import type { ComponentType } from "react";
import type { RoutePath } from "../content/siteContent";
import { AgentGuidePage } from "./AgentGuidePage";
import { ContactPage } from "./ContactPage";
import { ExamplesPage } from "./ExamplesPage";
import { HomePage } from "./HomePage";
import { PatternsPage } from "./PatternsPage";

export const pageComponents: Record<RoutePath, ComponentType> = {
  "/": HomePage,
  "/patterns": PatternsPage,
  "/agent-guide": AgentGuidePage,
  "/examples": ExamplesPage,
  "/contact": ContactPage
};
