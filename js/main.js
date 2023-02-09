//Grab a couple of things
const section = document.querySelector("section");
const playLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playLivesCount.textContent = playerLives;


//Generate the data
const getData = () => [//16개의 객체가 있는 배열
    { imgSrc: "./images/basterds.jpg", name:"basterds"},
    { imgSrc: "./images/gravity.jpg", name:"gravity"},
    { imgSrc: "./images/harrypotter.jpg", name:"harrypotter"},
    { imgSrc: "./images/joker.jpg", name:"joker"},
    { imgSrc: "./images/kingkong.jpg", name:"kingkong"},
    { imgSrc: "./images/lalaland.jpg", name:"lalaland"},
    { imgSrc: "./images/titanic.jpg", name:"titanic"},
    { imgSrc: "./images/hollywood.jpg", name:"hollywood"},
    { imgSrc: "./images/basterds.jpg", name:"basterds"},
    { imgSrc: "./images/gravity.jpg", name:"gravity"},
    { imgSrc: "./images/harrypotter.jpg", name:"harrypotter"},
    { imgSrc: "./images/joker.jpg", name:"joker"},
    { imgSrc: "./images/kingkong.jpg", name:"kingkong"},
    { imgSrc: "./images/lalaland.jpg", name:"lalaland"},
    { imgSrc: "./images/titanic.jpg", name:"titanic"},
    { imgSrc: "./images/hollywood.jpg", name:"hollywood"},
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(()=> Math.random() - 0.5);              
    /* 
    Math.random()는 0이상 1미만의 숫자를 리턴합니다. 
    (Math.random() - 0.5)는 무작위로 음수, 양수, 0을 리턴하게 됩니다. 
    sort()는 음수, 양수, 0의 결과 값에 따라 정렬을 합니다. 
    무작위로 리턴된 결과값이기 때문에 정렬도 무작위로 정렬됩니다.
    */

   return cardData;
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach((item, index) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name); //속성이름과 값을 설정
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });

        //카드 잠깐 보여줬다 뒤집기
        setTimeout(()=>{ //초반 카드 공개
            card.classList.add('toggleCard');
            card.style.pointerEvents = "none";
        }, 1000 + 100 * index); //게임 시작 1초 뒤, 1.1초, 1.2초 ... 카드가 시간차를 두고 뒤집히게 하기

        setTimeout(()=>{ //카드 감추기
            document.querySelectorAll('.card').forEach((card) => {
                card.classList.remove('toggleCard');
                card.style.pointerEvents = "all";
            });
        }, 5000);

    });
}

//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped'); //모든 요소를 배열로 가져오는 메서드
    const toggleCard = document.querySelectorAll(".toggleCard");
    //Logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            //매치하면 실행할 코드
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = "none";
                //클릭 방지
            });
        }else{
            //매치하지 않으면 실행할 코드
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            //플레이 수명
            playerLives--;
            playLivesCount.textContent = playerLives;
            if(playerLives === -1){
                restart("try again");
            }
        }
    }
    //Run a check to see if we won the game
    setTimeout(()=>{
        if (toggleCard.length === 16){
            restart("you won");
        }
    },1000)
}

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none" //게임이 완전히 재설정될 때까지 아무 것도 클릭할 수 없음
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        //Randomize
        setTimeout(()=>{
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc; //새로 시작하면 이미지 랜덤
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all"
        }, 1000)//1초 세팅 후 다시 업데이트
    });
    playerLives = 6;
    playLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text),100);

    
}

cardGenerator();