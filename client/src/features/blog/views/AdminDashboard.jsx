import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../services/blog.service";

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-secondary bg-light p-6">
    <p className="text-xs font-medium tracking-wider text-accent uppercase">{label}</p>
    <p className="mt-3 font-display text-4xl font-semibold">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const nextStats = await getAdminStats();
      if (!cancelled) setStats(nextStats);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="p-6 lg:p-10">
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-dark-accent">A snapshot of posts and comment moderation.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published" value={stats?.published ?? "—"} />
        <StatCard label="Drafts" value={stats?.drafts ?? "—"} />
        <StatCard label="Pending comments" value={stats?.pendingComments ?? "—"} />
        <StatCard label="All comments" value={stats?.totalComments ?? "—"} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/admin/blogs/new" className="btn-primary">
          New post
        </Link>
        <Link to="/admin/blogs" className="btn-secondary">
          Manage blogs
        </Link>
        <Link to="/admin/comments" className="btn-secondary">
          Review comments
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
