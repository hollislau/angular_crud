describe("Scifi client server", () => {
  it("creates a Star Trek character", () => {
    var charEl;

    browser.get("http://localhost:5000");
    element(by.model("startrekctrl.newChar.name")).sendKeys("Worf");
    element(by.model("startrekctrl.newChar.gender")).sendKeys("M");
    element(by.model("startrekctrl.newChar.rank")).sendKeys("Lt. Commander");
    element(by.model("startrekctrl.newChar.weapon")).sendKeys("Battleth");
    element(by.model("startrekctrl.newChar.power")).sendKeys("9");
    element(by.model("startrekctrl.newChar.ship")).sendKeys("Defiant");
    element(by.id("create-st-char")).click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Worf | Gender: M | Rank: Lt. Commander | Weapon: Battleth | Power: 9 | Ship: Defiant"
      );
    });
  });

  it("creates a Star Wars character", () => {
    var charEl;

    browser.get("http://localhost:5000");
    element(by.model("starwarsctrl.newChar.name")).sendKeys("Leia Organa");
    element(by.model("starwarsctrl.newChar.gender")).sendKeys("F");
    element(by.model("starwarsctrl.newChar.weapon")).sendKeys("Sporting Blaster Pistol");
    element(by.model("starwarsctrl.newChar.power")).sendKeys("7");
    element(by.model("starwarsctrl.newChar.planet")).sendKeys("Alderaan");
    element(by.id("create-sw-char")).click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Leia Organa | Gender: F | Weapon: Sporting Blaster Pistol | Power: 7 | Planet: Alderaan"
      );
    });
  });
});
