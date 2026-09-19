import { useEffect, useState } from 'react';

export type MotionPreference = 'auto' | 'full' | 'reduced';

export default function MotionControls({ value, onChange }: { value: MotionPreference; onChange: (value: MotionPreference) => void }) {
  const [environment, setEnvironment] = useState(() => ({
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    wide: window.matchMedia('(min-width: 901px)').matches,
  }));
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 901px)');
    const update = () => setEnvironment({ reduced: reduced.matches, wide: wide.matches });
    reduced.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => { reduced.removeEventListener('change', update); wide.removeEventListener('change', update); };
  }, []);
  const enabled = value === 'full' || (value === 'auto' && !environment.reduced);
  const status = enabled ? 'Motion on' : value === 'auto' ? 'Motion reduced by system' : 'Motion reduced';
  return (
    <details className="motion-controls">
      <summary>{status}</summary>
      <label htmlFor="motion-preference">Animation preference</label>
      <select id="motion-preference" value={value} onChange={event => onChange(event.target.value as MotionPreference)}>
        <option value="full">Full motion</option>
        <option value="reduced">Reduced motion</option>
        <option value="auto">Follow system setting</option>
      </select>
      <p role="status">{enabled
        ? `Smooth scrolling and scroll animations are on. ${environment.wide ? 'The project gallery scrolls horizontally.' : 'Projects are stacked to fit this window.'}`
        : value === 'auto' ? 'Your system requests reduced motion. Choose Full motion to enable animations for this site.' : 'Animations are off by your choice.'}</p>
      {!enabled && <button type="button" className="motion-enable" onClick={() => onChange('full')}>Enable full motion</button>}
    </details>
  );
}
