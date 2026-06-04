export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container-prose py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">
          Heritage<span className="text-gradient-amber">Verse</span>
        </p>
        <p>Crafted for travellers who chase history. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
