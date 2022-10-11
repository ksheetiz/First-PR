imgpath = "C:/MINI_PROJECT_6/Bidding_System/Auction_Items/"

item1des = "Audi elite and one of the most formidable machines ever built. Created in the world’s most demanding development laboratory: Motorsport. So you can expect nothing but the best from it in terms of performance. If money is not a constraint for you, then the price tag should seem justifiable for the deliciously appointed R8 that can be parked at your garage.";

item2des = "The above coin may look like a normal circulated coin. A look at the date and we see 1996; but Subhash Chandra Bose, also known as Netaji, was born in 1897 and his centenary was completed in 1997. The Calcutta mint released a small quantity of Bose centenary coins in 1996, making the above coin a rare one. The date on the coin is the error. This one is quite pricey even in the shown condition, and the current price is shooting up like anything because it is not available at any place.";

item3des = "This poster belongs to Batman: Arkham Origins Game. Batman: Arkham Origins is a 2013 action-adventure game developed by WB Games Montréal and published by Warner Bros. Interactive Entertainment. Based on the DC Comics superhero Batman.";

item4des = "This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively selfcontained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming.";

item5des = "The Ferrari 458 Italia is a mid-engine sports car produced by Ferrari. In Ferrari's first official announcement of the car, the 458 was described as the successor to the F430 but arising from an entirely new design, incorporating technologies developed from the company's experience in Formula One.";

item6des = "Computer systems: A Programmer’s Perspective explains the underlying elements common among all computer systems and how they affect general application performance. Written from the programmer’s perspective, this book strives to teach students how understanding basic elements of computer systems and executing real practice can lead them to create better programs. Spanning across computer science themes such as hardware architecture, the operating system and systems software, the Third Edition serves as a comprehensive introduction to programming.";


let Images = [imgpath+"audi.jpg", imgpath+"rarecoin.jpg", imgpath+"batman.png", imgpath+"AlgoCormen.jpg", imgpath+"Ferrari.jpg", imgpath+"CSAPP.jpg"];

let titles = ["Audi R8", "Two rupee rare coin", "Batman Poster", "Introduction to Algorithms", "Ferrari 458 Italia", "Computer Systems: APP"];

let subtitles = ["Audi R8", "Two rupee rare coin", "Batman Poster", "Introduction to Algorithms (E.E Edition)", "Ferrari", "Computer Systems: A Programmer's Perspective"];

let details = [item1des, item2des, item3des, item4des, item5des, item6des];
let Prices = [5000000, 35000, 1200, 550, 7500000, 799];
let endTimes = []; 

let startPrices = [];
for (let i = 0; i < Prices.length; i++) {
  let now = new Date();
  let endTime = new Date().setHours(8 + i, 0, 0, 0);
  if (endTime - now < 0) {
    endTime = new Date(endTime).setDate(now.getDate() + 1);
  }
  endTimes.push(endTime);
  startPrices.push({
    bid0: {
      bidder: String(i),
      amount: Prices[i],
      time: Date().substring(0, 24),
    },
  });
}

// Convert time to string for HTML clocks
function timeBetween(start, end) {
  let _string = "";
  let secsRemaining = (end - start) / 1000;
  let d = parseInt(secsRemaining / 86400);
  let h = parseInt((secsRemaining % 86400) / 3600);
  let m = parseInt((secsRemaining % 3600) / 60);
  let s = parseInt(secsRemaining % 60);
  if (d) {
    _string = _string + d + "d ";
  }
  if (h) {
    _string = _string + h + "h ";
  }
  if (m) {
    _string = _string + m + "m ";
  }
  if (s) {
    _string = _string + s + "s ";
  }
  return _string.trim();
}

