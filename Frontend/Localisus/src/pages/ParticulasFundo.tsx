import React, { useRef, useEffect } from 'react';

export const PartticulasFundo = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const canvasEl = canvas;

        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

        const context = ctx;

        let particulas: Particula[] = [];
        let framesAnimacaoId: number;

        const resize = () => {
            canvasEl.width = window.innerWidth;
            canvasEl.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particula {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvasEl.width;
                this.y = Math.random() * canvasEl.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvasEl.width) this.x = 0;
                if (this.x < 0) this.x = canvasEl.width;

                if (this.y > canvasEl.height) this.y = 0;
                if (this.y < 0) this.y = canvasEl.height;
            }

            draw() {
                context.fillStyle = 'rgba(10, 165, 255, 0.5)';
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particulas.push(new Particula());
        }

        const animar = () => {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

            particulas.forEach((p) => {
                p.update();
                p.draw();
            });

            framesAnimacaoId = requestAnimationFrame(animar);
        };

        animar();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(framesAnimacaoId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};