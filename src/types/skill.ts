export interface SkillItem {
  name: string;
  connectedProjects?: string[];
  level?: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}
