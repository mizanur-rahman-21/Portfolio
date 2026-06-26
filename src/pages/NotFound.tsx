import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { Button, ButtonLink } from "@/components/ui";

export default function NotFound() {
  const { setCommandOpen } = useApp();
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-5 py-32 text-center">
      <div className="relative">
        <p className="font-display text-[8rem] font-bold leading-none text-gradient-accent sm:text-[12rem]">
          404
        </p>
        <div className="absolute inset-x-0 -bottom-2 mx-auto h-24 w-2/3 rounded-full bg-accent/30 blur-3xl" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
        This page wandered off the grid.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/" variant="gradient" size="lg">
          <Home className="h-4 w-4" /> Back home
        </ButtonLink>
        <Button variant="outline" size="lg" onClick={() => setCommandOpen(true)}>
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>
      <Link to="/projects" className="mt-6 text-sm text-muted2 transition-colors hover:text-accent2">
        or browse my projects →
      </Link>
    </section>
  );
}
