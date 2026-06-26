export type AdminRole = "Operator" | "Viewer";

export type AdminStatus = "active" | "inactive" | "blocked";

export type PermissionLevel = "none" | "view" | "edit";

export type ModuleKey =
  | "whitelabels"
  | "dashboard"
  | "availableEvents"
  | "liveEvents"
  | "markets"
  | "management"
  | "settlement";

export type ModulePermissions = Record<ModuleKey, PermissionLevel>;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  permissions: ModulePermissions;
};

export type AdminUserFormValues = {
  name: string;
  email: string;
  role: AdminRole;
  status: Exclude<AdminStatus, "blocked">;
  permissions: ModulePermissions;
};
