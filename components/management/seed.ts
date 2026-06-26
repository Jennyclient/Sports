import type { AdminUser } from "@/types/management";
import { roleDefaultPermissions } from "./modules";

export const MANAGEMENT_SEED: AdminUser[] = [
  {
    id: "adm-1",
    name: "Alex Morgan",
    email: "alex.morgan@sportsadmin.com",
    role: "Operator",
    status: "active",
    lastLogin: "2026-06-17T11:30:00",
    permissions: roleDefaultPermissions("Operator"),
  },
  {
    id: "adm-2",
    name: "Priya Sharma",
    email: "priya.sharma@sportsadmin.com",
    role: "Operator",
    status: "active",
    lastLogin: "2026-06-17T10:15:00",
    permissions: roleDefaultPermissions("Operator"),
  },
  {
    id: "adm-3",
    name: "James Wilson",
    email: "james.wilson@sportsadmin.com",
    role: "Viewer",
    status: "active",
    lastLogin: "2026-06-17T09:45:00",
    permissions: roleDefaultPermissions("Viewer"),
  },
  {
    id: "adm-4",
    name: "Sofia Martinez",
    email: "sofia.martinez@sportsadmin.com",
    role: "Operator",
    status: "inactive",
    lastLogin: "2026-06-14T16:20:00",
    permissions: roleDefaultPermissions("Operator"),
  },
  {
    id: "adm-5",
    name: "Rahul Verma",
    email: "rahul.verma@sportsadmin.com",
    role: "Viewer",
    status: "active",
    lastLogin: "2026-06-17T08:00:00",
    permissions: roleDefaultPermissions("Viewer"),
  },
  {
    id: "adm-6",
    name: "Chris Taylor",
    email: "chris.taylor@sportsadmin.com",
    role: "Viewer",
    status: "blocked",
    lastLogin: "2026-06-10T14:30:00",
    permissions: roleDefaultPermissions("Viewer"),
  },
];
