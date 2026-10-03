import { profile as identity } from "@/features/portfolio/data/profile";
import Image from "next/image";
import profile from "@/public/images/profile/naiker.png";

export function ProfileAvatar({ className, priority = false }: { className: string; priority?: boolean }) {
  return <div className={className}><Image src={profile} alt={identity.fullName} fill sizes="110px" priority={priority} className="os-profile-photo" /></div>;
}


