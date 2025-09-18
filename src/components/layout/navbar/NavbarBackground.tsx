/** Renders the blurred background effect for the Navbar. */
export const NavbarBackground = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={`absolute inset-0 -z-10 border-b transition-all duration-300 ${
      isScrolled
        ? "border-primary/10 backdrop-blur-md"
        : "border-transparent backdrop-blur-none"
    }`}
  />
);
