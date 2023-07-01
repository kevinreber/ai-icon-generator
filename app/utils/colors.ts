import { presetPalettes } from "@ant-design/colors";

export const COLORS_MAP = {
  red: {
    light: {
      key: "light-dust-red",
      value: "light dust red",
      color: presetPalettes.red[2],
    },
    midTone: {
      key: "dust-red",
      value: "dust red",
      color: presetPalettes.red[4],
    },
    dark: {
      key: "dark-dust-red",
      value: "dark dust red",
      color: presetPalettes.red[7],
    },
  },
  volcano: {
    light: {
      key: "light-volcano",
      value: "light volcano",
      color: presetPalettes.volcano[2],
    },
    midTone: {
      key: "volcano",
      value: "volcano",
      color: presetPalettes.volcano[4],
    },
    dark: {
      key: "dark-volcano",
      value: "dark volcano",
      color: presetPalettes.volcano[7],
    },
  },
  orange: {
    light: {
      key: "light-sunset-orange",
      value: "light sunset orange",
      color: presetPalettes.orange[2],
    },
    midTone: {
      key: "sunset-orange",
      value: "sunset orange",
      color: presetPalettes.orange[4],
    },
    dark: {
      key: "dark-sunset-orange",
      value: "dark sunset orange",
      color: presetPalettes.orange[7],
    },
  },
  gold: {
    light: {
      key: "light-calendula-gold",
      value: "light calendula gold",
      color: presetPalettes.gold[2],
    },
    midTone: {
      key: "calendula-gold",
      value: "calendula gold",
      color: presetPalettes.gold[4],
    },
    dark: {
      key: "dark-calendula-gold",
      value: "dark calendula gold",
      color: presetPalettes.gold[7],
    },
  },
  yellow: {
    light: {
      key: "light-sunrise-yellow",
      value: "light sunrise yellow",
      color: presetPalettes.yellow[2],
    },
    midTone: {
      key: "sunrise-yellow",
      value: "sunrise yellow",
      color: presetPalettes.yellow[4],
    },
    dark: {
      key: "dark-sunrise-yellow",
      value: "dark sunrise yellow",
      color: presetPalettes.yellow[7],
    },
  },
  lime: {
    light: {
      key: "light-lime",
      value: "light lime",
      color: presetPalettes.lime[2],
    },
    midTone: {
      key: "lime",
      value: "lime",
      color: presetPalettes.lime[4],
    },
    dark: {
      key: "dark-lime",
      value: "dark lime",
      color: presetPalettes.lime[7],
    },
  },
  cyan: {
    light: {
      key: "light-cyan",
      value: "light cyan",
      color: presetPalettes.cyan[2],
    },
    midTone: {
      key: "cyan",
      value: "cyan",
      color: presetPalettes.cyan[4],
    },
    dark: {
      key: "dark-cyan",
      value: "dark cyan",
      color: presetPalettes.cyan[7],
    },
  },
  blue: {
    light: {
      key: "light-daybreak-blue",
      value: "light daybreak blue",
      color: presetPalettes.blue[2],
    },
    midTone: {
      key: "daybreak-blue",
      value: "daybreak blue",
      color: presetPalettes.blue[4],
    },
    dark: {
      key: "dark-daybreak-blue",
      value: "dark daybreak blue",
      color: presetPalettes.blue[7],
    },
  },
  purple: {
    light: {
      key: "light-golden-purple",
      value: "light golden purple",
      color: presetPalettes.purple[2],
    },
    midTone: {
      key: "golden-purple",
      value: "golden purple",
      color: presetPalettes.purple[4],
    },
    dark: {
      key: "dark-golden-purple",
      value: "dark golden purple",
      color: presetPalettes.purple[7],
    },
  },
  magenta: {
    light: {
      key: "light-magenta",
      value: "light magenta",
      color: presetPalettes.magenta[2],
    },
    midTone: {
      key: "magenta",
      value: "magenta",
      color: presetPalettes.magenta[4],
    },
    dark: {
      key: "dark-magenta",
      value: "dark magenta",
      color: presetPalettes.magenta[7],
    },
  },
  grey: {
    light: {
      key: "light-grey",
      value: "light grey",
      color: presetPalettes.grey[2],
    },
    midTone: {
      key: "grey",
      value: "grey",
      color: presetPalettes.grey[4],
    },
    dark: {
      key: "dark-grey",
      value: "dark grey",
      color: presetPalettes.grey[7],
    },
  },
  black: {
    key: "black",
    value: "black",
    color: "#000",
  },
  white: {
    key: "white",
    value: "white",
    color: "#fff",
  },
} as const;

export const COLOR_PICKER_PRESET_OPTIONS = [
  COLORS_MAP.red.light.color,
  COLORS_MAP.red.midTone.color,
  COLORS_MAP.red.dark.color,
  COLORS_MAP.volcano.light.color,
  COLORS_MAP.volcano.midTone.color,
  COLORS_MAP.volcano.dark.color,
  COLORS_MAP.orange.light.color,
  COLORS_MAP.orange.midTone.color,
  COLORS_MAP.orange.dark.color,
  COLORS_MAP.gold.light.color,
  COLORS_MAP.gold.midTone.color,
  COLORS_MAP.gold.dark.color,
  COLORS_MAP.yellow.light.color,
  COLORS_MAP.yellow.midTone.color,
  COLORS_MAP.yellow.dark.color,
  COLORS_MAP.lime.light.color,
  COLORS_MAP.lime.midTone.color,
  COLORS_MAP.lime.dark.color,
  COLORS_MAP.cyan.light.color,
  COLORS_MAP.cyan.midTone.color,
  COLORS_MAP.cyan.dark.color,
  COLORS_MAP.blue.light.color,
  COLORS_MAP.blue.midTone.color,
  COLORS_MAP.blue.dark.color,
  COLORS_MAP.purple.light.color,
  COLORS_MAP.purple.midTone.color,
  COLORS_MAP.purple.dark.color,
  COLORS_MAP.magenta.light.color,
  COLORS_MAP.magenta.midTone.color,
  COLORS_MAP.magenta.dark.color,
  COLORS_MAP.grey.light.color,
  COLORS_MAP.grey.midTone.color,
  COLORS_MAP.grey.dark.color,
  COLORS_MAP.black.color,
  COLORS_MAP.white.color,
];
