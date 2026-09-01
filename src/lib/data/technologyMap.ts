import {
  orderedProjects,
  skillGroups,
  technologies,
  type EngineeringDomain,
  type PortfolioProject,
  type Technology,
  type TechnologyGroupId
} from "@/lib/data/portfolio";

export type TechnologyMapNode = {
  id: string;
  name: string;
  group: TechnologyGroupId;
  domains: EngineeringDomain[];
  relatedProjects: PortfolioProject[];
  weight: number;
  iconUrl?: string;
  url?: string;
};

export type TechnologyMapCluster = {
  id: TechnologyGroupId;
  title: string;
  domains: EngineeringDomain[];
  technologies: TechnologyMapNode[];
  weight: number;
};

export type TechnologyMap = {
  clusters: TechnologyMapCluster[];
  nodes: TechnologyMapNode[];
  totalTechnologies: number;
};

export function technologyId(technology: Pick<Technology, "name" | "group">) {
  return `${technology.group}-${technology.name}`
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildTechnologyMap(): TechnologyMap {
  const nodes = technologies.map((technology) => {
    const relatedProjects = orderedProjects.filter((project) =>
      project.stack.some((item) => item.toLowerCase() === technology.name.toLowerCase())
    );

    return {
      id: technologyId(technology),
      name: technology.name,
      group: technology.group,
      domains: technology.domains,
      relatedProjects,
      weight: 1 + relatedProjects.length + technology.domains.length * 0.25,
      iconUrl: technology.iconUrl,
      url: technology.url
    };
  });
  const clusters = skillGroups.map((group) => {
    const groupNodes = nodes.filter((node) => node.group === group.id);

    return {
      id: group.id,
      title: group.title,
      domains: group.domains,
      technologies: groupNodes,
      weight: groupNodes.reduce((sum, node) => sum + node.weight, 0)
    };
  });

  return {
    clusters,
    nodes,
    totalTechnologies: nodes.length
  };
}
