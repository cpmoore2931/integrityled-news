import { Link } from "@tanstack/react-router";
import { CATEGORIES, type CategorySlug } from "@/lib/site";

export function CategoryFilter({ active }: { active: CategorySlug | null }) {
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      <Link
        to="/news"
        className={`px-3 py-1 text-sm font-semibold ${active === null ? "bg-navy text-paper" : "border border-line bg-card text-ink"}`}
      >
        All
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          to="/news/category/$category"
          params={{ category: category.slug }}
          className={`px-3 py-1 text-sm font-semibold ${active === category.slug ? "bg-navy text-paper" : "border border-line bg-card text-ink"}`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
