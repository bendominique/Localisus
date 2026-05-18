import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const BackgroundHome = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Inicializa o motor do tsParticles uma única vez quando o componente é montado
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setIsReady(true);
        });
    }, []);

    // Enquanto o motor não estiver pronto, não renderiza nada (evita quebrar a tela)
    if (!isReady) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            options={{
                fullScreen: {
                    enable: false,
                },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                particles: {
                    color: {
                        value: "#3b82f6",
                    },
                    links: {
                        color: "#93c5fd",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                    },
                    number: {
                        value: 80,
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
            }}
            style={{
                position: "absolute",
                zIndex: 0,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }}
        />
    );
};

export default BackgroundHome;