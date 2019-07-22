class Card {
    constructor(symbol) {
        this.symbol = symbol;
        this.rocket = `<i class="fas fa-rocket"></i>`
        this.axe = `<i class="fas fa-axe-battle"></i>`
        this.ghost = `<i class="fas fa-ghost"></i>`
        this.cloud = `<i class="fas fa-clouds"></i>`
        this.pepper = `<i class="fas fa-pepper-hot"></i>`
        this.danger = `<i class="fas fa-exclamation-triangle"></i>`
        this.acorn = `<i class="fas fa-acorn"></i>`
        this.clock = `<i class="fas fa-alarm-clock"></i>`
        this.apple = `<i class="fab fa-apple"></i>`
        this.el = `<div class="soloCard"><div class="front"></div><div class="back">${this.symbol}</div></div>`
    }
}
class Deck {
    constructor() {
        this.pack = []
    }
    createPack() {
        const symbols = ['rocket', 'axe', 'ghost', 'cloud', 'pepper', 'danger', 'acorn', 'clock', 'apple']
        symbols.forEach(item => {
            this.pack.push(new Card(item))
            this.pack.push(new Card(item))
        })
    }
    populate(el) {
        const html = this.pack.map(card => {
            if (card.symbol == "rocket") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.rocket}</div></div>`
            } else if(card.symbol == "axe") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.axe}</div></div>`
            } else if(card.symbol == "ghost") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.ghost}</div></div>`
            } else if(card.symbol == "cloud") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.cloud}</div></div>`
            } else if(card.symbol == "pepper") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.pepper}</div></div>`
            } else if(card.symbol == "danger") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.danger}</div></div>`
            } else if(card.symbol == "acorn") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.acorn}</div></div>`
            } else if(card.symbol == "clock") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.clock}</div></div>`
            } else if(card.symbol == "apple") {
                card.el = `<div class="soloCard"><div class="front"></div><div class="back">${card.apple}</div></div>`
            }
            return card.el
        }).join('')
        el.innerHTML = html
    }
    shuffle() {
        var j, x, i;
        for(i = this.pack.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i+1));
            x= this.pack[i];
            this.pack[i] = this.pack[j];
            this.pack[j] = x
        }
    }
}

function updateLives() {
    liveHTML = ''
    for (i=0;i < lives;i++) {
        liveHTML += '♥'
    }
    $(".lives").html(liveHTML);
    if (lives == 0) {
        $(".cards").hide();
    $(".timer").hide();
    $(".lives").hide();
    $("#liveOver").fadeIn();
    }
}
timer = 59
/*Hide everything until they click play*/
$(".cards").hide();
$(".timer").hide();
$(".lives").hide();
$("#liveOver").hide();
$("#gameOver").hide();
$("#playNow").hide();
$("#playNow").slideDown();

$("#playNow").on('click', function(e) {
setInterval(function(){
    $(".timer").html(`<p>0:${timer}</p>`)
    timer -= 1
    if (timer == 0) {
        $(".cards").hide();
    $(".timer").hide();
    $(".lives").hide();
    $("#gameOver").fadeIn();
    }
}, 1000)
$("#playNow").slideUp();
$(".cards").fadeIn();
$(".timer").fadeIn();
$(".lives").fadeIn();
})
isFlipped = 0;
uno = null;
dos = null;
lives = 10;
updateLives()
var deck = new Deck()
deck.createPack()
deck.shuffle()
console.log(deck)
var cards = document.querySelector('.cards')
deck.populate(cards)
$(".soloCard").flip({
    trigger: 'click'
}).on('click', function () {
    isFlipped++
    if (isFlipped == 2) {
        uno = $(this)
    } else {
        dos = $(this)
    }
    if (uno != null && dos != null) {
        if (uno.html() == dos.html()) {
            console.log("its a match")
            isFlipped = 0
            uno = null;
            dos = null;
        } else {
            var one = uno
            var two = dos
            uno = null
            dos = null
            isFlipped = 0
            lives -= 1
            updateLives()
            setTimeout(function () {
                one.flip(false)
                two.flip(false)
            }, 700);
        }
    }
});