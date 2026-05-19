import React from 'react';
import { FaCamera, FaMicrophone } from 'react-icons/fa6';
import { SiDji, SiSony } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useInView } from '../hooks/useInView';
import './Equipment.css';

type GearItem = {
  brand: string;
  BrandIcon: IconType;
  model: string;
  category: string;
  desc: string;
  DeviceIcon: IconType;
  accent: string;
};

const GEAR: GearItem[] = [
  {
    brand: 'DJI',
    BrandIcon: SiDji,
    model: 'Osmo 360',
    category: '360° Action Camera',
    desc: 'Captures fully immersive 360-degree footage for dynamic, all-perspective storytelling and cinematic content creation.',
    DeviceIcon: FaCamera,
    accent: '#00b4ff',
  },
  {
    brand: 'Sony',
    BrandIcon: SiSony,
    model: 'Alpha 6700',
    category: 'Mirrorless Camera',
    desc: 'APS-C sensor with AI-powered autofocus for exceptional photo clarity and professional-grade video production.',
    DeviceIcon: FaCamera,
    accent: '#c8c8c8',
  },
  {
    brand: 'DJI',
    BrandIcon: SiDji,
    model: 'Mic Mini',
    category: 'Wireless Microphone',
    desc: 'Ultra-compact wireless microphone system delivering broadcast-quality audio for on-the-go content production.',
    DeviceIcon: FaMicrophone,
    accent: '#00b4ff',
  },
];

export default function Equipment() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="equipment-section" id="equipment" ref={ref}>
      <div className="container">
        <span className="section-tag">Gear &amp; Tools</span>
        <h2 className="section-title">My Equipment</h2>
        <div className="section-divider" style={{ marginBottom: '3.5rem' }} />

        <div className={`eq-grid${inView ? ' in-view' : ''}`}>
          {GEAR.map((item, i) => (
            <div
              key={item.model}
              className="eq-card fade-up"
              style={{ '--eq-accent': item.accent, transitionDelay: `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="eq-top">
                <div className="eq-device-icon">
                  <item.DeviceIcon size={26} />
                </div>
                <div className="eq-brand">
                  <item.BrandIcon size={13} />
                  {item.brand}
                </div>
              </div>

              <div className="eq-body">
                <span className="eq-category">{item.category}</span>
                <h3 className="eq-name">{item.brand} {item.model}</h3>
                <p className="eq-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
