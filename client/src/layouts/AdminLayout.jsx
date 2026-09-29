import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, LogOut, MessageSquare, PenSquare } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/comments", label: "Comments", icon: MessageSquare },
  { to: "/admin/blogs/new", label: "New post", icon: PenSquare },
];

const isNavActive = (to, pathname) => {
  if (to === "/admin") return pathname === "/admin";
  if (to === "/admin/blogs/new") return pathname === "/admin/blogs/new";
  if (to === "/admin/blogs") {
    return pathname === "/admin/blogs" || /\/admin\/blogs\/[^/]+\/edit$/.test(pathname);
  }
  return pathname === to || pathname.startsWith(`${to}/`);
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background text-dark">
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-secondary bg-light">
        <div className="border-b border-secondary p-6">
          <p className="text-xs font-medium tracking-wider text-accent uppercase">Admin</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">Write From Left</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isNavActive(to, pathname)
                  ? "bg-primary text-light"
                  : "text-dark hover:bg-secondary"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-secondary p-4">
          <p className="truncate text-xs text-dark-accent">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-primary transition-colors hover:bg-secondary"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
