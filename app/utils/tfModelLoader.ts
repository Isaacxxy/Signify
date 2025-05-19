import * as tf from "@tensorflow/tfjs";

export async function loadSignLanguageModel() {
  const [model, metadata] = await Promise.all([
    tf.loadLayersModel("/models/sign-language/model.json"),
    fetch("/models/sign-language/metadata.json").then((res) => res.json()),
  ]);
  return { model, metadata };
}

export type SignLanguageModel = Awaited<
  ReturnType<typeof loadSignLanguageModel>
>;
