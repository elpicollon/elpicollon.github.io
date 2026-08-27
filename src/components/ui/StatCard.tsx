interface StatCardProps {
  value: string;
  label: string;
  variant?: "stat" | "credential";
  className?: string;
}

export function StatCard({
  value,
  label,
  variant = "stat",
  className = ""
}: StatCardProps) {
  if (variant === "credential") {
    return (
      <div className={`quem-sou-card cut ${className}`}>
        <span className="title">{value}</span>
        <span className="subtitle">{label}</span>
      </div>
    );
  }

  return (
    <div className={`num-box cut ${className}`}>
      <span className="n">{value}</span>
      <span className="k">{label}</span>
    </div>
  );
}
