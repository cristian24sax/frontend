export interface Course {
  id: number;
  name: string;
  description: string;
  durationHours: number;
  nameLevel: string;
}

export interface Menu {
  name: string;
  link: string;
  icon: React.ComponentType;
  submenus?: Course[];
  margin?: boolean;
}
