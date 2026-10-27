import React, { useRef, useState } from 'react';
import { FaCamera, FaMicrophone } from 'react-icons/fa6';
import { SiDji, SiSony } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { scrollToEquipment } from '../scroll';
import './Equipment.css';

type GearItem = {
  brand: string;
  BrandIcon: IconType;
  model: string;
  category: string;
  desc: string;
  specs: string[];
  DeviceIcon: IconType;
  accent: string;
};

const GEAR: GearItem[] = [
  {
    brand: 'DJI',
    BrandIcon: SiDji,
    model: 'Osmo 360',
    category: '360° Action Camera',
    desc: 'Captures fully immersive 360-degree footage for dynamic, all-perspective storytelling, virtual tours, and cinematic motorcycle travel content.',
    specs: ['5.7K 360° Video', 'HorizonSteady EIS', 'GoPanora Virtual Tours', 'Active HDR'],
    DeviceIcon: FaCamera,
    accent: '#00b4ff',
  },
  {
    brand: 'Sony',
    BrandIcon: SiSony,
    model: 'Alpha 6700',
    category: 'Mirrorless Camera',
    desc: 'APS-C flagship sensor with real-time AI subject recognition, S-Log3 cinematic profiles, and 4K 120p high frame rate recording for commercial video productions.',
    specs: ['26.0 MP Exmor R', 'AI Autofocus Recognition', '4K 120p / 10-Bit 4:2:2', 'S-Cinetone / S-Log3'],
    DeviceIcon: FaCamera,
    accent: '#f97316',
  },
  {
    brand: 'DJI',
    BrandIcon: SiDji,
    model: 'Mic Mini',
    category: 'Wireless Microphone',
    desc: 'Ultra-compact dual-channel wireless microphone system delivering pristine broadcast-quality audio, active noise cancelling, and long battery life for on-location field production.',
    specs: ['48kHz 24-Bit Audio', 'Two-Level Active NC', '400m Transmission', '48h Battery Pack'],
    DeviceIcon: FaMicrophone,
    accent: '#00b4ff',
  },
];

export default function Equipment() {
  const [activeGearIndex, setActiveGearIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;
    const deltaTime = Date.now() - touchStartPos.current.time;
    touchStartPos.current = null;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40 && deltaTime < 600) {
      if (deltaX < 0 && activeGearIndex < GEAR.length - 1) {
        handleGearJump(activeGearIndex + 1);
      } else if (deltaX > 0 && activeGearIndex > 0) {
        handleGearJump(activeGearIndex - 1);
      }
    }
  };

  const handleGearJump = (index: number) => {
    setActiveGearIndex(index);
    scrollToEquipment(index);
  };

  return (
    <section ref={sectionRef} className="equipment-section" id="equipment" aria-labelledby="equipment-title">
      <div className="eq-pin-stage">
        <div className="eq-stage-inner">
          {/* Header Bar */}
          <div className="eq-heading-bar">
            <div className="eq-heading-left">
              <span className="section-tag">06 / Gear &amp; Tools</span>
              <h2 className="section-title" id="equipment-title">
                My Equipment<span className="accent-text">.</span>
              </h2>
            </div>
            <p className="eq-heading-desc">
              High-precision cameras, audio gear, and stabilization rigs powering 360 virtual tours and cinematic productions.
            </p>
          </div>

          {/* Fullscreen Horizontal Viewport */}
          <div
            ref={viewportRef}
            className="eq-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div ref={gridRef} className="eq-grid">
              {GEAR.map((item, i) => (
                <article
                  key={item.model}
                  className={`eq-card fade-up${activeGearIndex === i ? ' is-active' : ''}`}
                  style={{ '--eq-accent': item.accent } as React.CSSProperties}
                  id={`gear-${item.model.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="eq-top">
                    <div className="eq-device-icon" aria-hidden="true">
                      <item.DeviceIcon size={26} />
                    </div>
                    <div className="eq-brand">
                      <item.BrandIcon size={14} />
                      <span>{item.brand}</span>
                    </div>
                  </div>

                  <div className="eq-body">
                    <span className="eq-category">{item.category}</span>
                    <h3 className="eq-name">{item.brand} {item.model}</h3>
                    <p className="eq-desc">{item.desc}</p>

                    <div className="eq-specs-list">
                      {item.specs.map(spec => (
                        <span key={spec} className="eq-spec-pill">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="eq-card-watermark" aria-hidden="true">
                    0{i + 1}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile Dot Indicators & Swipe Hint */}
          <div className="mobile-eq-indicators" aria-label="Equipment navigation">
            <div className="eq-dot-group">
              {GEAR.map((item, i) => (
                <button
                  key={item.model}
                  type="button"
                  className={`eq-dot-indicator${activeGearIndex === i ? ' is-active' : ''}`}
                  onClick={() => handleGearJump(i)}
                  aria-label={`Go to ${item.brand} ${item.model}`}
                >
                  <span className="dot-fill" />
                </button>
              ))}
            </div>
            <div className="mobile-eq-swipe-hint" aria-hidden="true">
              <span>Swipe to explore gear</span>
              <span className="swipe-arrow">→</span>
            </div>
          </div>

          {/* Travel Progress Bar */}
          <div className="eq-travel-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
