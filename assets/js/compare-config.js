(function () {
  const state = {
    // Add new sample ids (without extension) here.
    sampleIds: [
      "20231127_1659_3_0",
      "20231226_1451_1_55",
      "20231229_1313_1_0",
      "20231229_1735_1_0",
      "20231229_1735_2_0",
      "20240101_0957_1_0",
      "20240101_1614_2_0",
      "20240101_1747_3_0",
      "20240102_1001_1_0",
      "20240102_1001_2_0",
      "20240102_1001_3_0",
      "20240102_1102_3_268"
    ],
    input: {
      key: "input",
      label: "输入图",
      folder: "input",
      ext: "jpg"
    },
    // Add future algorithm folders here.
    algorithms: [
      { key: "IPC", label: "算法IPC", folder: "IPC", ext: "png", note: "预测器-评价器迭代解码" },
      { key: "BiLaLoRA", label: "算法BiLaLoRA", folder: "BiLaLoRA", ext: "jpg", note: "双向定位注意力LoRA" },
      { key: "BiLaLoRA_output_seasky_base", label: "算法BiLaLoRA", folder: "BiLaLoRA_output_seasky_base", ext: "jpg", note: "基础版本" },
      { key: "BiLaLoRA_output_seasky_lora", label: "算法BiLaLoRA", folder: "BiLaLoRA_output_seasky_lora", ext: "jpg", note: "优化版本" },
      { key: "1840output", label: "算法LHTD", folder: "1840output", ext: "png", note: "LHTD普通扩散模型" },
      { key: "1900output", label: "算法LHTD", folder: "1900output", ext: "png", note: "LHTD优化后" },
      { key: "output_ac", label: "算法LHTD", folder: "output_ac", ext: "png", note: "更稳定统一的视觉输出。" },
      { key: "output_ac_unresize", label: "算法LHTD", folder: "output_ac_unresize", ext: "png", note: "未 resize 的原始输出。" }
    ]
  };

  const normalizeId = (sampleId) => String(sampleId).replace(/\.(png|jpg|jpeg)$/i, "");

  const buildPath = (dataset, sampleId) => {
    const normalized = normalizeId(sampleId);
    return `./image_data/${dataset.folder}/${normalized}.${dataset.ext}`;
  };

  const findAlgorithm = (key) => state.algorithms.find((item) => item.key === key);

  const api = {
    getSampleIds() {
      return state.sampleIds.slice();
    },
    getInput() {
      return { ...state.input };
    },
    getAlgorithms() {
      return state.algorithms.map((item) => ({ ...item }));
    },
    buildInputPath(sampleId) {
      return buildPath(state.input, sampleId);
    },
    buildAlgorithmPath(algorithmKey, sampleId) {
      const algorithm = findAlgorithm(algorithmKey);
      if (!algorithm) {
        throw new Error(`Unknown algorithm key: ${algorithmKey}`);
      }
      return buildPath(algorithm, sampleId);
    },
    registerSample(sampleId) {
      const normalized = normalizeId(sampleId);
      if (!state.sampleIds.includes(normalized)) {
        state.sampleIds.push(normalized);
      }
    },
    registerAlgorithm(algorithm) {
      if (!algorithm || !algorithm.key || !algorithm.folder || !algorithm.ext) {
        throw new Error("registerAlgorithm requires key, folder and ext fields.");
      }
      const existingIndex = state.algorithms.findIndex((item) => item.key === algorithm.key);
      const nextValue = {
        key: algorithm.key,
        label: algorithm.label || algorithm.key,
        folder: algorithm.folder,
        ext: algorithm.ext,
        note: algorithm.note || ""
      };
      if (existingIndex >= 0) {
        state.algorithms[existingIndex] = nextValue;
      } else {
        state.algorithms.push(nextValue);
      }
    }
  };

  window.CompareCatalog = api;
})();
