import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumb?: Array<{ label: string; to?: string }>;
};

export function AdminPageHeader({ title, description, action, breadcrumb = [] }: AdminPageHeaderProps) {
  return (
    <div className="mb-4">
      {breadcrumb.length > 0 ? (
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          {breadcrumb.map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.to ? <Link to={item.to} className="hover:text-primary">{item.label}</Link> : <span>{item.label}</span>}
              {idx < breadcrumb.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground mt-1">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}
