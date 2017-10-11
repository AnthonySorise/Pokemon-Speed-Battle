//****************************************View****************************************//

/***************************************************************************************************
 * card animation - card slides in and flips after start
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * button light - lights up buttons
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * start button - starts game, calls start game function in controller
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * displayWinVideo - shows a video of the winning pokemon
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function displayWinVideo(){

    this.displayVideo = function () {
        $(".modal-title").text("You won!"); // The text will be the name of the pokemon
        $("#video_display").attr('src', winner_video_link);
        $("#winner_modal").modal('show');
    };
    this.displayVideo();
}

/***************************************************************************************************
 * backgroundImage - adds a different background image
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function backgroundImage() {
    this.backgroundImageArray = [
        'images/639ff710788da2f05b1879a6cc5e1f2d.jpg',
        'images/Dahara_City.png',
        'images/Gaur Plains.png',
        'images/Michina_Town_2.jpg',
        'images/Pokemon-Sun-and-Moon-ALola-Map-Island-One.jpg',
        'images/pokemon_nature_in_kalos_region__from_s19_e4__by_theeaglefox-dax05hn.png',
        'images/Prof_Juniper_Lab_anime-696x392.jpg'
    ];
    this.randomIndex = function() {
        return Math.floor(Math.random()*this.backgroundImageArray.length)
    };
    this.imageToAddToBackground = function(){
        return this.backgroundImageArray[this.randomIndex()]
    };
    return this.imageToAddToBackground()
}

$('body').css('background-image', backgroundImage());
