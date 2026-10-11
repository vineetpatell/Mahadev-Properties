import { propertyMedia } from "../lib/property-media";
export function BackgroundMesh() {
  return <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none architectural-background">
    <div className="absolute inset-0 grid grid-cols-2 opacity-[0.025]">{["1613490493576-7fde63acd811", "1545324418-cc1a3fa10c00"].map(seed => propertyMedia[seed] && <img key={seed} src={propertyMedia[seed]} alt="" className="w-full h-full object-cover" loading="lazy" />)}</div>
  </div>;
}
