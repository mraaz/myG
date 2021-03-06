export function openMobileMenuAction() {
  return {
    type: 'SHOW_MOBILE_MENU',
  }
}

export function closeMobileMenuAction() {
  return {
    type: 'CLOSE_MOBILE_MENU',
  }
}

export function topOfScreenMobileMenuAction(isTop) {
  return {
    type: 'TOP_OF_SCREEN_MOBILE_MENU',
    payload: isTop
  }
}