// Set time on HTML clocks
function setClocks() {
  let now = new Date();
  let nowTime = now.getTime();
  for (i = 0; i < Prices.length; i++) {
    let timer = document.getElementById("time-left-" + i);
    if (endTimes[i] - nowTime < -300) {
      document.getElementById("auction-" + i).parentElement.style.display ="none";
      endTimes[i] = new Date(endTimes[i]).setDate(now.getDate() + 1); // add 1 day
      document.getElementById("auction-" + i).parentElement.remove();
      resetLive(i);
      resetStore(i);
      auctionGrid = document.getElementById("auction-grid");
      auctionCard = generateAuctionCard(i);
      auctionGrid.appendChild(auctionCard);
    } else if (endTimes[i] - nowTime < 0) {
      timer.innerHTML = "Auction Complete";
      document.getElementById("bid-button-" + i).setAttribute("disabled", "");
    } else {
      timer.innerHTML = timeBetween(nowTime, endTimes[i]);
    }
  }
  setTimeout(setClocks, 1000);
}

// Place a bid on an item
function placeBid() {
  let nowTime = new Date().getTime();
  let modalBidButton = document.querySelector(
    "#bid-modal > div > div > div.modal-footer > button.btn.btn-primary"
  );
  modalBidButton.setAttribute("disabled", "");
  let i = modalBidButton.id.match("[0-9]+");
  let feedback = document.getElementById("bad-amount-feedback");
  let amountElement = document.getElementById("amount-input");
  let amount = Number(amountElement.value);
  if (endTimes[i] - nowTime < 0) {
    feedback.innerText = "The auction is already over!";
    amountElement.classList.add("is-invalid");
    setTimeout(() => {
      bidModal.hide();
      amountElement.classList.remove("is-invalid");
      modalBidButton.removeAttribute("disabled", "");
    }, 1000);
  } else if (amount == 0) {
    feedback.innerText = "Please specify an amount!";
    amountElement.classList.add("is-invalid");
    modalBidButton.removeAttribute("disabled", "");
  } else if (!/^-?\d*\.?\d{0,2}$/.test(amount)) {
    feedback.innerText = "Please specify a valid amount!";
    amountElement.classList.add("is-invalid");
    modalBidButton.removeAttribute("disabled", "");
  } else {
    let user = auth.currentUser;
    let itemId = i.toString().padStart(5, "0");
    let liveRef = db.collection("live").doc("items");
    let storeRef = db.collection("store").doc(itemId);

    liveRef.get().then(function (doc) {
      console.log("Database read from placeBid()");
      let thisItem = doc.data()[itemId];
      let bids = (Object.keys(thisItem).length - 1) / 2;
      let currentBid = thisItem["bid" + bids];
      if (amount >= 1 + currentBid) {
        keyStem = itemId + ".bid" + (bids + 1);
        liveRef.update({
          [keyStem + "-uid"]: user.uid,
          [keyStem]: amount,
        });
        console.log("Database write from placeBid()");
        storeKey = "bid" + (bids + 1);
        storeRef.update({
          [storeKey]: {
            "bidder-username": user.displayName,
            "bidder-uid": user.uid,
            amount: amount,
            time: Date().substring(0, 24),
          },
        });
        console.log("Database write from placeBid()");
        amountElement.classList.add("is-valid");
        amountElement.classList.remove("is-invalid");
        setTimeout(() => {
          bidModal.hide();
          amountElement.classList.remove("is-valid");
          modalBidButton.removeAttribute("disabled", "");
        }, 1000);
      } else {
        amountElement.classList.add("is-invalid");
        feedback.innerText =
          "You must bid at least ₹" + (currentBid + 1).toFixed(2) + "!";
        modalBidButton.removeAttribute("disabled", "");
      }
    });
  }
}

function argsort(array) {
  const arrayObject = array.map((value, idx) => {
    return { value, idx };
  });
  arrayObject.sort((a, b) => a.value - b.value);
  return arrayObject.map((data) => data.idx);
}

 // create auction card
