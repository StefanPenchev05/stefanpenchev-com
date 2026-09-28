import { useState } from 'react';
import { architectureNodes, architectureConnections, immediateDependencies, type ArchitectureNodeId } from '../../data/architecture';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NodeDetails } from './NodeDetails';
import styles from './Architecture.module.css';
export function ArchitectureDiagram() {
  const [selected,setSelected]=useState<ArchitectureNodeId>('api');
  const [hovered,setHovered]=useState<ArchitectureNodeId|null>(null);
  const [focused,setFocused]=useState<ArchitectureNodeId|null>(null);
  const mobile=useMediaQuery('(max-width: 899px)');
  const active=focused??hovered??selected;
  const dependencies=immediateDependencies(active);
  const inspected=architectureNodes.find(node=>node.id===active)!;
  return <div className={styles.diagramColumn}>
    <div className={styles.diagramHeader}><code>GET /api/projects</code><span data-request-direction>REQUEST → SERVICE</span></div>
    <div className={styles.diagram} aria-label="Conceptual request architecture"><div className={styles.user}>USER<span>interaction</span></div>
      <svg className={styles.connections} viewBox="0 0 720 550" fill="none" aria-hidden="true"><path className={styles.userConnection} d="M340 30V53"/>{architectureConnections.map(edge=><path key={edge.id} data-edge-id={edge.id} data-inspected={edge.from===active||edge.to===active} className={edge.optional?styles.optionalConnection:styles.connection} d={edge.path}/>)}<circle className={styles.packet} data-request-packet cx="0" cy="0" r="3"/></svg>
      <ol className={styles.nodes} aria-label="Architecture layers" onPointerLeave={()=>setHovered(null)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(null);}}>{architectureNodes.map(node=><li key={node.id} className={styles.node} data-node-id={node.id} data-inspected={active===node.id} data-dependency={dependencies.includes(node.id)} style={{left:`${node.position[0]/720*100}%`,top:`${node.position[1]/550*100}%`}}><button type="button" aria-pressed={active===node.id} aria-controls={mobile?`architecture-details-${node.id}`:'architecture-details'} aria-expanded={mobile?active===node.id:undefined} onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(node.id);}} onFocus={()=>setFocused(node.id)} onClick={()=>{setSelected(node.id);setFocused(node.id);}}><span className={styles.nodeLabel}>{node.label}</span><span className={styles.nodeTechnology}>{node.technology}</span><span className={styles.nodeMarker} aria-hidden="true">{active===node.id?'−':'+'}</span></button>{mobile&&active===node.id&&<NodeDetails mobile node={node} id={`architecture-details-${node.id}`}/>}</li>)}</ol>
    </div>
    <p className={styles.diagramLegend}><span><i/>Request / response</span><span>Dashed branch: optional background work</span></p>
    {!mobile&&<NodeDetails node={inspected} id="architecture-details"/>}
  </div>;
}
