# this is class - oriented version of 
#   preprocessing_prototype.ipynb
#   +mate_storyid_normtext.py
#   +extract_storyid2photoid.ipynb

import json
from pathlib import Path as p
from pathlib import PurePath as pp
import argparse 
import os

'''
note that # storyid ~5053  and  # photostream ~2019 which implies "2.5 sid / ps"

================================================================================
usage: 

python Preprocess.py [--testsis] [--sid2photoseq] [--result_dir] [--html_dir] [--modelout] [--numsplit]

or you can "from '../pre_post_processing/Preprocess' import *" 
and simply make use of 

    a = Prep()
    a.run_prep()

to run with default options
see codes at the bottom starting with 
    if __name__ == "__main__":   


description:

This code is designed for preprocessing 
    model_output.json, 
    htmls named with pids, and 
    storyID2photoseq.jsons
to prep
    ../webstorm_server/data/
        -200html_sid2photostream.json
        ../webstorm_server/data/{model_name}_splits/
            -{model_name}_normtxt_spl_0.json
            -
            -
            -{model_name}_normtxt_spl_k.json




params in detail:

'--testsis' testsis.json directory
'--sid2photoseq' storyID2photoseq.json directory, could be generated from Prep.storyID2ps() with test.sis.json(VIST) 
'--result_dir' preprocessed files stored here. presumably "**/webstorm_server/data"
'--html_dir' dir of html examples named with photoids from Kenneth Huang. need to be unzipped first 
            (https://github.com/windx0303/VIST-Challenge-NAACL-2018/tree/master/human_eval_interface)")
'--modelout' your model output with the same format as ../old_withpy/example_sub_format_in_a_glance.json
'--numsplit' number of splits for making {model_name}_normtxt_spl_k.json. need to divide 200.
==========================================================================================================================

'''

class Opt(argparse.ArgumentParser):
    def __init__(self, 
                 testsis_input= "/home/seonils/data_storage/VIST_DemoWeb_mTURK/pre_post_processing/test.story-in-sequence.json", 
                 sid2ps_input="/home/seonils/data_storage/VIST_DemoWeb_mTURK/pre_post_processing/test.storyid2photos_list.json", 
                 resultdir_input="/home/seonils/data_storage/VIST_DemoWeb_mTURK/webstorm_server/data/", 
                 htmldir_input="/home/seonils/data_storage/vist200web/www",
                 modelout_input="modeloutput path ",
                 numspl_input=5
                ):
        self.add_argument('--testsis' , help="path of [test.sis.json] file (VIST dataset)", \
                            dest=testsis_path, default= "/home/seonils/data_storage/VIST_DemoWeb_mTURK/pre_post_processing/test.story-in-sequence.json")
        self.add_argument('--sid2photoseq' , help="path of [storyID to photostream json] file (you have to make it your own)", \
                            dest=sid2ps_path, default= "/home/seonils/data_storage/VIST_DemoWeb_mTURK/pre_post_processing/test.storyid2photos_list.json")
        self.add_argument('--result_dir', help="preprocessed jsons ready for server use is stored here. If not exists, make it", \
                            dest=resultdir, default= "/home/seonils/data_storage/VIST_DemoWeb_mTURK/webstorm_server/data/" )
        self.add_argument('--html_dir', help="dir that \"this\" html files placed in your local, need to be unzipped first (https://github.com/windx0303/VIST-Challenge-NAACL-2018/tree/master/human_eval_interface)", \
                            dest=htmldir, default= "/home/seonils/data_storage/vist200web/www")
        self.add_argument('--modelout', help="model inference output need to be the same format as ../old_withpy/example_sub_format_in_a_glance.json", \
                            dest=modelout_path, default= "/home/seonils/data_storage/vist200web/www")
        self.add_argument('--numsplit', type=int , help="number of splits you want (splits sid:ps dict with 200 entries into k splits)", dest=numspl, default= 10)


