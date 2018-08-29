let path = require('path');
let fs = require('fs');

let s2p_list = fs.readFileSync('data/200html_sid2photostream.json');
let s2t_list = fs.readFileSync('data/glacnet_splits/glac_normtxt_spl_1.json');
/*s2p directory: as shown above. all same for containers (random key is extraced from s2t)
s2t directory:
    
container 0:    data/{modelname}_splits/{modelname}_normtxt_spl_0.json
container 1:    data/{modelname}_splits/{modelname}_normtxt_spl_1.json
                ...
                ..
                .
container 9:    data/{modelname}_splits/{modelname}_normtxt_spl_9.json

*/
let s2p = JSON.parse(s2p_list);
let s2t = JSON.parse(s2t_list);
let story_key_list = Object.keys(s2t);

let choose = (items) => {
    let index = Math.floor(Math.random() * items.length);
    return items[index];
};

exports.get_random_item = () => {
    let index = choose(story_key_list);
    let photos = s2p[index];

    photos = photos.map((p_id) => {
        return 'http://147.46.216.59:32963/images/test/' + p_id + '.jpg'
    });
    let story = s2t[index];

    return [photos, story, index];  //photos is stream of 5 photo ids 
                                    //story is normalized text
                                    //index is s
};

