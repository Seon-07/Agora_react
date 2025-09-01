import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faUser,
  faCog,
  faRightFromBracket,
  faSquarePlus,
  faCheckToSlot,
  faScrewdriverWrench,
  faBell,
} from '@fortawesome/free-solid-svg-icons';


interface Props {
  name: string;
  className?: string;
}

const iconMap: Record<string, IconDefinition> = {
  faHome: faHome,
  faUser: faUser,
  faCog: faCog,
  faRightFromBracket: faRightFromBracket,
  faSquarePlus: faSquarePlus,
  faCheckToSlot: faCheckToSlot,
  faScrewdriverWrench: faScrewdriverWrench,
  faBell: faBell,
};

const CommonIcon = ({ name, className }: Props) => {
  const icon = iconMap[name];

  if (!icon) {
    console.warn('등록되지 않은 아이콘:' + {name});
    return null;
  }

  return <FontAwesomeIcon icon={icon} className={className} />;
};

export default CommonIcon;