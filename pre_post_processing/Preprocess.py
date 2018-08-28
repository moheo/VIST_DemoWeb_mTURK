# this is class - oriented version of preprocessing_prototype.ipynb

'''
*argv
def function(*argv):
    ...

a = (1,2,3) --> function(a)     arg1: 1
                                arg2: 2
                                arg3: 3

def function(**kwargs):
    ...

a = {"key1": 3,"key3": 1, "key2: 2} --> function(a)     "key1": 3
                                                        "key2": 2
                                                        "key3": 1
'''
#import argparse
import json
from pathlib import Path as p

'''
note that # storyid ~5053  and  # photostream ~2019 which implies "2.5 sid / ps"

we need
test.sis.json path
sid2ps.json path (make it by your hand)
                            ^^^^^^^^^^
htmldir
resultdir dir for saving resulted jsons
modelout_path: modelout in example submission format to be parsed according to the html numbers
(../old_withpy/example_sub_format_in_a_glance.json)
nunspl: number of splits to be made (need to divide 200!)

'''

#class opt:

class Prep:
    # calling class method (self.method) inside __init__() is OK.
    def __init__(self, *args): 
        super().__init__()
        
        #for preparing html extraction of photosequences, storyIDs, normtxts
        self.testsis_path = testsis_path
        self.sid2ps_path = sid2ps_path

        with open(self.testsis_path, "r") as f_ts, \
            open(self.sid2ps_path, "r") as f_s2p,  \
            open("{}/testset_sid2normtxt.json".format(resultdir), "w") as fw_ts2txt_all, \
            open("{}/200html_sid2photostream.json".format(resultdir), "w") as fw_ps, \
            open("{}/200html_sid2norm_txt.json".format(resultdir), "w") as fw_nt:
            
            # work here
            self.testsis = json.load(f_ts)
            self.s2p = json.load(f_s2p)
            self.s2nt = self.storyID2normtxt(self.testsis['annotations'])
            json.dump(self.s2nt, fw_ts2txt_all)
            
            self.self.htmldir = self.htmldir
            self.html_storyids_list = self.get_storyid_from_htmls(self)
            self.h_sid2ps, self.h_sid2nt = self.html_sids2ps_n_nt(self)
            json.dump(self.h_sid2ps, fw_ps)
            json.dump(self.h_sid2nt, fw_nt)

        #for spliting and parsing according to prep(200 htmls) above
        self.modelname = modelout_p.split("/")[-1].split(".json")[0]
        self.resultdir = resultdir
        self.spldir = "{rd}/{modelname}_splits/".format(rd=self.resultdir, spldir=self.modelname)
        self.numspl = numspl
        if not p.is_dir(self.spldir):
            p.mkdir(self.spldir, parents = True)
        
        with open(modelout_path, "r") as f_modelout,\
            open("{res}/200_{modelname}_normtxt.json".format(res=self.resultdir, modelname=self.modelname), 'w' ) as fw_m_whole:            
            self.modelout = json.load(f_modelout)
            self.model_normtxt = self.modelout_sid2normtxt(self)
            json.dump(self.model_normtxt, fw_m_whole)

        

    
    def storyID2normtxt(self):
        storyID2normtxt_dict = {}
        storyID = self.testsis[0][0]['story_id'] #init storyID
        sen_list = []
        for entity in self.testsis:
            if storyID != entity[0]['story_id']:
                #add to dict
                norm_txt = " ".join(sen_list) # concat sentences in the list with whitespace as a delim
                storyID2normtxt_dict[storyID] = norm_txt
                #renew sid, sen_list
                storyID = entity[0]['story_id'] 
                sen_list = [] 
            #general behavior for gathering sentences 
            sentence = entity[0]['text']    
            sen_list.append(sentence) 
        return storyID2normtxt_dict

    def what_storyID(self, ps): #ps, self.s2p): # working good 
        index = list(self.s2p.values()).index(ps) # if there is no ps in the values, it raises error "ps is not in the list"
        story_id = list(self.s2p.keys())[index] 
        
        return story_id

    # parses html names into photoids, and make list of lists with each of them includes 5 photos
    def htmls2ps(self):
        ps_list = []
        for html_name in os.listdir(self.htmldir):
            splited = html_name.split('-')
            ps = splited[:5]
            ps_list.append(ps)
        return ps_list


    # returns storyids from unique ps. 
    ### note that if you are targeting storyIDs sharing the same photosequence it wouldnt work as you expects
    ### 200 htmls has 200 distinct ps's thus it's ok to use it.
    def get_storyid_from_htmls(self):
        html_sid_list = []
        ps_list = self.htmls2ps(self.htmldir) # make ps_list (that is shape of (200 , 5) in pytorch style)
        for ps in ps_list: # check whether ps in ps_list is in testset 
            sid = self.what_storyID(ps, self.s2p)
            html_sid_list.append(sid)
        return html_sid_list 

    # returns 200 html storyID: [pid0, pid1, pid2, pid3, pid4] formed dict
    def html_sids2ps_n_nt(self):
        html_sids2ps_dict = {}
        html_sids2nt_dict = {} 
        for sid in self.html_storyids_list:
            html_sids2ps_dict[sid] = self.s2p[sid]
            html_sids2nt_dict[sid] = self.s2nt[sid]
        return html_sids2ps_dict, html_sids2nt_dict 

    def modelout_sid2normtxt(self):
        #self.html_storyids_list, self.modelout, self.h_sid2ps):
        modelout_sid2normtxt = {}
        for sid in self.html_storyids_list:
            ps = self.h_sid2ps[sid]
            for entry in self.modelout['output_stories']:
                if ps == entry['photo_sequence']:
                    modelout_sid2normtxt[sid] = entry['story_text_normalized']
        return modelout_sid2normtxt

    def split_normtxt(self):
        print("split model:{modelname} into {k} splits".format(modelname=self.modelname, k=self.numspl))
        print("to be saved at {res}".format(self.resultdir))
        keys200 = list(self.modelout_normtxt.keys())
        keysplits = [ keys200[20*i:20*(i+1)] for i in range(self.numspl) ]

        model_dicts_list = []
        for keys in keysplits: # keys = [pid0 ~ 4]
            stories = [self.modelout_normtxt[key] for key in keys] # key = pid itself
            model_dicts_list.append(dict(zip(keys,stories))) # dict,zip returns len=20 dict. list of k dicts of 200//k entries (k need to divide 200 w/o residual)

        for i in range(self.numspl):
            with open("{spldir}/{mname}_normtxt_spl_{idx}.json".format(spldir= self.spldir, 
                                                                        mname=self.modelname, 
                                                                        idx=i), "w") as fw:
                json.dump(model_dicts_list[i], fw)


    def run_prep(self):
        if 200%self.numspl != 0:
            exit("numspl need to divide 200!")
        for file in [self.testsis_path, self.modelout_path]:
            if not p.is_file(file):
                exit("{file} doesnt exist".format(file))
        
        for directory in [self.htmldir, self.resultdir]
            if not p.is_dir(directory):
                exit("{dir} doesnt exist".format(directory))
        

if __name__ == "__main__":