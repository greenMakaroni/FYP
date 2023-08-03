import {
    EffectComposer,
    Noise,
    Bloom
} from "@react-three/postprocessing";

const Postprocessing = () => {
    return (
        <EffectComposer multisampling={0} disableNormalPass={true}>
            <Noise opacity={0.03} />
            <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={1.5}
                height={300}
                opacity={2}
            />
        </EffectComposer>
    )
}

export default Postprocessing

