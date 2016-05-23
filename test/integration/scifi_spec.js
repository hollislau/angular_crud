describe("Scifi client", () => {
  it("creates a Star Trek character", () => {
    var charEl;
    var stCreateForm = element(by.id("st-create-form"));

    browser.get("http://localhost:5000");
    stCreateForm.element(by.model("stchar.name")).sendKeys("Worf");
    stCreateForm.element(by.model("stchar.gender")).sendKeys("M");
    stCreateForm.element(by.model("stchar.rank")).sendKeys("Lt. Commander");
    stCreateForm.element(by.model("stchar.weapon")).sendKeys("Battleth");
    stCreateForm.element(by.model("stchar.power")).sendKeys("9");
    stCreateForm.element(by.model("stchar.ship")).sendKeys("Defiant");
    stCreateForm.element(by.buttonText("Create")).click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
        "Worf | Gender: M | Rank: Lt. Commander | Weapon: Battleth | Power: 9 | Ship: Defiant"
      );
    });
  });

  it("creates a Star Wars character", () => {
    var charEl;
    var swCreateForm = element(by.id("sw-create-form"));

    browser.get("http://localhost:5000");
    swCreateForm.element(by.model("swchar.name")).sendKeys("Leia Organa");
    swCreateForm.element(by.model("swchar.gender")).sendKeys("F");
    swCreateForm.element(by.model("swchar.weapon")).sendKeys("Sporting Blaster Pistol");
    swCreateForm.element(by.model("swchar.power")).sendKeys("7");
    swCreateForm.element(by.model("swchar.planet")).sendKeys("Alderaan");
    swCreateForm.element(by.buttonText("Create")).click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
        "Leia Organa | Gender: F | Weapon: Sporting Blaster Pistol | Power: 7 | Planet: Alderaan"
      );
    });
  });

  it("battles a Star Trek and Star Wars character", () => {
    browser.get("http://localhost:5000");
    element(by.id("fight")).click();
    element(by.binding("battlectrl.result")).getText().then((text) => {
      expect(text).toBe("Worf defeats Leia Organa with a Battleth!");
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
    charLi.element(by.model("stchar.name")).clear().sendKeys("Deanna Troi");
    charLi.element(by.model("stchar.gender")).clear().sendKeys("F");
    charLi.element(by.model("stchar.rank")).clear().sendKeys("Commander");
    charLi.element(by.model("stchar.weapon")).clear().sendKeys("Phaser");
    charLi.element(by.model("stchar.power")).clear().sendKeys("5");
    charLi.element(by.model("stchar.ship")).clear().sendKeys("Enterprise");
    charUpdateBtn = charLi.element(by.buttonText("Update"));
    charUpdateBtn.click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
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
    charLi.element(by.model("swchar.name")).clear().sendKeys("Chewbacca");
    charLi.element(by.model("swchar.gender")).clear().sendKeys("M");
    charLi.element(by.model("swchar.weapon")).clear().sendKeys("Bowcaster");
    charLi.element(by.model("swchar.power")).clear().sendKeys("9");
    charLi.element(by.model("swchar.planet")).clear().sendKeys("Kashyyyk");
    charUpdateBtn = charLi.element(by.buttonText("Update"));
    charUpdateBtn.click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
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
    charLi.element(by.model("stchar.name")).clear().sendKeys("Tribble");
    charLi.element(by.model("stchar.gender")).clear().sendKeys("N/A");
    charLi.element(by.model("stchar.rank")).clear().sendKeys("N/A");
    charLi.element(by.model("stchar.weapon")).clear().sendKeys("Fur");
    charLi.element(by.model("stchar.power")).clear().sendKeys("2");
    charLi.element(by.model("stchar.ship")).clear().sendKeys("N/A");
    charCancelBtn = charLi.element(by.buttonText("Cancel"));
    charCancelBtn.click();
    charEl = element(by.repeater("char in startrekctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
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
    charLi.element(by.model("swchar.name")).clear().sendKeys("Padme Amidala");
    charLi.element(by.model("swchar.gender")).clear().sendKeys("F");
    charLi.element(by.model("swchar.weapon")).clear().sendKeys("Blaster Pistol");
    charLi.element(by.model("swchar.power")).clear().sendKeys("6");
    charLi.element(by.model("swchar.planet")).clear().sendKeys("Naboo");
    charCancelBtn = charLi.element(by.buttonText("Cancel"));
    charCancelBtn.click();
    charEl = element(by.repeater("char in starwarsctrl.chars").row(0).column("char.name"));
    charEl.getText().then((text) => {
      expect(text).toBe(
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
      expect(text).toBe("Please add at least one Star Trek and one Star Wars character!");
    });
  });
});
