import React, { useEffect, useRef } from 'react';

interface BlueprintBannerProps {
  title?: string;
  subtitle?: string;
}

export default function BlueprintBanner({
  title = "🚀 低维展开",
  subtitle = "Web前端开发 | 全栈探索 | 技术成长"
}: BlueprintBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let animationFrameId: number;
    let time = 0;

    const drawGrid = () => {
      const gridSize = 30;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // 竖线
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // 横线
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // ===== 移动光点与尾迹 =====
      gridLights.forEach(light => {
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = light.color;
        ctx.fillStyle = light.color;
        const t = (time * (light.speed * 0.1) + light.phase) % 1;
        const gridSize = 30;
        if (light.isVertical) {
          const x = Math.round(light.pos * canvas.width / gridSize) * gridSize;
          const y = Math.round(t * canvas.height);
          // 主光点
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
          // 尾迹（渐隐）
          for (let i = 1; i <= 5; i++) {
            const fade = 1 - i / 5;
            ctx.globalAlpha = fade * 0.3;
            ctx.beginPath();
            ctx.arc(x, y - i * 8, 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          const y = Math.round(light.pos * canvas.height / gridSize) * gridSize;
          const x = Math.round((1 - t) * canvas.width);
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
          for (let i = 1; i <= 5; i++) {
            const fade = 1 - i / 5;
            ctx.globalAlpha = fade * 0.3;
            ctx.beginPath();
            ctx.arc(x + i * 8, y, 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });
    };

    const drawBlueprint = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // ===== 脉动光圈 =====
      const pulseSize = 80 + Math.sin(time * 0.01) * 80;
      ctx.save();
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(100, 200, 255)';
      ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 + Math.sin(time * 0.01) * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.setLineDash([]);
    };

    const drawCornerElements = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // 左上角信息框
      ctx.strokeRect(20, 20, 150, 80);
      ctx.fillRect(20, 20, 150, 80);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '12px monospace';
      ctx.fillText('BLUEPRINT', 25, 40);
      ctx.fillText('TECH.STACK', 25, 60);
      ctx.fillText('v1.0', 25, 80);

      // 右下角信息框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(canvas.width - 170, canvas.height - 100, 150, 80);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(canvas.width - 170, canvas.height - 100, 150, 80);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('SYSTEM STATUS', canvas.width - 165, canvas.height - 80);
      ctx.fillText('ONLINE', canvas.width - 165, canvas.height - 60);
      ctx.fillText('ACTIVE', canvas.width - 165, canvas.height - 40);
    };

    const animate = () => {
      // 清空canvas并绘制背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a2463');
      gradient.addColorStop(1, '#247ba0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制所有元素
      drawGrid();
      drawBlueprint();
      drawCornerElements();

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const gridLights = [
    // 每个对象代表一个光点：{ x/y, isVertical, speed, phase, color }
    { pos: 0.2, isVertical: true, speed: 0.008, phase: 0, color: 'rgba(0,255,255,0.9)' },
    { pos: 0.5, isVertical: true, speed: 0.012, phase: Math.PI / 2, color: 'rgba(0,200,255,0.7)' },
    { pos: 0.7, isVertical: false, speed: 0.01, phase: Math.PI, color: 'rgba(0,255,200,0.8)' },
    { pos: 0.35, isVertical: false, speed: 0.007, phase: Math.PI / 3, color: 'rgba(0,180,255,0.7)' },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: '400px', background: 'linear-gradient(135deg, #0a2463 0%, #247ba0 100%)' }}
      />

      {/* 文本内容覆盖层 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 drop-shadow-md animate-fade-in-delay">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
