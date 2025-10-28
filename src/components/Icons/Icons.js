// src/components/Icons.js

import React from 'react';
import Svg, { Path, G, Rect, Circle } from 'react-native-svg';

// Ícones que já estavam corretos
export const ArrowLeftIcon = ({ size = 19, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BackPage = ({ size = 32, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon = ({ size = 28, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 21 21">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m1.5 10.5l9-9l9 9m-16 1v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
    />
  </Svg>
);

export const DashboardIcon = ({ size = 28, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14">
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
    >
      <Rect width="5" height="7" x="8.5" y="6.5" rx=".5" />
      <Rect width="5" height="3.01" x="8.5" y=".5" rx=".5" />
      <Rect width="5" height="7" x=".5" y=".5" rx=".5" />
      <Rect width="5" height="3.01" x=".5" y="10.49" rx=".5" />
    </G>
  </Svg>
);

export const ProfileIcon = ({ size = 28, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill="none"
      stroke={color}
      strokeWidth={1}
      d="M3.5 14v-.5a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4v.5m-2-9a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"
    />
  </Svg>
);

export const ShareSocial = ({ size = 28, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Path
      fill={color}
      d="M384 336a63.78 63.78 0 0 0-46.12 19.7l-148-83.27a63.85 63.85 0 0 0 0-32.86l148-83.27a63.8 63.8 0 1 0-15.73-27.87l-148 83.27a64 64 0 1 0 0 88.6l148 83.27A64 64 0 1 0 384 336"
    ></Path>
  </Svg>
);

// --- ÍCONES NOVOS (CONVERTIDOS) ---

export const SearchIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill="none" stroke={color} strokeWidth={1.5}>
      <Circle cx="11" cy="11" r="5.5" />
      <Path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4" />
    </G>
  </Svg>
);

export const ArrowDownIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" />
  </Svg>
);

export const ArrowRightIcon = ({ size = 20, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
  </Svg>
);

export const NotificationIcon = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18.134 11C18.715 16.375 21 18 21 18H3s3-2.133 3-9.6c0-1.697.632-3.325 1.757-4.525S10.41 2 12 2q.507 0 1 .09M19 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m-5.27 13a2 2 0 0 1-3.46 0"
    />
  </Svg>
);

export const EmailIcon = ({ size = 20, color = '#9e9e9eff' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      d="M15 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 1.707l-6.285 6.295a1 1 0 0 1-1.419.002L1 3.707v8.585l3.146-3.146a.5.5 0 1 1 .708.708L1.706 13h12.587l-3.147-3.146a.5.5 0 0 1 .708-.708L15 12.293zM14.292 3H1.707l6.298 6.298z"
    />
  </Svg>
);

export const LockIcon = ({ size = 20, color = '#9e9e9eff' }) => (
  <Svg width={size} height={size} viewBox="2 2.5 19 19">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8 10V8c0-2.761 1.239-5 4-5s4 2.239 4 5v2M3.5 17.8v-4.6c0-1.12 0-1.68.218-2.107a2 2 0 0 1 .874-.875c.428-.217.988-.217 2.108-.217h10.6c1.12 0 1.68 0 2.108.217a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108v4.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C18.98 21 18.42 21 17.3 21H6.7c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3.5 19.481 3.5 18.921 3.5 17.8m8.5-2.05v-.5m4 .5v-.5m-8 .5v-.5"
    />
  </Svg>
);

export const PinIcon = ({ size = 16, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M11.906 1.994a8 8 0 0 1 8.09 8.421a8 8 0 0 1-1.297 3.957a1 1 0 0 1-.133.204l-.108.129q-.268.365-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18 18 0 0 1-.309-.38l-.133-.163a1 1 0 0 1-.13-.202a7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0a3 3 0 0 1 5.999 0"
      clipRule="evenodd"
    />
  </Svg>
);

export const CalendarIcon = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5 2v1H2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H11V2h-1v1H6V2zM3 4h2v1h1V4h4v1h1V4h2v2H3zm1.5 4.5v1h1v-1zm3 0v1h1v-1zm3 1v-1h1v1zm-6 1v1h1v-1zm3 1v-1h1v1zm3-1v1h1v-1z"
      clipRule="evenod d"
    />
  </Svg>
);

export const BellIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 5.464V3.099m0 2.365a5.34 5.34 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C19 17.4 19 18 18.462 18H5.538C5 18 5 17.4 5 16.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.34 5.34 0 0 1 12 5.464M6 5L5 4M4 9H3m15-4l1-1m1 5h1M8.54 18a3.48 3.48 0 0 0 6.92 0z"
    ></Path>
  </Svg>
);

export const EyeIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill="none" stroke={color} strokeWidth={1.5}>
      <Circle cx="12" cy="12" r="3" />
      <Path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18s-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6s6.768 3.21 8.188 4.934Z" />
    </G>
  </Svg>
);

export const EyeIconModal = ({ size = 28, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill="none" stroke={color} strokeWidth={1.5}>
      <Circle cx="12" cy="12" r="3" />
      <Path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18s-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6s6.768 3.21 8.188 4.934Z" />
    </G>
  </Svg>
);

export const ToothIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 6c.5.5 1.503.412 3-.824m0 0q-.332-.272-.689-.626c-2.306-2.284-5.446-1.837-6.917 0C3.378 5.82.778 8.98 7.142 20.24c.264.466.789.76 1.354.76c.902 0 1.607-.72 1.636-1.56c.063-1.782.408-3.837 1.868-3.837s1.806 2.055 1.868 3.837c.029.84.734 1.56 1.636 1.56c.565 0 1.09-.294 1.354-.76c6.365-11.261 3.764-14.42 2.748-15.69c-1.471-1.837-4.611-2.284-6.917 0q-.357.353-.689.626"
    />
  </Svg>
);

export const MedicalBagIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 8.5h4m-2-2v4m5.5-7h-11a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1m-2.5 0v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2"
    />
  </Svg>
);

export const ScissorsIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14">
    <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Path d="m2.19 4.93l11.31 6.52" />
      <Circle cx="2.75" cy="2.75" r="2.25" />
      <Path d="M2.19 9.07L13.5 2.55" />
      <Circle cx="2.75" cy="11.25" r="2.25" />
    </G>
  </Svg>
);

export const MakeupBrushIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.956 5.241l3.77 3.77l-3.616 3.617a2.666 2.666 0 0 1-3.77 0v0a2.666 2.666 0 0 1 0-3.77L4.955 5.24ZM3.494 6.703l3.77 3.77M4.956 5.241l3.77 3.77l3.9-1.82a1 1 0 0 0 .285-1.613L8.39 1.056a1 1 0 0 0-1.613.285l-1.82 3.9Zm4.458-3.163L8.221 3.963m3.502.424L9.837 5.579"
    />
  </Svg>
);

export const GlassesIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      d="m15.86 9.16l-1.43-5.31a1.88 1.88 0 0 0-1.81-1.37h-.44v1.26h.44a.63.63 0 0 1 .6.46L14 7.06a3.9 3.9 0 0 0-1.71-.39a3.64 3.64 0 0 0-3.7 3H7.42a3.64 3.64 0 0 0-3.7-3A3.9 3.9 0 0 0 2 7.06l.78-2.86a.63.63 0 0 1 .6-.46h.44V2.48h-.44a1.88 1.88 0 0 0-1.81 1.37L.14 9.16a3.2 3.2 0 0 0-.14.94a3.59 3.59 0 0 0 3.72 3.42a3.71 3.71 0 0 0 3.62-2.59h1.32a3.71 3.71 0 0 0 3.62 2.59A3.59 3.59 0 0 0 16 10.1a3.2 3.2 0 0 0-.14-.94m-12.14 3.1a2.33 2.33 0 0 1-2.46-2.16a2.33 2.33 0 0 1 2.46-2.17a2.34 2.34 0 0 1 2.47 2.17a2.34 2.34 0 0 1-2.47 2.16m8.56 0a2.34 2.34 0 0 1-2.47-2.16a2.34 2.34 0 0 1 2.47-2.17a2.33 2.33 0 0 1 2.46 2.17a2.33 2.33 0 0 1-2.46 2.16"
    />
  </Svg>
);

export const CheckIcon = ({ size = 24, color = '#00A859' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
  </Svg>
);

export const CheckIconFilter = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
  </Svg>
);

export const CancelIcon = ({ size = 24, color = '#ffffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"
    />
  </Svg>
);

export const CloseIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"
    />
  </Svg>
);

export const PersonIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <Circle cx="12" cy="8.196" r="4.446" />
      <Path d="M19.608 20.25a7.608 7.608 0 0 0-15.216 0" />
    </G>
  </Svg>
);

