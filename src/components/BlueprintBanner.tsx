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
    };

    const drawBlueprint = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 绘制中心结构（火箭形状简化版）
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';

      // 火箭主体（简化）
      const rocketHeight = 200;
      const rocketWidth = 80;





      // 绘制侧面引擎（动画旋转）
      const engineRotation = (time % 360) * (Math.PI / 180);
      const engineDistance = 60;

      for (let i = 0; i < 3; i++) {
        const angle = engineRotation + (i * Math.PI * 2) / 3;
        const ex = centerX + Math.cos(angle) * engineDistance;
        const ey = centerY + rocketHeight / 2 - 40 + Math.sin(angle) * (engineDistance * 0.5);

        ctx.beginPath();
        ctx.arc(ex, ey, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 绘制辅助线和标注
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // 上方标注线
      ctx.beginPath();
      ctx.moveTo(centerX - rocketWidth / 2 - 40, centerY - rocketHeight / 2);
      ctx.lineTo(centerX - rocketWidth / 2 - 80, centerY - rocketHeight / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + rocketWidth / 2 + 40, centerY - rocketHeight / 2);
      ctx.lineTo(centerX + rocketWidth / 2 + 80, centerY - rocketHeight / 2);
      ctx.stroke();

      ctx.setLineDash([]);

      // 绘制坐标轴箭头
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.lineWidth = 2;

      // X轴
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY + 120);
      ctx.lineTo(centerX - 60, centerY + 120);
      ctx.stroke();

      // Y轴
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY + 120);
      ctx.lineTo(centerX - 120, centerY + 60);
      ctx.stroke();

      // 绘制脉动光圈
      const pulseSize = 40 + Math.sin(time * 0.05) * 15;
      ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 + Math.sin(time * 0.05) * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.stroke();
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
