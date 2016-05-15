describe("Scifi client", () => {
  it("creates a Star Trek character", () => {
    var charSpan;

    browser.get("http://localhost:5000");
    element(by.model("startrekctrl.newChar.name")).sendKeys("Worf");
    element(by.model("startrekctrl.newChar.gender")).sendKeys("M");
    element(by.model("startrekctrl.newChar.rank")).sendKeys("Lt. Commander");
    element(by.model("startrekctrl.newChar.weapon")).sendKeys("Battleth");
    element(by.model("startrekctrl.newChar.power")).sendKeys("9");
    element(by.model("startrekctrl.newChar.ship")).sendKeys("Defiant");
    element(by.id("create-st-char")).click();
    charSpan = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charSpan.getText().then((text) => {
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

  it("battles a Star Trek and Star Wars character", () => {
    browser.get("http://localhost:5000");
    element(by.id("fight")).click();
    element(by.binding("battlectrl.result")).getText().then((text) => {
      expect(text).toEqual("Worf defeats Leia Organa with a Battleth!");
    });
  });

  it("updates a Star Trek character", () => {
    var charEl;
    var charLi;
    var charEditBtn;
    var charUpdateBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in startrekctrl.chars").row(0));
    charEditBtn = charLi.element(by.buttonText("Edit"));
    charEditBtn.click();
    element(by.model("char.name")).clear().sendKeys("Deanna Troi");
    element(by.model("char.gender")).clear().sendKeys("F");
    element(by.model("char.rank")).clear().sendKeys("Commander");
    element(by.model("char.weapon")).clear().sendKeys("Phaser");
    element(by.model("char.power")).clear().sendKeys("5");
    element(by.model("char.ship")).clear().sendKeys("Enterprise");
    charUpdateBtn = charLi.element(by.buttonText("Update"));
    charUpdateBtn.click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Deanna Troi | Gender: F | Rank: Commander | Weapon: Phaser | Power: 5 | Ship: Enterprise"
      );
    });
  });

  it("updates a Star Wars character", () => {
    var charEl;
    var charLi;
    var charEditBtn;
    var charUpdateBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in starwarsctrl.chars").row(0));
    charEditBtn = charLi.element(by.buttonText("Edit"));
    charEditBtn.click();
    element(by.model("char.name")).clear().sendKeys("Chewbacca");
    element(by.model("char.gender")).clear().sendKeys("M");
    element(by.model("char.weapon")).clear().sendKeys("Bowcaster");
    element(by.model("char.power")).clear().sendKeys("9");
    element(by.model("char.planet")).clear().sendKeys("Kashyyyk");
    charUpdateBtn = charLi.element(by.buttonText("Update"));
    charUpdateBtn.click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Chewbacca | Gender: M | Weapon: Bowcaster | Power: 9 | Planet: Kashyyyk"
      );
    });
  });

  it("cancels a Star Trek character update", () => {
    var charEl;
    var charLi;
    var charEditBtn;
    var charCancelBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in startrekctrl.chars").row(0));
    charEditBtn = charLi.element(by.buttonText("Edit"));
    charEditBtn.click();
    element(by.model("char.name")).clear().sendKeys("Tribble");
    element(by.model("char.gender")).clear().sendKeys("N/A");
    element(by.model("char.rank")).clear().sendKeys("N/A");
    element(by.model("char.weapon")).clear().sendKeys("Fur");
    element(by.model("char.power")).clear().sendKeys("2");
    element(by.model("char.ship")).clear().sendKeys("N/A");
    charCancelBtn = charLi.element(by.buttonText("Cancel"));
    charCancelBtn.click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Deanna Troi | Gender: F | Rank: Commander | Weapon: Phaser | Power: 5 | Ship: Enterprise"
      );
    });
  });

  it("cancels a Star Wars character update", () => {
    var charEl;
    var charLi;
    var charEditBtn;
    var charCancelBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in starwarsctrl.chars").row(0));
    charEditBtn = charLi.element(by.buttonText("Edit"));
    charEditBtn.click();
    element(by.model("char.name")).clear().sendKeys("Padme Amidala");
    element(by.model("char.gender")).clear().sendKeys("F");
    element(by.model("char.weapon")).clear().sendKeys("Blaster Pistol");
    element(by.model("char.power")).clear().sendKeys("6");
    element(by.model("char.planet")).clear().sendKeys("Naboo");
    charCancelBtn = charLi.element(by.buttonText("Cancel"));
    charCancelBtn.click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toEqual(
        "Chewbacca | Gender: M | Weapon: Bowcaster | Power: 9 | Planet: Kashyyyk"
      );
    });
  });

  it("removes a Star Trek character", () => {
    var charLi;
    var charDelBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in startrekctrl.chars").row(0));
    charDelBtn = charLi.element(by.buttonText("Delete"));
    charDelBtn.click();
    charLi = element(by.repeater("char in startrekctrl.chars").row(0));
    expect(charLi.isPresent()).toBe(false);
  });

  it("removes a Star Wars character", () => {
    var charLi;
    var charDelBtn;

    browser.get("http://localhost:5000");
    charLi = element(by.repeater("char in starwarsctrl.chars").row(0));
    charDelBtn = charLi.element(by.buttonText("Delete"));
    charDelBtn.click();
    charLi = element(by.repeater("char in starwarsctrl.chars").row(0));
    expect(charLi.isPresent()).toBe(false);
  });

  it("asks a user to add a Star Trek and Star Wars character", () => {
    browser.get("http://localhost:5000");
    element(by.id("fight")).click();
    element(by.binding("battlectrl.result")).getText().then((text) => {
      expect(text).toEqual("Please add at least one Star Trek and one Star Wars character!");
    });
  });
});