export const ClockIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Path
      fill={color}
      d="M271.514 95.5h-32v178.111l115.613 54.948l13.737-28.902l-97.35-46.268z"
    />
    <Path
      fill={color}
      d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16m0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208s-93.125 208-208 208"
    />
  </Svg>
);

export const ShieldCheckIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 1.25c-.937 0-1.833.307-3.277.801l-.727.25c-1.481.506-2.625.898-3.443 1.23c-.412.167-.767.33-1.052.495c-.275.16-.55.359-.737.626c-.185.263-.281.587-.341.9c-.063.324-.1.713-.125 1.16c-.048.886-.048 2.102-.048 3.678v1.601c0 6.101 4.608 9.026 7.348 10.224l.027.011c.34.149.66.288 1.027.382c.387.1.799.142 1.348.142c.55 0 .96-.042 1.348-.142c.367-.094.687-.233 1.026-.382l.028-.011c2.74-1.198 7.348-4.123 7.348-10.224V10.39c0-1.576 0-2.792-.048-3.679a9 9 0 0 0-.125-1.16c-.06-.312-.156-.636-.34-.9c-.188-.266-.463-.465-.738-.625a9 9 0 0 0-1.052-.495c-.818-.332-1.962-.724-3.443-1.23l-.727-.25c-1.444-.494-2.34-.801-3.277-.801M9.08 3.514c1.615-.552 2.262-.764 2.92-.764s1.305.212 2.92.764l.572.196c1.513.518 2.616.896 3.39 1.21c.387.158.667.29.864.404q.144.084.208.139c.038.03.053.048.055.05a.4.4 0 0 1 .032.074q.03.082.063.248a7 7 0 0 1 .1.958c.046.841.046 2.015.046 3.624v1.574c0 5.176-3.87 7.723-6.449 8.849c-.371.162-.586.254-.825.315c-.228.059-.506.095-.976.095s-.748-.036-.976-.095c-.24-.06-.454-.153-.825-.315c-2.58-1.126-6.449-3.674-6.449-8.849v-1.574c0-1.609 0-2.783.046-3.624a7 7 0 0 1 .1-.958q.032-.166.063-.248c.018-.05.03-.07.032-.074a.4.4 0 0 1 .055-.05q.064-.055.208-.14c.197-.114.477-.245.864-.402c.774-.315 1.877-.693 3.39-1.21z"
      clipRule="evenodd"
    />
  </Svg>
);

