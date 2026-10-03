import type { TechnologyOrbit } from "../model/content";

export const orbitData: TechnologyOrbit[] = [
    // Ring 1 - Inner (Radius 100)
    { speed: 12, radius: 100, size: 48, startAt: 0, images: [{ name: "React", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" }] },
    { speed: 12, radius: 100, size: 48, startAt: 0.33, images: [{ name: "Next.js", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" }] },
    { speed: 12, radius: 100, size: 48, startAt: 0.66, images: [{ name: "Tailwind CSS", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" }] },

    // Ring 2 - Middle (Radius 175)
    { speed: 20, radius: 175, size: 42, startAt: 0, images: [{ name: "TypeScript", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" }] },
    { speed: 20, radius: 175, size: 42, startAt: 0.2, images: [{ name: "Node.js", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" }] },
    { speed: 20, radius: 175, size: 42, startAt: 0.4, images: [{ name: "Go", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" }] },
    { speed: 20, radius: 175, size: 42, startAt: 0.6, images: [{ name: "Python", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" }] },
    { speed: 20, radius: 175, size: 42, startAt: 0.8, images: [{ name: "Docker", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" }] },

    // Ring 3 - Outer (Radius 270)
    { speed: 35, radius: 270, size: 38, startAt: 0.05, images: [{ name: "AWS", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.2, images: [{ name: "PostgreSQL", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.35, images: [{ name: "MongoDB", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.5, images: [{ name: "Redis", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.65, images: [{ name: "Kubernetes", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.8, images: [{ name: "Terraform", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg" }] },
    { speed: 35, radius: 270, size: 38, startAt: 0.95, images: [{ name: "Figma", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" }] },
];
