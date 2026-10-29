export class HeaderComponent {
    constructor(parent) {
      this.parent = parent;
}


    addListeners(listener) {
      document
        .getElementById("home-button")
        .addEventListener("click", listener)
    }

    getHTML() {
      return (
    `
        <header class="site-header">
          <img src="assets/logo.png" alt="Смешарики">
          <button id="home-button" class="btn btn-home" type="button">🏠 Домой</button>
        </header>
    `
      )
    }

    render(listener) {
      const html = this.getHTML()
      this.parent.insertAdjacentHTML('beforeend', html)
      this.addListeners(listener)
    }
}
