var script = document.createElement('script');
script.src = "https://js.stripe.com/v3/";
document.head.appendChild(script);

//do stuff with the script
function buyNow(method, ele) {
    window.location.href = `/paypal.html?method=${method}&credit=${ele}`
}
var creditElement = $(".buycredit");
var buyCreditArr = creditElement.attr('data-buy-credit')
var subscribeArr = creditElement.attr('data-subscribe')
var creditModal = `
<form id="payment-form" style="display: none">
    <div id="payment-element">
    </div>
    <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
    </button>
    <div id="payment-message" class="hidden"></div>
</form>`
var buyNowCxt = "<div class='buy-now'><h5>Buy Andrew McBannister Weekly Tournament Credits</h5><div class='btn-group'>";
buyCreditArr.split(',').map((ele) => {
    buyNowCxt  = buyNowCxt + `<button onclick="buyNow(1, ${ele})">${ele} Credits<span class="sm-top">£${ele*5}</span></button>`
})
buyNowCxt = buyNowCxt + "</div></div>"
var subscribeCxt = "<div class='subscribe'><h5>Subscribe</h5><div class='btn-group'>";
subscribeArr.split(',').map((ele) => {
    subscribeCxt  = subscribeCxt + `<button onclick="buyNow(2, ${ele})">${ele} Credits £${ele*5}<span class="sm-top">/month</span></button>`
})
subscribeCxt = subscribeCxt + "</div></div>"
creditElement.append(buyNowCxt, subscribeCxt, creditModal)

// CSS Style
// $(".btn-group").css({'display':'flex'})
