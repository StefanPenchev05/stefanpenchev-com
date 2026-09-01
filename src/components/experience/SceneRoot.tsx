import { CameraRig } from "@/components/experience/camera/CameraRig";
import { LightingRig } from "@/components/experience/lighting/LightingRig";
import { PacketFlow } from "@/components/experience/scenes/PacketFlow";
import { OperationsWorkstation } from "@/components/experience/scenes/OperationsWorkstation";
import { ProjectWall } from "@/components/experience/scenes/ProjectWall";
import { BackendInfrastructure } from "@/components/experience/scenes/BackendInfrastructure";
import { CybersecurityNetwork } from "@/components/experience/scenes/CybersecurityNetwork";
import { TechnologyConstellation } from "@/components/experience/scenes/TechnologyConstellation";
import { ContactTerminal } from "@/components/experience/scenes/ContactTerminal";

export function SceneRoot() {
  return (
    <>
      <color args={["#090b0e"]} attach="background" />
      <CameraRig />
      <LightingRig />
      <group>
        <OperationsWorkstation />
        <ProjectWall />
        <BackendInfrastructure />
        <CybersecurityNetwork />
        <TechnologyConstellation />
        <ContactTerminal />
        <PacketFlow />
      </group>
    </>
  );
}
