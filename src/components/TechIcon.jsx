import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import Icon from './Icon';

const TECH_ICON_MAP = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  react: { Icon: SiReact, color: '#61DAFB' },
  bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
  php: { Icon: SiPhp, color: '#8993BE' },
  laravel: { Icon: SiLaravel, color: '#FF2D20' },
  'node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  express: { Icon: SiExpress, color: '#f2f4ff' },
  mysql: { Icon: SiMysql, color: '#4479A1' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: '#f2f4ff' },
};

export default function TechIcon({ name, size = 20, className = '' }) {
  const entry = TECH_ICON_MAP[name?.toLowerCase().trim()];

  if (!entry) {
    return <Icon name="code" size={size} className={className} />;
  }

  const { Icon: BrandIcon, color } = entry;
  return <BrandIcon size={size} color={color} className={className} aria-hidden="true" />;
}

export function getTechColor(name) {
  return TECH_ICON_MAP[name?.toLowerCase().trim()]?.color || 'var(--purple)';
}

export function hasTechIcon(name) {
  return Boolean(TECH_ICON_MAP[name?.toLowerCase().trim()]);
}