export const HelpIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
      <Path d="M9 9c0-3.5 5.5-3.5 5.5 0c0 2.5-2.5 2-2.5 5m0 4.01l.01-.011" />
    </G>
  </Svg>
);

export const QrCodeIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Path
      fill={color}
      d="M5 5v8h2v2h2v-2h4V5zm8 8v2h2v2h-4v2H5v8h8v-8h6v-2h-2v-2h4v-2h2v2h2v-2h2V5h-8v8zm12 2v2h2v-2zm0 2h-2v2h2zm0 2v2h2v-2zm0 2h-2v-2h-2v2h-5v6h2v-4h4v2h2v-2h1zm-3 4h-2v2h2zm1-8v-2h-2v2zm-12 0v-2H9v2zm-4-2H5v2h2zm8-10v4h-1v2h1v1h2V9h1V7h-1V5zM7 7h4v4H7zm14 0h4v4h-4zM8 8v2h2V8zm14 0v2h2V8zM7 21h4v4H7zm1 1v2h2v-2zm17 3v2h2v-2z"
    />
  </Svg>
);

export const CheckBadgeIcon = ({ size = 22, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      d="m5.063 2.616l-1.47.002l-.147.005a1.977 1.977 0 0 0-1.828 1.971l-.002 1.469l-1.038 1.04l-.115.126A1.977 1.977 0 0 0 .58 9.898l1.037 1.037l.002 1.471l.005.148a1.977 1.977 0 0 0 1.971 1.828l1.468-.001l1.04 1.04l.126.116a1.977 1.977 0 0 0 2.67-.116l1.036-1.04l1.471.001l.148-.005a1.977 1.977 0 0 0 1.83-1.971l-.002-1.472l1.04-1.036l.115-.126a1.977 1.977 0 0 0-.115-2.67l-1.04-1.04l.001-1.467l-.005-.148a1.977 1.977 0 0 0-1.971-1.83l-1.471-.001l-1.037-1.037a1.976 1.976 0 0 0-2.796 0zm3.127-.33l1.331 1.331h1.885c.539 0 .976.438.976.977v1.883l1.332 1.333c.381.38.381 1 0 1.38l-1.333 1.331l.001 1.885a.976.976 0 0 1-.976.976H9.52l-1.33 1.332a.976.976 0 0 1-1.381 0l-1.333-1.333l-1.883.001a.976.976 0 0 1-.976-.976l-.001-1.885l-1.331-1.33a.976.976 0 0 1 0-1.381l1.331-1.333V4.594c0-.539.438-.976.977-.976l1.883-.001L6.81 2.286a.976.976 0 0 1 1.38 0m2.664 3.86a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L6.5 9.793l3.646-3.647a.5.5 0 0 1 .708 0"
    />
  </Svg>
);

export const LogoutIcon = ({ size = 24, color = '#d84343ff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
    />
  </Svg>
);

export const ArrowRightFilledIcon = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12.043 7.5L9.396 4.854l.708-.708L13.957 8l-3.853 3.854l-.708-.707L12.043 8.5H3v-1z"
      clipRule="evenodd"
    />
  </Svg>
);

export const ArrowUpSLine = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="m12 10.828l-4.95 4.95l-1.414-1.414L12 8l6.364 6.364l-1.414 1.414z"
    />
  </Svg>
);

