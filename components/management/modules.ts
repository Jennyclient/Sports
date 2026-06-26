import type {
  AdminRole,
  ModuleKey,
  ModulePermissions,
  PermissionLevel,
} from "@/types/management";

export const MODULES: { key: ModuleKey; label: string }[] = [
  { key: "whitelabels", label: "Whitelabels" },
  { key: "dashboard", label: "Dashboard" },
  { key: "availableEvents", label: "Available Events" },
  { key: "liveEvents", label: "Live Events" },
  { key: "markets", label: "Markets" },
  { key: "management", label: "Management" },
  { key: "settlement", label: "Settlement" },
];

export const PERMISSION_OPTIONS: { value: PermissionLevel; label: string }[] = [
  { value: "none", label: "No Access" },
  { value: "view", label: "View" },
  { value: "edit", label: "Edit" },
];

export const fillPermissions = (level: PermissionLevel): ModulePermissions =>
  MODULES.reduce((acc, module) => {
    acc[module.key] = level;
    return acc;
  }, {} as ModulePermissions);

export const roleDefaultPermissions = (role: AdminRole): ModulePermissions =>
  fillPermissions(role === "Operator" ? "edit" : "view");
