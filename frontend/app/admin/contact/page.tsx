"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
};

type Counts = { total: number; thisWeek: number; thisMonth: number };
type ChartPoint = { date: string; count: number };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

function toYYYYMMDD(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function AdminContactPage() {
  const { theme } = useTheme();
  const [counts, setCounts] = useState<Counts | null>(null);
  const isDark = theme === "dark";
  const chartGrid = isDark ? "rgb(39 39 42)" : "rgb(226 232 240)";
  const chartTick = isDark ? "#71717a" : "#64748b";
  const tooltipBg = isDark ? "#27272a" : "#ffffff";
  const tooltipBorder = isDark ? "#3f3f46" : "#e2e8f0";
  const tooltipLabel = isDark ? "#a1a1aa" : "#475569";
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [items, setItems] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const now = new Date();
  const defaultFrom = new Date(now);
  defaultFrom.setDate(defaultFrom.getDate() - 30);
  const [from, setFrom] = useState(toYYYYMMDD(defaultFrom));
  const [to, setTo] = useState(toYYYYMMDD(now));

  const loadCounts = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/contact-submissions/stats");
      const data = await r.json();
      setCounts(data);
    } catch {
      setCounts(null);
    }
  }, []);

  const loadChart = useCallback(async () => {
    try {
      const r = await fetch(
        `/api/admin/contact-submissions/stats?type=chart&from=${from}&to=${to}`
      );
      const data = await r.json();
      setChartData(Array.isArray(data) ? data : []);
    } catch {
      setChartData([]);
    }
  }, [from, to]);

  const loadList = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(
        `/api/admin/contact-submissions?from=${from}&to=${to}&limit=100`
      );
      const data = await r.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  useEffect(() => {
    loadChart();
    loadList();
  }, [loadChart, loadList]);

  const exportCsv = async () => {
    setExporting(true);
    try {
      const r = await fetch(
        `/api/admin/contact-submissions?from=${from}&to=${to}&limit=2000`
      );
      const data = await r.json();
      const rows = (data.items ?? []) as Submission[];
      const header = "Date,Name,Email,Phone,Subject,Message\n";
      const body = rows
        .map((s) => {
          const msg = (s.message || "").replace(/"/g, '""').replace(/\n/g, " ");
          return `"${formatDate(s.createdAt)}","${(s.name || "").replace(/"/g, '""')}","${(s.email || "").replace(/"/g, '""')}","${(s.phone || "").replace(/"/g, '""')}","${(s.subject || "").replace(/"/g, '""')}","${msg}"`;
        })
        .join("\n");
      const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contact-submissions-${from}-${to}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-theme-heading">Contact submissions</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
          />
          <span className="text-theme-muted">to</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
          />
          <button
            type="button"
            onClick={exportCsv}
            disabled={exporting || total === 0}
            className="rounded-lg bg-theme-card px-4 py-2 text-sm font-medium text-theme-heading transition-colors hover:bg-(--page-pattern-color) disabled:opacity-50"
          >
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total", value: counts?.total ?? "—" },
          { label: "This week", value: counts?.thisWeek ?? "—" },
          { label: "This month", value: counts?.thisMonth ?? "—" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-theme bg-theme-card p-5 transition-all duration-200 hover:border-theme"
          >
            <p className="text-sm font-medium text-theme-muted">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-theme-heading tabular-nums">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-theme bg-theme-card p-4 transition-all">
        <p className="mb-4 text-sm font-medium text-theme-muted">
          Submissions over time
        </p>
        <div className="h-64 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="fillSubmissions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartGrid}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: chartTick, fontSize: 11 }}
                  tickFormatter={(v) => formatDateShort(v)}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: chartTick, fontSize: 11 }}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: tooltipLabel }}
                  formatter={(value: number) => [value, "Submissions"]}
                  labelFormatter={(label) => formatDateShort(label)}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#fillSubmissions)"
                  isAnimationActive
                  animationDuration={600}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-theme-muted">
              No data in this range
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-theme bg-theme-card overflow-hidden">
        <div className="border-b border-theme px-4 py-3">
          <p className="text-sm font-medium text-theme-muted">
            {total} submission{total !== 1 ? "s" : ""} in range
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-theme-muted">
            No submissions in this date range.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-theme text-theme-muted">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="w-8 px-2 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <Fragment key={row.id}>
                    <tr className="border-b border-theme transition-colors hover:bg-(--page-pattern-color)">
                      <td className="whitespace-nowrap px-4 py-3 text-theme-heading">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-theme-heading">{row.name}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${row.email}`}
                          className="text-brand-light hover:underline"
                        >
                          {row.email}
                        </a>
                      </td>
                      <td className="max-w-[160px] truncate px-4 py-3 text-theme-muted">
                        {row.subject || "—"}
                      </td>
                      <td className="px-2 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(expandedId === row.id ? null : row.id)
                          }
                          className="rounded p-1.5 text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                          aria-label="Toggle message"
                        >
                          {expandedId === row.id ? "▼" : "▶"}
                        </button>
                      </td>
                    </tr>
                    {expandedId === row.id && (
                      <tr className="border-b border-theme bg-theme-card">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="rounded-lg border border-theme bg-theme-section p-4">
                            {row.phone && (
                              <p className="mb-2 text-xs text-theme-muted">
                                Phone: {row.phone}
                              </p>
                            )}
                            <p className="whitespace-pre-wrap text-theme-heading">
                              {row.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
