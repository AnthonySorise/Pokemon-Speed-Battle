/***************************************************************************************************
 * grab pokemon api - gets the information from the pokemon api
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * grab card api - gets the information from the card api
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */
function Grab_data(){
    var self = this;
    this.make_pokemon_object = function(data){
        available_cards = data.cards;
    }
    this.failed_to_get_data = function(data){
        console.log('failed',data);
    }
    this.get_card_data = function(){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            dataType:'json',
            url:'https://api.pokemontcg.io/v1/cards?page=5&pageSize=1000',
            method: 'get',
            success:function(data){
                if(data !== undefined){
                    promise.resolve(data);
                }
            },
            error:function(data){
                promise.reject(data);
            }
        })//end call
        return promise;
    }//get get data
    this.random_number_gen = function(end_num){
        var number = Math.floor(Math.random()*end_num+1)
        return number;
    }
    this.make_pokemon = function(){
        var random_pick = this.random_number_gen(1000);
        var pokeData = {};
        var pokemon_card = available_cards[random_pick];
        pokeData.name = pokemon_card.name;
        pokeData.hp = pokemon_card.hp || false;
        pokeData.image = pokemon_card.imageUrl;
        pokeData.type = pokemon_card.types;
        pokeData.attack = this.pick_attack(pokemon_card.attacks);
        if(pokeData.hp === false || pokeData.attack === false){
            return this.make_pokemon();
        }
        else{
            return  pokeData;
        }
    }
    this.pick_attack = function(card_attack){
        if(card_attack===undefined){
            return false;
        }
        for(var i = 0; i<card_attack.length; i++){
            if(card_attack[i].damage !== "" && Number(card_attack[i].damage)){
                return card_attack[i].damage;
            }
            else{
                return 50;
            }
        }
    }//end pick attack
    this.random_number_gen = function(end_num){
        var number = Math.floor(Math.random()*end_num+1)
        return number;
    }
    this.make_pokemon = function(){
        var random_pick = this.random_number_gen(1000);
        var pokeData = {};
        var pokemon_card = available_cards[random_pick];
        pokeData.name = pokemon_card.name;
        pokeData.hp = pokemon_card.hp || false;
        pokeData.image = pokemon_card.imageUrl;
        pokeData.type = pokemon_card.types;
        pokeData.attack = this.pick_attack(pokemon_card.attacks);
        if(pokeData.hp === false || pokeData.attack===false){
            return this.make_pokemon();
        }
        return  pokeData;
    };
    this.pick_attack = function(card_attack){
        if(card_attack===undefined){
            return false;
        }
        for(var i = 0; i<card_attack.length; i++){
            if(card_attack[i].damage !== "" && Number(card_attack[i].damage)){
                return card_attack[i].damage
            }
            else{
                return false;
            }
        }
    }//end pick attack
    this.resolve_pokeDB = function(data,player){
        $(player).append('<ul>');
        for(var item in data){
            var thing_to_add = $('<li>').append(item + " : " + data[item]);
            $(player +' ul').append(thing_to_add);
        }
    }
    this.reject_pokeDB = function(data){
        console.log('error');
    }
    this.get_pokemonDB = function(pokemon,player){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            url: 'http://danielpaschal.com/pokeyproxy.php?name='+pokemon,
            dataType: 'text',
            success: function(data){
                var page = new DOMParser().parseFromString(data,'text/html');
                console.log('test text: ',page);
                var pokemonObj = {name: pokemon};
                var pokedataRows = $(page).find('.vitals-table tr');
                pokedataRows.each(function(){
                    var header = $(this).find('th').text();
                    var data = $(this).find('td').text();
                    pokemonObj[header] = data;
                });
                promise.resolve(pokemonObj,player)
            },
            error: function(data){
                promise.reject(data);
            }
        })
        return promise;
    }
}
// this.resolve_wiki = function(data,player){
//     var markup = data.parse.text["*"];
//     var i = $('<div></div>').html(markup);
//     // i[0].children[0].children[1].innerText;
//     // i.find('a').each(function(){ $(this).replaceWith($(this).html()); });
//     // i.find('sup').remove();
//     // i.find('.mw-ext-cite-error').remove();
//     // $(player).html($(i).find('p'));
//     $(player).html(i[0].children[0].children[1].innerText);
// }
// this.reject_wiki = function(data){
//     console.log('error');
// }
// this.get_wiki = function(name,player){
//     // var promise ={
//     //     then:function(resolve,reject){
//     //         this.resolve = resolve;
//     //         this.reject = reject;
//     //     }
//     // }
//     $.ajax({
//         url: "https://en.wikipedia.org/w/api.php",
//         data: {
//             format: "json",
//             action: "parse",
//             page: name,
//             prop:"text",
//             section:0,
//             origin:'*'
//         },
//         dataType: 'jsonp',
//         success: function (data) {
//             var markup = data.parse.text["*"];
//             var i = $('<div></div>').html(markup);
//             $(player).html(i[0].children[0].children[1].innerText);
//         },
//         error: function(data){
//             // promise.reject(data)
//             console.log('error')
//         }
//     });
//     // return promise;
// }
