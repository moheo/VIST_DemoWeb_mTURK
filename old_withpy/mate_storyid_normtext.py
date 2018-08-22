#-*- coding: utf-8 -*-

# storyID: normalized_story

import json
import numpy as np
import pickle as pkl

def mate(mate_dict,subm_story_list, storyid2photos_dict, storyID): # storyID is 5digit number, str
    photostream_list = storyid2photos_dict[str(storyID)]
    for storyelem in subm_story_list:
        if storyelem["photo_sequence"] == photostream_list:
            mate_dict[str(storyID)] = storyelem["story_text_normalized"]
    return None 

with open("example_submission_file.test.json", "rb") as ex_sub, open("test.storyid2photos_list.json", "r") as id2stream:
    ex_subm_dict = json.load(ex_sub)
    storyid2photos_dict = json.load(id2stream)
    subm_story_list = ex_subm_dict["output_stories"]
print(len(subm_story_list))

mate_dict = dict()  # storyID range for testset is 45530 to 50583 (both end included)
# {storyID: "normalized story text comes here", ...}
for i in range(45530 , 50584):
    mate(mate_dict, subm_story_list, storyid2photos_dict, i)

print(len(mate_dict))
with open("test.storyid2txt.pkl", "wb") as f:
    pkl.dump(mate_dict, f)

with open("test.storyid2txt.pkl", "rb") as fpkl, open("test.storyid2txt.json", "w") as fjson:
    pkl_data = pkl.load(fpkl)
    json.dump(pkl_data, fjson, ensure_ascii=True, indent=4)