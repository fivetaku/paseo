import type { AgentFeature, AgentFeatureToggle } from "../../agent-sdk-types.js";
import {
  claudeManifestModelSupportsFastMode,
  claudeModelSupportsUltracode,
} from "./model-manifest.js";

export const CLAUDE_FAST_MODE_FEATURE: Omit<AgentFeatureToggle, "value"> = {
  type: "toggle",
  id: "fast_mode",
  label: "Fast",
  description: "Lower latency Opus responses at higher token cost",
  tooltip: "Toggle fast mode",
  icon: "zap",
};

export const CLAUDE_ULTRACODE_FEATURE_ID = "ultracode";

export const CLAUDE_ULTRACODE_FEATURE: Omit<AgentFeatureToggle, "value"> = {
  type: "toggle",
  id: CLAUDE_ULTRACODE_FEATURE_ID,
  label: "Ultracode",
  description: "Plan a dynamic workflow for each substantive task, at any effort level",
  tooltip: "Toggle Ultracode",
  icon: "workflow",
};

export function claudeModelSupportsFastMode(modelId: string | null | undefined): boolean {
  return claudeManifestModelSupportsFastMode(modelId);
}

export { claudeModelSupportsUltracode };

export function buildClaudeFeatures(input: {
  modelId: string | null | undefined;
  fastModeEnabled: boolean;
  ultracodeEnabled: boolean;
}): AgentFeature[] {
  const features: AgentFeature[] = [];
  if (claudeModelSupportsFastMode(input.modelId)) {
    features.push({
      ...CLAUDE_FAST_MODE_FEATURE,
      value: input.fastModeEnabled,
    });
  }
  if (claudeModelSupportsUltracode(input.modelId)) {
    features.push({
      ...CLAUDE_ULTRACODE_FEATURE,
      value: input.ultracodeEnabled,
    });
  }
  return features;
}
