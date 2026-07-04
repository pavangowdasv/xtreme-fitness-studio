import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import xtremeLogoSrc from "../assets/images/xtreme_badge_logo.jpg";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Particle animation
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    type P = { x:number;y:number;vx:number;vy:number;r:number;alpha:number };
    const ps: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    let running = true;
    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      animFrameRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", onResize); };
  }, [isVisible]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="xl-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -25, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "radial-gradient(ellipse 110% 110% at 50% 50%, #080808 0%, #040404 60%, #000000 100%)",
            overflow: "hidden",
            pointerEvents: "all",
          }}
        >
          {/* Canvas particles */}
          <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.5,pointerEvents:"none" }} />

          {/* Yellow/Amber corner glow top-right */}
          <div style={{ position:"absolute",top:"-8vw",right:"-8vw",width:"55vw",height:"55vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(250,204,21,0.06) 0%,transparent 70%)",filter:"blur(50px)",animation:"ldrPulse 5s ease-in-out infinite alternate",pointerEvents:"none" }} />
          {/* Yellow/Amber corner glow bottom-left */}
          <div style={{ position:"absolute",bottom:"-8vw",left:"-8vw",width:"45vw",height:"45vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(250,204,21,0.04) 0%,transparent 70%)",filter:"blur(55px)",animation:"ldrPulse 8s ease-in-out infinite alternate-reverse",pointerEvents:"none" }} />
          {/* Light ray 1 */}
          <div style={{ position:"absolute",top:"30%",left:"-50%",width:"200%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.045),transparent)",animation:"ldrRay 10s linear infinite",pointerEvents:"none" }} />
          {/* Light ray 2 */}
          <div style={{ position:"absolute",top:"68%",left:"-50%",width:"200%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(250,204,21,0.06),transparent)",animation:"ldrRay 14s linear infinite reverse",pointerEvents:"none" }} />
          {/* Fog overlay */}
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(13,13,13,0) 0%,rgba(4,4,4,0.6) 100%)",animation:"ldrFog 11s ease-in-out infinite alternate",pointerEvents:"none" }} />
          {/* White spotlight */}
          <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"38vw",height:"38vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.035) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none" }} />

          {/* === HERO CENTER === */}
          <div style={{ position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:2 }}>

            {/* Outer spinning ring - assembly zoom in */}
            <motion.div 
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position:"absolute",width:"clamp(340px,46vw,540px)",height:"clamp(340px,46vw,540px)",borderRadius:"50%",border:"1px solid rgba(250,204,21,0.2)",boxShadow:"inset 0 0 30px rgba(250,204,21,0.08)",animation:"ldrRingCW 20s linear infinite",pointerEvents:"none",backdropFilter:"blur(1px)" }} 
            />
            {/* Inner counter-ring */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position:"absolute",width:"clamp(280px,38vw,440px)",height:"clamp(280px,38vw,440px)",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.07)",animation:"ldrRingCCW 30s linear infinite",pointerEvents:"none" }} 
            />
            {/* Pulse ring A */}
            <div style={{ position:"absolute",width:"clamp(290px,40vw,460px)",height:"clamp(290px,40vw,460px)",borderRadius:"50%",border:"1px solid rgba(250,204,21,0.12)",animation:"ldrRadialPulse 2.5s ease-out infinite",pointerEvents:"none" }} />
            {/* Pulse ring B offset */}
            <div style={{ position:"absolute",width:"clamp(290px,40vw,460px)",height:"clamp(290px,40vw,460px)",borderRadius:"50%",border:"1px solid rgba(250,204,21,0.08)",animation:"ldrRadialPulse 2.5s ease-out infinite",animationDelay:"1.25s",pointerEvents:"none" }} />

            {/* Dynamic Moving energy streaks */}
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{
                position:"absolute",
                width:`clamp(60px,${8+i*2}vw,${120+i*18}px)`,
                height:"1.5px",
                background:`linear-gradient(90deg,transparent,rgba(250,204,21,${0.25-i*0.03}),transparent)`,
                top:`calc(50% + ${(i%2===0?1:-1)*(38+i*14)}px)`,
                left:`calc(50% - 60px)`,
                transformOrigin:"left center",
                animation:`ldrStreak ${1.8+i*0.3}s ease-in-out infinite alternate`,
                animationDelay:`${i*0.25}s`,
                pointerEvents:"none",
              }} />
            ))}

            {/* Logo container (No blur filters) */}
            <motion.div
              initial={{ opacity:0, scale:0.58 }}
              animate={{ opacity:[0,1,1,1], scale:[0.58,1.13,0.97,1] }}
              transition={{ duration:0.95, ease:[0.22,1,0.36,1], times:[0,0.48,0.76,1] }}
              style={{ position:"relative",zIndex:3 }}
            >
              {/* Logo glow */}
              <div style={{ position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle,rgba(250,204,21,0.2) 0%,transparent 70%)",filter:"blur(15px)",animation:"ldrLogoGlow 3.2s ease-in-out infinite alternate",transform:"scale(1.45)",pointerEvents:"none" }} />
              <img
                src={xtremeLogoSrc}
                alt="Xtreme Fitness Studio"
                style={{
                  width:"clamp(180px,25vw,300px)",
                  height:"clamp(180px,25vw,300px)",
                  objectFit:"cover",
                  borderRadius:"50%",
                  display:"block",
                  position:"relative",
                  zIndex:2,
                }}
              />
            </motion.div>
          </div>

          {/* Bottom loading bar */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.35, duration:0.4 }}
            style={{ position:"absolute",bottom:0,left:0,width:"100%",height:"2px",overflow:"hidden",zIndex:5 }}
          >
            <div style={{ height:"2px",width:"100%",background:"linear-gradient(90deg,#0a0900 0%,#b8970b 30%,#facc15 60%,#ffffff 74%,#facc15 88%,transparent 100%)",animation:"ldrBar 1.9s cubic-bezier(0.4,0,0.2,1) infinite",boxShadow:"0 0 12px rgba(250,204,21,0.6),0 0 28px rgba(250,204,21,0.2)" }} />
          </motion.div>

          <style>{`
            @keyframes ldrPulse    { 0%{opacity:.6}   100%{opacity:1} }
            @keyframes ldrRay      { 0%{transform:translateX(0)}         100%{transform:translateX(90px)} }
            @keyframes ldrFog      { 0%{opacity:.5}   100%{opacity:.82} }
            @keyframes ldrRingCW   { 0%{transform:rotate(0deg)}          100%{transform:rotate(360deg)} }
            @keyframes ldrRingCCW  { 0%{transform:rotate(0deg)}          100%{transform:rotate(-360deg)} }
            @keyframes ldrRadialPulse { 0%{transform:scale(1);opacity:.65} 100%{transform:scale(1.55);opacity:0} }
            @keyframes ldrStreak   { 0%{opacity:.05} 100%{opacity:.3} }
            @keyframes ldrLogoGlow { 0%{opacity:.55;transform:scale(1.3)} 100%{opacity:1;transform:scale(1.6)} }
            @keyframes ldrBar      { 0%{transform:translateX(-100%)}     100%{transform:translateX(100%)} }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
