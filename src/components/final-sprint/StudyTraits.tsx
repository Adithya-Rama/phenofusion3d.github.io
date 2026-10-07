"use client";
import { useEffect, useState } from "react";
const root = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/results/final-sprint-20260928/traits`;
type Dimension={id:string;dimension:string;annotation_cm:number|null;ruler_cm:number|null;estimate_cm:number|null;status:string;reason:string};
type Plant={id:string;points:number;observed_span_cm:number[];hull_cm2:number;manual_height_cm:number|null;height_status:string;photo:string;notes:string|string[];dimensions:Dimension[]};
const val=(v:number|null|undefined)=>v==null?"Unavailable":Number(v).toFixed(2);
export default function StudyTraits(){
 const [plants,setPlants]=useState<Plant[]>([]); const [error,setError]=useState("");
 useEffect(()=>{const a=new AbortController();fetch(`${root}/website_tables.json`,{signal:a.signal}).then(r=>{if(!r.ok)throw Error(`Trait table: ${r.status}`);return r.json();}).then(d=>setPlants(d.plants)).catch(e=>{if(e.name!=="AbortError")setError(String(e));});return()=>a.abort();},[]);
 return <div>{error&&<p role="alert">{error}</p>}{!plants.length&&!error&&<p>Loading per-plant measurement evidence…</p>}
  <div className="study-table"><table><caption className="study-fine">Observed geometry at the confirmed-board scale. Z span is not stem-base-to-tip height; canopy hull encloses gaps.</caption><thead><tr><th>Plant</th><th>Cleaned points</th><th>X × Y × Z span (cm*)</th><th>Canopy hull (cm²*)</th><th>Manual height (cm)</th><th>Validated height</th></tr></thead><tbody>{plants.map(p=><tr key={p.id}><td><a href={`#traits-${p.id}`}>{p.id}</a></td><td>{p.points.toLocaleString()}</td><td>{p.observed_span_cm.map(v=>v.toFixed(2)).join(" × ")}</td><td>{p.hull_cm2.toFixed(2)}</td><td>{val(p.manual_height_cm)}<small>operator annotation</small></td><td>Unavailable</td></tr>)}</tbody></table></div>
  <p className="study-fine">*Centimetres anchored to the confirmed 25 mm square. Print tolerance and physical accuracy are not independently established; L515 retains its recorded-depth interpretation limits. Hull area is an observed canopy envelope, not summed leaf area.</p>
  {plants.map(p=><details id={`traits-${p.id}`} key={p.id}><summary>{p.id} · {p.dimensions.length} manual dimensions · inspect comparisons and exclusions</summary><div className="study-grid"><a href={`${root}/${p.photo}`} target="_blank" rel="noreferrer"><img className="plant-photo" loading="lazy" src={`${root}/${p.photo}`} alt={`${p.id} reviewed source image`}/></a><div><h3>Plant {p.id.slice(1)} measurement status</h3><p>{p.height_status.replaceAll("_"," ")}</p>{(Array.isArray(p.notes)?p.notes:[p.notes]).map((n,i)=><p key={i}>{n}</p>)}</div></div>
  <div className="study-table"><table><thead><tr><th>Dimension</th><th>Operator (cm)</th><th>Ruler review (cm)</th><th>3D value (cm*)</th><th>Comparison and remaining gap</th></tr></thead><tbody>{p.dimensions.map(d=><tr key={d.id}><td>{d.id}</td><td>{val(d.annotation_cm)}</td><td>{val(d.ruler_cm)}</td><td>{val(d.estimate_cm)}</td><td>{d.status.replaceAll("_"," ")}<small>{d.reason}</small></td></tr>)}</tbody></table></div></details>)}
 </div>;
}
