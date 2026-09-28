const SLIDES = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * The presentation's outline. Static markup — real anchor links that work
 * with JavaScript off — Motion.tsx adds the current-slide highlight as an
 * enhancement once it observes which slide is in view.
 */
export default function SlideRail() {
  return (
    <nav aria-label="Sections" className="slide-rail hidden lg:flex">
      <ol className="flex flex-col gap-[1.1rem]">
        {SLIDES.map((slide) => (
          <li key={slide.id}>
            <a href={`#${slide.id}`} data-slide={slide.id} className="slide-rail__link">
              <span className="slide-rail__tick" aria-hidden="true" />
              <span className="slide-rail__label">{slide.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
