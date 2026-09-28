import type { ArchitectureNode } from '../../data/architecture';
import styles from './Architecture.module.css';
export function NodeDetails({node,id,mobile=false}:{node:ArchitectureNode;id:string;mobile?:boolean}) {
  return <div id={id} className={mobile?styles.mobileDetails:styles.details} aria-live="polite" aria-atomic="true"><div className={styles.detailHeading}><h3>{node.label}</h3><span>IN FOCUS</span></div><p>{node.description}</p><ul>{node.responsibilities.map(item=><li key={item}>{item}</li>)}</ul></div>;
}