export const SharpMoreVert = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
    />
  </Svg>
);
export const UserAddLine = ({ size = 16, color = '#079748ff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M14 14.252v2.09A6 6 0 0 0 6 22H4a8 8 0 0 1 10-7.749M12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2z"
    ></Path>
  </Svg>
);

export const EyeOpenIcon = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="12"
      r="3"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const EyeClosedIcon = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 1l22 22"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const OutlineCalendarToday = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V10h16zm0-13H4V5h16z"
    ></Path>
  </Svg>
);

export const LocationPin = ({ size = 16, color = '#fff' }) => (
  <Svg viewBox="0 0 512 512" width={size} height={size}>
    <Path
      fill={color}
      d="M253.924 127.592a64 64 0 1 0 64 64a64.073 64.073 0 0 0-64-64m0 96a32 32 0 1 1 32-32a32.037 32.037 0 0 1-32 32"
    ></Path>
    <Path
      fill={color}
      d="M376.906 68.515A173.922 173.922 0 0 0 108.2 286.426l120.907 185.613a29.62 29.62 0 0 0 49.635 0l120.911-185.613a173.92 173.92 0 0 0-22.747-217.911m-4.065 200.444l-118.916 182.55l-118.917-182.55c-36.4-55.879-28.593-130.659 18.563-177.817a141.92 141.92 0 0 1 200.708 0c47.156 47.158 54.962 121.938 18.562 177.817"
    ></Path>
  </Svg>
);

