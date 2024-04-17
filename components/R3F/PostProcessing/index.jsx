import {
  EffectComposer,
  DepthOfField,
  Bloom,
} from "@react-three/postprocessing";

export default function PostProcessing({ settings }) {
  return (
    <>
      {settings.postProcessing && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={settings.bloomLuminanceThreshold}
            luminanceSmoothing={settings.bloomLuminanceSmoothing}
          />
          <DepthOfField
            focusDistance={settings.dofFocusDistance}
            focalLength={settings.dofFocalLength}
            bokehScale={settings.dofBokehScale}
          />
        </EffectComposer>
      )}
    </>
  );
}
