(function () {
  const HAZE_TYPES = [
    { key: "advection_fog",     label: "平流雾" },
    { key: "dense_haze",        label: "浓雾" },
    { key: "light_haze",        label: "轻度雾" },
    { key: "moderate_haze",     label: "中度雾" },
    { key: "sea_mist",          label: "海雾" },
    { key: "uniform_haze",      label: "均匀雾" }
  ];

  const FRAMES = (function () {
    const list = [];
    for (let i = 0; i <= 7800; i += 300) {
      list.push(String(i).padStart(6, "0"));
    }
    return list;
  })();

  const PREFIX = "DJI_20251226130422_0001_D";

  const api = {
    getHazeTypes() {
      return HAZE_TYPES.map(function (h) { return { key: h.key, label: h.label }; });
    },

    getFrames() {
      return FRAMES.slice();
    },

    buildSourcePath(frameId) {
      return "./dehaze_data/source/" + PREFIX + "_" + frameId + ".jpg";
    },

    buildHazyPath(hazeType, frameId) {
      return "./dehaze_data/hazy/" + hazeType + "/" + PREFIX + "_" + frameId + ".png";
    },

    buildDehazedPath(hazeType, frameId) {
      return "./dehaze_data/dehazed/" + hazeType + "/" + PREFIX + "_" + frameId + ".png";
    }
  };

  window.DehazeCatalog = api;
})();