function generateAuctionCard(i) {

  let col = document.createElement("div");
  col.classList.add("col");

  let card = document.createElement("div");
  card.classList.add("card");
  card.id = "auction-" + i;
  col.appendChild(card);

  let image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src = Images[i];
  card.appendChild(image);

  let body = document.createElement("div");
  body.classList.add("card-body");
  card.appendChild(body);

  let title = document.createElement("h5");
  title.classList.add("title");
  title.innerText = titles[i];
  body.appendChild(title);

  let subtitle = document.createElement("p");
  subtitle.classList.add("card-subtitle");
  subtitle.innerText = subtitles[i];
  body.appendChild(subtitle);

  let statusTable = document.createElement("table");
  statusTable.classList.add("table");
  card.appendChild(statusTable);

  let tableBody = document.createElement("tbody");
  statusTable.appendChild(tableBody);

  let bidRow = document.createElement("tr");
  tableBody.appendChild(bidRow);

  let bidTitle = document.createElement("th");
  bidTitle.innerHTML = "Current bid:";
  bidTitle.scope = "row";
  bidRow.appendChild(bidTitle);

  let bid = document.createElement("td");
  bid.innerHTML = "₹-.-- [- bids]";
  bid.id = "current-bid-" + i;
  bidRow.appendChild(bid);

  let timeRow = document.createElement("tr");
  tableBody.appendChild(timeRow);

  let timeTitle = document.createElement("th");
  timeTitle.innerHTML = "Time left:";
  timeTitle.scope = "row";
  timeRow.appendChild(timeTitle);

  let time = document.createElement("td");
  time.id = "time-left-" + i;
  timeRow.appendChild(time);

  let buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group");
  card.appendChild(buttonGroup);

  let infoButton = document.createElement("button");
  infoButton.type = "button";
  infoButton.href = "#";
  infoButton.classList.add("btn", "btn-secondary");
  infoButton.innerText = "Info";
  infoButton.onclick = function () {
    openInfo(this.id);
  };
  infoButton.id = "info-button-" + i;
  buttonGroup.appendChild(infoButton);

  let bidButton = document.createElement("button");
  bidButton.type = "button";
  bidButton.href = "#";
  bidButton.classList.add("btn", "btn-primary");
  bidButton.innerText = "Submit bid";
  bidButton.onclick = function () {
    openBid(this.id);
  };
  bidButton.id = "bid-button-" + i;
  buttonGroup.appendChild(bidButton);

  return col;
}

function populateAuctionGrid() {
  auctionGrid = document.getElementById("auction-grid");
  let endingSoonest = argsort(endTimes);
  endingSoonest.forEach((i) => {
    auctionCard = generateAuctionCard(i);
    auctionGrid.appendChild(auctionCard);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dataListener() {
  db.collection("live")
    .doc("items")
    .onSnapshot(function (doc) {
      console.log("Database read from dataListener()");
      let data = doc.data();
      for (key in data) {
        let cb = document.getElementById("current-bid-" + Number(key));
        let bids = data[key];
        let bidCount = (Object.keys(bids).length - 1) / 2;
        let currPound = Number.parseFloat(bids["bid" + bidCount]).toFixed(2);
        if (auth.currentUser) {
          let userWinning =
            bids["bid" + bidCount + "-user"] == auth.currentUser.uid;
        }
        cb.innerHTML =
          "₹" +
          numberWithCommas(currPound) +
          " [" +
          bidCount +
          " bid" +
          (bidCount != 1 ? "s" : "") +
          "]";
      }
    });
}

function resetLive(i) {
  let docRef = db.collection("live").doc("items");
  let itemId = i.toString().padStart(5, "0");
  docRef.update({
    [itemId]: {
      bid0: startPrices[i]["bid0"]["amount"],
    },
  });
  console.log("Database write from resetLive()");
}

function resetAllLive() {
  console.log("Resetting live tracker");
  for (i = 0; i < Prices.length; i++) {
    resetLive(i);
  }
}

function resetStore(i) {
  let itemId = i.toString().padStart(5, "0");
  let docRef = db.collection("store").doc(itemId);
  docRef.set(startPrices[i]);
  console.log("Database write from resetStore()");
}

function resetAllStore() {
  console.log("Resetting auction storage");
  let batch = db.batch();
  for (i = 0; i < Prices.length; i++) {
    let itemId = i.toString().padStart(5, "0");
    let currentItem = db.collection("store").doc(itemId);
    batch.set(currentItem, startPrices[i]);
  }
  batch.commit();
  console.log(Prices.length + " database writes from resetAllStore()");
}

function resetAll() {
  resetAllLive();
  resetAllStore();
}
