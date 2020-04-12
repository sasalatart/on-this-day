import {
  IconName,
  IconPrefix,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faBirthdayCake,
  fas,
  faSearch,
  faSkullCrossbones,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

export function initialize(): void {
  library.add(
    fab,
    faBirthdayCake,
    faGithub,
    fas,
    faSearch,
    faSkullCrossbones,
    faStar,
  );
}

export default {
  events: ['fas', 'star'],
  births: ['fas', 'birthday-cake'],
  deaths: ['fas', 'skull-crossbones'],
  github: ['fab', 'github'],
} as Record<
  'events' | 'births' | 'deaths' | 'github',
  [IconPrefix, IconName] | IconName
>;
