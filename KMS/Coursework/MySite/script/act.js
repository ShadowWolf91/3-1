class NextButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", () => {
      window.location.href = this.getAttribute("to") || "";
    });
  }
}
class FlipText extends HTMLElement {
  connectedCallback() {
    let descr = this.getAttribute("description") || "";
    let imgsrc = this.getAttribute("imgsrc") || "";
    this.addEventListener("click", () => {
      document.getElementById("full-image").style = "display: flex";
      document.getElementById("img-descr").innerText = descr;
      document.getElementById("img-flip").src = imgsrc;
    });
  }
}
customElements.define("next-button", NextButton);
customElements.define("flip-text", FlipText);
