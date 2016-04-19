import navigationTypes from './navigation-types';

export function updateNavigation(data) {
  return { type: navigationTypes.UPDATE, data };
}
