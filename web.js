const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // abre a pagina do discord 
  await page.goto('https://discord.com/login');
  await new Promise((resolve, reject) => {
    setTimeout(resolve,1000)
  })
  // clica para colocar o email e senha 
  await page.type('[name=email]','dedcruguer11@gmail.com');
  await page.type('[name=password]','rioteumudei1');
// clicar para entrar 
  await page.keyboard.press("Enter")
  await new Promise((resolve, reject) => {
    setTimeout(resolve,1000)
  })
  await page.goto('https://discord.com/channels/771874706534039552/771911611673083945')
  await new Promise((resolve, reject) => {
    setTimeout(resolve,1000)
  })

  await page.click()
  

//   await browser.close();
})();