export const UsersGroup = ({ size = 16, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17 19.5c0-1.657-2.239-3-5-3s-5 1.343-5 3m14-3c0-1.23-1.234-2.287-3-2.75M3 16.5c0-1.23 1.234-2.287 3-2.75m12-4.014a3 3 0 1 0-4-4.472M6 9.736a3 3 0 0 1 4-4.472m2 8.236a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
    ></Path>
  </Svg>
);

export const BaselineElectricBolt = ({ size = 24, color = '#fff' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      fill={color}
      d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.19.74.08 1.01c.3.3.77.31 1.08.02l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 10l4.85-6.76c.22-.31.19-.74-.08-1.01a.77.77 0 0 0-1.08-.02"
    ></Path>
  </Svg>
);

export const BaselineCallMissedOutgoing = ({ size = 24, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="m3 8.41l9 9l7-7V15h2V7h-8v2h4.59L12 14.59L4.41 7z"
    ></Path>
  </Svg>
);

export const OutlineFileDownload = ({ size = 24, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3zm-1-4l-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59L7 11l5 5z"
    ></Path>
  </Svg>
);

export const BarChart = ({ size = 24, color = '#ffff' }) => (
  <Svg viewBox="0 0 64 64" width={size} height={size}>
    <Path
      fill={color}
      d="M60 55.2h-5.4V35.5c0-3.2-2.6-5.7-5.7-5.7h-5.8c-3.2 0-5.7 2.6-5.7 5.7v19.7h-6V20.4c0-3.2-2.6-5.7-5.7-5.7h-5.8c-3.2 0-5.7 2.6-5.7 5.7v34.8H6.3V6.5c0-1.2-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v48.9c0 2.3 1.9 4.3 4.3 4.3h54c1.2 0 2.3-1 2.3-2.3s-1.1-2.2-2.3-2.2m-41.3 0V20.4c0-.7.6-1.2 1.2-1.2h5.8c.7 0 1.2.6 1.2 1.2v34.8zm23.2 0V35.5c0-.7.6-1.2 1.2-1.2h5.8c.7 0 1.2.6 1.2 1.2v19.7z"
    ></Path>
  </Svg>
);

export const ChartPie = ({ size = 24, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="currentColor"
      d="M13.065 3.761a.75.75 0 0 1 .53-.22a7.01 7.01 0 0 1 7.01 7.01a.75.75 0 0 1-.75.75h-6.26a.75.75 0 0 1-.75-.75v-6.26a.75.75 0 0 1 .22-.53m1.28 6.04h4.71a5.51 5.51 0 0 0-4.71-4.708z"
    ></Path>
    <Path
      fill="currentColor"
      d="M3.84 15.966A7.75 7.75 0 0 1 11 5.25a.75.75 0 0 1 .75.75v6.69l4.73 4.73a.75.75 0 0 1 0 1.06a7.75 7.75 0 0 1-12.64-2.514m.94-3.579a6.25 6.25 0 0 0 10.077 5.53L10.47 13.53a.75.75 0 0 1-.22-.53V6.795a6.25 6.25 0 0 0-5.47 5.592m15.553 2.91a5.7 5.7 0 0 1-1.227 1.836l-4.002-4.002h5.66a5.7 5.7 0 0 1-.431 2.166"
    ></Path>
  </Svg>
);

export const PlantFill = ({ size = 45, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 256 256">
    <Path
      fill={color}
      d="M205.41 159.07a60.9 60.9 0 0 1-31.83 8.86a71.7 71.7 0 0 1-27.36-5.66A55.55 55.55 0 0 0 136 194.51V224a8 8 0 0 1-8.53 8a8.18 8.18 0 0 1-7.47-8.25v-12.44l-38.62-38.62A52.5 52.5 0 0 1 63.44 176a45.8 45.8 0 0 1-23.92-6.67C17.73 156.09 6 125.62 8.27 87.79a8 8 0 0 1 7.52-7.52c37.83-2.23 68.3 9.46 81.5 31.25a46 46 0 0 1 6.45 28.48a4 4 0 0 1-6.89 2.43l-19.2-20.1a8 8 0 0 0-11.31 11.31l53.88 55.25c.06-.78.13-1.56.21-2.33a68.56 68.56 0 0 1 18.64-39.46l50.59-53.46a8 8 0 0 0-11.31-11.32l-49 51.82a4 4 0 0 1-6.78-1.74c-4.74-17.48-2.65-34.88 6.4-49.82c17.86-29.48 59.42-45.26 111.18-42.22a8 8 0 0 1 7.52 7.52c3 51.77-12.78 93.33-42.26 111.19"
    ></Path>
  </Svg>
);

export const Heart = ({ size = 45, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 14 14">
    <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Rect width="13" height="13" x=".5" y=".5" rx="3"></Rect>
      <Path d="M2.5 7.02h2L6 4.51l1.5 5.5l2-2.99h2"></Path>
    </G>
  </Svg>
);

export const ClosedBook = ({ size = 45, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Path
      fill={color}
      d="M33.624 6L6.907 13.371S2 13.233 2 18.445c0 2.151.954 3.754.954 3.754l20.354 34.042c1.946 3.1 6.079 1.159 6.079 1.159l31.211-15.205l-1.168-1.185c-.275-1.423-.435-4.058 1.497-6.02c.043-.044.051-.104.074-.159L62 34.43zM19.525 25.906l-4.816-7.576l19.744-5.838l5.463 5.947zm38.887 12.235c-.065.46-.098.908-.091 1.328l-20.489 9.725l20.562-8.726c.02.159.038.319.063.463L32.192 53.617l26.472-11.74l.016.062l-29.293 14.013c-.014.009-1.351.72-2.691.72c-1.324 0-2.149-.68-2.525-2.078c-.967-3.592 4.527-5.628 4.61-5.658l30.383-13.145c-.218.4-.369.807-.495 1.213l-19.287 9.079z"
    ></Path>
  </Svg>
);

export const Portfolio = ({ size = 45, color = '#ffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20">
    <Path
      fill={color}
      d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9zm3-8V2H8v1z"
    ></Path>
  </Svg>
);

export const User1 = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12 4a3 3 0 1 0 0 6a3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7M3.5 19a5 5 0 0 1 5-5h7a5 5 0 0 1 5 5v2h-2v-2a3 3 0 0 0-3-3h-7a3 3 0 0 0-3 3v2h-2z"
    ></Path>
  </Svg>
);

export const Boxes = ({ size = 16, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2l-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504L1.508 9.071l2.742 1.567l2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134l2.75 1.571v-3.134L8.5 9.933zm.508-3.996l2.742 1.567l2.742-1.567l-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643L8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"
    ></Path>
  </Svg>
);

export const CloudSync = ({ size = 24, color = '#333' }) => (
  <Svg viewBox="0 0 28 28" width={size} height={size}>
    <Path
      fill={color}
      d="M14 4.5a5.5 5.5 0 0 0-5.496 5.28a.75.75 0 0 1-.75.72H7.5a4 4 0 0 0 0 8h4.566a7.6 7.6 0 0 0-.05 1.5H7.5a5.5 5.5 0 0 1-.431-10.983a7.001 7.001 0 0 1 13.862 0a5.5 5.5 0 0 1 4.963 6.561a7.5 7.5 0 0 0-1.444-1.713A4 4 0 0 0 20.5 10.5h-.255a.75.75 0 0 1-.75-.72A5.5 5.5 0 0 0 14 4.5m-1 15a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0m5.349-4.08A4 4 0 0 1 23 17.313V16.5a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h.727a2.998 2.998 0 0 0-4.848-.871a.5.5 0 0 1-.707-.707a4 4 0 0 1 1.677-1.003m2.302 8.16A4 4 0 0 1 16 21.687v.814a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-.727a2.998 2.998 0 0 0 4.848.871a.5.5 0 0 1 .707.707a4 4 0 0 1-1.677 1.003"
    ></Path>
  </Svg>
);

export const Checkmark = ({ size = 16, color = '#333' }) => (
  <Svg viewBox="0 0 32 32" width={size} height={size}>
    <Path
      fill={color}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m6.5 17l6 6l13-13"
    ></Path>
  </Svg>
);

export const Lixeira = ({ size = 20, color = '#c70000ff' }) => (
  <Svg viewBox="0 0 14 14" width={size} height={size}>
    <Path
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 3.5h12m-10.5 0h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9h0Zm2 0V3a2.5 2.5 0 0 1 5 0v.5"
    ></Path>
  </Svg>
);

export const Download = ({ size = 24, color = '#ffffffff' }) => (
  <Svg viewBox="0 0 14 14" width={size} height={size}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14m3.146-5.69l-2.793 2.793a.5.5 0 0 1-.707 0L3.854 8.31a.5.5 0 0 1 .353-.853H6V3.75a1 1 0 0 1 2 0v3.707h1.793a.5.5 0 0 1 .353.853"
      clipRule="evenodd"
    ></Path>
  </Svg>
);

export const CheckboxFilled = ({ size = 16, color = '#333' }) => {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5zM3 3v10h10V3z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export const ImageOutline = ({ size = 40, color = '#8a8a8aff' }) => (
  <Svg viewBox="0 0 512 512" width={size} height={size}>
    <Rect
      width="416"
      height="352"
      x="48"
      y="80"
      fill="none"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="25"
      rx="48"
      ry="48"
    ></Rect>
    <Circle
      cx="336"
      cy="176"
      r="32"
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
    ></Circle>
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="25"
      d="m304 335.79l-90.66-90.49a32 32 0 0 0-43.87-1.3L48 352m176 80l123.34-123.34a32 32 0 0 1 43.11-2L464 368"
    ></Path>
  </Svg>
);

export const ClockAlert = ({ size = 27, color = '#00A859' }) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <Path d="M12 6v6l4 2"></Path>
        <Path d="M16 21.16a10 10 0 1 1 5-13.516M20 11.5v6m0 4h.01"></Path>
      </G>
    </Svg>
  );
};
