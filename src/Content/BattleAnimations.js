import { utils } from "../helpers/utils";

export const BattleAnimations = {
  async spin(event, onComplete) {
    const element = document.querySelector(`.${event.caster.classId}`);
    const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
    element.classList.add(animationClassName);

    //Remove class when animation is fully complete
    element.addEventListener("animationend", () => {
      element.classList.remove(animationClassName);
    }, { once:true });

    //Continue battle cycle right around when the pizzas collide
    await utils.wait(100);
    onComplete();
  },

  async tackle(event, onComplete) {
    const element = document.querySelector(`.${event.caster.classId}`);
    const animationClassName = event.caster.team === "player" ? "battle-tackle-right" : "battle-tackle-left";
    element.classList.add(animationClassName);

    //Remove class when animation is fully complete
    element.addEventListener("animationend", () => {
      element.classList.remove(animationClassName);
    }, { once:true });

    //Continue battle cycle right around when the pizzas collide
    await utils.wait(100);
    onComplete();
  }
}