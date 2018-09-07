let path = require('path');
let fs = require('fs');

let s2p_list = fs.readFileSync('data/200html_sid2photostream.json');

let s2t_list0 = fs.readFileSync('data/crcn_splits/crcn_spl_0.json');
let s2t_list1 = fs.readFileSync('data/crcn_splits/crcn_spl_1.json');
let s2t_list2 = fs.readFileSync('data/crcn_splits/crcn_spl_2.json');
let s2t_list3 = fs.readFileSync('data/crcn_splits/crcn_spl_3.json');
let s2t_list4 = fs.readFileSync('data/crcn_splits/crcn_spl_4.json');


let s2p = JSON.parse(s2p_list);

let s2t_0 = JSON.parse(s2t_list0);
let s2t_1 = JSON.parse(s2t_list1);
let s2t_2 = JSON.parse(s2t_list2);
let s2t_3 = JSON.parse(s2t_list3);
let s2t_4 = JSON.parse(s2t_list4);
let story_key_list0 = Object.keys(s2t_0);
let story_key_list1 = Object.keys(s2t_1);
let story_key_list2 = Object.keys(s2t_2);
let story_key_list3 = Object.keys(s2t_3);
let story_key_list4 = Object.keys(s2t_4);


// keep it random since I'm not capable of counting the posted storyids to here. 
// (i.e. people can hit F5 for no reason and it would ruin the routine if I set this 5 by 5 loading)
let choose = (items) => {
    let index = Math.floor(Math.random() * items.length);
    return items[index];
};

exports.get_random_item = () => {
    let index0 = choose(story_key_list0);
    let index1 = choose(story_key_list1);
    let index2 = choose(story_key_list2);
    let index3 = choose(story_key_list3);
    let index4 = choose(story_key_list4);
    
    let photos0 = s2p[index0];
    let photos1 = s2p[index1];
    let photos2 = s2p[index2];
    let photos3 = s2p[index3];
    let photos4 = s2p[index4];

    photos0 = photos0.map((p_id) => {
        return 'http://localhost:3000/images/test/' + p_id + '.jpg'});
    photos1 = photos1.map((p_id) => {
        return 'http://localhost:3000/images/test/' + p_id + '.jpg'});
    photos2 = photos2.map((p_id) => {
        return 'http://localhost:3000/images/test/' + p_id + '.jpg'});
    photos3 = photos3.map((p_id) => {
        return 'http://localhost:3000/images/test/' + p_id + '.jpg'});
    photos4 = photos4.map((p_id) => {
        return 'http://localhost:3000/images/test/' + p_id + '.jpg'});
    
    let story0 = s2t_0[index0];
    let story1 = s2t_1[index1];
    let story2 = s2t_2[index2];
    let story3 = s2t_3[index3];
    let story4 = s2t_4[index4];

    return [[photos0, story0, index0], 
            [photos1, story1, index1], 
            [photos2, story2, index2], 
            [photos3, story3, index3], 
            [photos4, story4, index4]];  
                                    //photos is stream of 5 photo ids 
                                    //story is normalized text
                                    //index is sid
};

