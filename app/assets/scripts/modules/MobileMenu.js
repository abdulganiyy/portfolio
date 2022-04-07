class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".site-header__menu-icon");
    this.menuNav = document.querySelector(".site-header__nav");
    this.events();
  }

  events() {
    this.menuIcon.addEventListener("click", () => this.openMenu());
  }

  openMenu() {
    this.menuIcon.classList.toggle("site-header__menu-icon--is-visible");
    this.menuNav.classList.toggle("site-header__nav--is-visible");
  }
}

export default MobileMenu;
