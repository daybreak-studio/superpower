import {
  EffectComposer,
  DepthOfField,
  Bloom,
  KernelSize,
} from "@react-three/postprocessing";

export default function PostProcessing({ settings }) {
  return (
    <>
      {settings.postProcessing && (
        <EffectComposer>
          <Bloom
            intensity={settings.bloomIntensity}
            mipmapBlur
            luminanceThreshold={settings.bloomLuminanceThreshold}
            luminanceSmoothing={settings.bloomLuminanceSmoothing}
          />
          {/* <DepthOfField
            focusDistance={settings.dofFocusDistance}
            focalLength={settings.dofFocalLength}
            bokehScale={settings.dofBokehScale}
          /> */}
        </EffectComposer>
      )}
    </>
  );
}