class Prep(Opt):
    # calling class method (self.method) inside __init__() is OK.
    def __init__(self, opt): 
        super().__init__()
        
        # consider wrapping paths in __init__() with Path constructor and methods
        # .format need to use p.join
        # p.name

        # for preparing html extraction of photosequences, storyIDs, normtxts
        self.testsis_path = pp(opt.testsis_path)
        self.sid2ps_path = pp(opt.sid2ps_path)
        self.resultdir = pp(opt.resultdir)

        with open(self.testsis_path, "r") as f_ts, \
            open(self.sid2ps_path, "r") as f_s2p,  \
            open(self.resultdir / "/testset_sid2normtxt.json", "w") as fw_ts2txt_all, \
            open(self.resultdir / "/200html_sid2photostream.json", "w") as fw_ps, \
            open(self.resultdir / "/200html_sid2norm_txt.json", "w") as fw_nt:
            #open("{}/testset_sid2normtxt.json".format(self.resultdir), "w") as fw_ts2txt_all, \
            #open("{}/200html_sid2photostream.json".format(self.resultdir), "w") as fw_ps, \
            #open("{}/200html_sid2norm_txt.json".format(self.resultdir), "w") as fw_nt:
            
            #work here
            self.testsis = json.load(f_ts)
            self.s2p = json.load(f_s2p)
            self.s2nt = self.storyID2normtxt(self.testsis['annotations'])
            json.dump(self.s2nt, fw_ts2txt_all)
            
            self.htmldir = pp(opt.htmldir)
            self.html_storyids_list = self.get_storyid_from_htmls()
            self.h_sid2ps, self.h_sid2nt = self.html_sids2ps_n_nt()
            json.dump(self.h_sid2ps, fw_ps)
            json.dump(self.h_sid2nt, fw_nt)

        
        #for spliting and parsing according to prep(200 htmls) above
        self.modelout_path = pp(opt.modelout_path)
        self.modelname = self.modelout_path.stem
        self.spldir = self.resultdir / "{}_splits/".format(self.modelname)
        self.numspl = opt.numspl
        
        if not p.is_dir(self.spldir):
            p.mkdir(self.spldir, parents = True) # same as $mkdir -p (if it needs parents, make it!)
        
        with open(self.modelout_path, "r") as f_modelout,\
            open(self.resultdir / '200_{modelname}_normtxt'.format(self.modelname), 'w' ) as fw_m_whole:
            #open("{res}/200_{modelname}_normtxt.json".format(res=self.resultdir, modelname=self.modelname), 'w' ) as fw_m_whole:            
            
            self.modelout = json.load(f_modelout)
            self.model_normtxt = self.modelout_sid2normtxt()
            json.dump(self.model_normtxt, fw_m_whole)


    # if this has problem see extract_storyid2photoid.ipynb
    # if other part of the script has problem you may suspect
    #       - argparse, pathlib 
    #   until now, below two seems correct (verified by naked eyes on codes)
    #       - mate_storyid_normtext.py
    #       - preprocessing_prototype.ipynb

    def storyID2ps(self):
        # init
        storyid2photoid_dict = {}
        photo_stream_list = list()
        current_story_id = self.test_sis['annotations'][0][0]['story_id'] 
        # go loop
        for elem in annot_list:
            photoid = elem[0]['photo_flickr_id']
            
            if current_story_id != elem[0]['story_id']:
                storyid2photoid_dict[current_story_id] = photo_stream_list # dict update 
                current_story_id = elem[0]['story_id'] # current storyid update 
                photo_stream_list = list() # init photo_stream_list and append new photoid
            #else when story_id stays the same
            photo_stream_list.append(photoid)
        return storyid2photoid_dict

    
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
            with open(self.spldir / "/{mname}_normtxt_spl_{idx}.json".format(mname=self.modelname, idx=i), "w") as fw:
                json.dump(model_dicts_list[i], fw)


    def run_prep(self):
        if 200%self.numspl != 0:
            exit("numspl need to divide 200!")
        
        for file in [self.testsis_path, self.modelout_path,self.sid2ps_path]:
            if not p.is_file(file):
                exit("{file} doesnt exist".format(file))
            else:
                print("found input {file}".format(file))
        

        if not p.is_dir(self.htmldir): 
            exit("htmldir isnt exist")
        elif len(os.listdir(self.htmldir)) == 0: 
            exit("htmldir is empty")
        else:
            print("found {} files in htmldir".format(len(os.listdir(self.htmldir))))
        
        if not p.is_dir(self.resultdir):
            exit("{dir} doesnt exist".format(directory))
        self.split_normtxt()

if  __name__ == "__main__":
    
    opt = Opt()
    a = Prep(opt)
    print(opt)
    print(a)
    a.run_prep()
