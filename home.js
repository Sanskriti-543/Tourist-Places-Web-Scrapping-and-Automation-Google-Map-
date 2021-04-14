const puppy = require("puppeteer");

let places = ["Kolhapur ", "Rajgad Fort", "Ajanta Caves" , "Arthur Seat","Elephanta Caves" , "Gateway Of India" , "Daultabad Fort" , "Shivling Point" , "Louisa Point"];
    // Route2: ["Delhi", "Dharamshala", "Amritsar", "Rishikesh", "Delhi", "Jaipur", "Jaisalmer", "Jodhpur", "Udaipur", "Pushkar", "Agra ", "Varanasi"]

    let i;

async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });

    let page = await browser.newPage();
   
    await page.goto("https://www.google.com/maps");
    await page.waitForSelector("#searchboxinput" , { visible: true });
       let searchBox1 = await page.type('#searchboxinput', "Maharashtra Tourist Places");
       await page.keyboard.press("Enter");
       page.waitForNavigation({waitUntil: 'networkidle2' }),
       
       await delay(12000);
       
       await page.$('.section-layout.section-scrollbox.scrollable-y.scrollable-show.section-layout-flex-vertical.section-layout-inset-shadow')
       page.click("#sb_cb50");

    for ( i = 0; i < places.length; i++) {
       await page.waitForSelector("#searchboxinput" , { visible: true });
       let searchBox2 = await page.type('#searchboxinput', places[i]);
       await page.keyboard.press("Enter");
       await delay(2000);
       page.waitForNavigation({waitUntil: 'networkidle2' }),
       await page.waitForSelector(".section-subheader-header.gm2-subtitle-alt-1" , { visible: true });
       await delay(2000);
       await page.waitForSelector(".section-hero-header-image-hero.widget-pane-fading.widget-pane-fade-in.section-hero-header-image-hero-clickable" , {visible : true});
       await page.click('.section-hero-header-image-hero.widget-pane-fading.widget-pane-fade-in.section-hero-header-image-hero-clickable');
       await delay(3000);
       page.click(".widget-image-header-close.mapsConsumerUiCommonClosebutton__close-button-white");
       await page.waitForSelector("#searchboxinput" , { visible: true });
       await delay(1000);
       page.click("#sb_cb50");
       console.log(places[i]); 

       const details = await page.$$eval('div.ugiz4pqJLAG__text' , spans =>{
            return spans.map(span => span.innerText);
       });
       console.log(details);
       const ratings = await page.$$eval('.gm2-display-2' , spans =>{
        return spans.map(span => span.innerText);
   });
   console.log(ratings);
  
}

    browser.close()

}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

 main()