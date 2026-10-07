"use client";
import { useState } from "react";
const base = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/results/final-sprint-20260928`;

export function SpectralInspector() {
  const [tab,setTab]=useState("fusion");
  const [loaded,setLoaded]=useState(false);
  const file=tab==="fusion"?"spectral/fusion/index.html":"spectral/samples/index.html";
  return <div className="inspector">
    <div className="tab-buttons" role="group" aria-label="Spectral inspection mode">
      <button aria-pressed={tab==="fusion"} onClick={()=>{setTab("fusion");setLoaded(true);}}>3D associations · both cameras</button>
      <button aria-pressed={tab==="samples"} onClick={()=>{setTab("samples");setLoaded(true);}}>All measured camera pixels</button>
      <a href={`${base}/${file}`} target="_blank" rel="noreferrer">Open full-screen ↗</a>
    </div>
    {!loaded?<div className="inspector-placeholder"><h3>Inspect the actual measured spectra</h3><p>Load the interactive viewer when ready. The complete pixel inspector contains 13,343 spectra; its first load is larger than the three-location 3D view.</p><button onClick={()=>setLoaded(true)}>Load 3D spectral viewer</button></div>:<iframe key={file} src={`${base}/${file}`} title={tab==="fusion"?"FX10 and FX17 provisional 3D spectral associations":"FX10 and FX17 measured pixel spectra and indices"} allowFullScreen/>}
  </div>;
}

export function ScaleExplorer() {
  const [factor,setFactor]=useState(1.0288746669066682);
  return <div className="scale-explorer"><h3>Understand the scale change</h3><p>The initial setting is the fitted D405 correction, 1.0288747×. Other settings are mathematical sensitivity examples. Lengths and areas of the same selected D405 geometry follow these powers; a volume factor is only a mathematical example, not a measured plant volume.</p>
    <label htmlFor="scale-factor">Scale factor shown: <strong>{factor.toFixed(6)}×</strong></label>
    <input id="scale-factor" type="range" min=".8" max="1.2" step="any" value={factor} onChange={e=>setFactor(+e.target.value)}/><button onClick={()=>setFactor(1.0288746669066682)}>Reset to fitted D405 correction</button>
    <div className="metric-grid">{[["Length",factor],["Area",factor**2],["Volume",factor**3]].map(([name,value])=><div key={name}><strong>{((Number(value)-1)*100).toFixed(2)}%</strong><span>{name} change</span></div>)}</div>
    <p>A 10 cm observed chord would become {(10*factor).toFixed(3)} cm. The number of observed points, missing leaf tips and occluded surfaces are unchanged by this mathematical rescaling. The mixed RGB-stereo/L515 pipeline must be recalculated and checked if its sensor scales disagree; this slider does not alter the saved result.</p>
  </div>;
}
