import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsap';
import { requestAtProgress } from './requestPath';
export function useArchitectureScroll(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(()=>{
    const element=root.current;
    if(!element)return;
    const media=gsap.matchMedia();
    media.add({all:'(min-width: 0px)',desktop:'(min-width: 900px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
      const reduced=Boolean(context.conditions?.reduce);
      const desktop=Boolean(context.conditions?.desktop);
      const packet=element.querySelector<SVGCircleElement>('[data-request-packet]');
      const nodes=Array.from(element.querySelectorAll<HTMLElement>('[data-node-id]'));
      const edges=Array.from(element.querySelectorAll<SVGPathElement>('[data-edge-id]'));
      const steps=Array.from(element.querySelectorAll<HTMLElement>('[data-architecture-step]'));
      const status=element.querySelector<HTMLElement>('[data-request-direction]');
      element.dataset.packetMotion=desktop&&!reduced?'scroll':'none';
      // React owns discrete inspected-node state; GSAP owns only these animation attributes.
      const update=(progress:number)=>{
        const request=requestAtProgress(progress);
        if(packet&&desktop&&!reduced)packet.setAttribute('transform',`translate(${request.x} ${request.y})`);
        const activeNode=request.returning?request.to:request.from;
        nodes.forEach(node=>{node.dataset.requestActive=String(node.dataset.nodeId===activeNode);});
        edges.forEach(edge=>{edge.dataset.requestActive=String(edge.dataset.edgeId===request.edge);});
        steps.forEach((step,index)=>{step.dataset.stepActive=String(index===request.step);if(index===request.step)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});
        if(status)status.textContent=progress>=.995?'RESPONSE RECEIVED':request.returning?'RESPONSE → CLIENT':'REQUEST → SERVICE';
      };
      // Reduced motion switches whole steps rather than interpolating a moving packet.
      const paint=(progress:number)=>update(reduced?[0,.14,.3,.46,.95][Math.min(4,Math.floor(progress*5))]:progress);
      const trigger=ScrollTrigger.create({
        trigger:element.querySelector('[data-architecture-narrative]'),
        start:desktop?'top 55%':'top 80%',end:desktop?'bottom 60%':'bottom 35%',
        invalidateOnRefresh:true,
        onUpdate:self=>paint(self.progress),onRefresh:self=>paint(self.progress),
      });
      paint(trigger.progress);
      return()=>{
        delete element.dataset.packetMotion;
        packet?.removeAttribute('transform');
        nodes.forEach(node=>delete node.dataset.requestActive);
        edges.forEach(edge=>delete edge.dataset.requestActive);
        steps.forEach(step=>{delete step.dataset.stepActive;step.removeAttribute('aria-current');});
        if(status)status.textContent='REQUEST → SERVICE';
      };
    },root);
    return()=>media.revert();
  },[root]);
}
