import { Options } from "$fresh/plugins/twindv1.ts";

import { Preset } from "https://esm.sh/v131/@twind/core@1.1.3/core.d.ts";

import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";

interface OptionsWithPresets extends Options {
  presets: Preset[];
}

export default {
  presets: [presetAutoprefix(), presetTailwind()],
  selfURL: import.meta.url,
} as OptionsWithPresets;
