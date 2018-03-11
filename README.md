# Evaluation Script of VIST Challenge at NAACL 2018

This Github repository contains the official evaluation script of the [VIST Challenge at NAACL 2018](http://visionandlanguage.net/workshop2018/#challenge).

## Runnable JAR File

You can download the entire `runnable_jar` folder and run `EvalVIST.jar` as it is.

```
runnable_jar/EvalVIST.jar
```

## JAR File Usage

```
java -jar EvalVIST.jar -testFile <test_file_path> -gsFile <gs_file_path>
```

For running `EvalVIST.jar`, as shown in `runnable_jar` folder, please put:

1. `data` folder (including the `paraphrase-en.gz` in it), and
2. `vist-challenge-template.json` (can be found in `src/main/resources` folder)

at the same folder of `EvalVIST.jar` file.


Template file (`vist-challenge-template.json`) is provided by the hosts of VIST Challenge. This file is used to specify which photo sequences are included in this challenge.

The reason why a few (~3%) of photo sequences in the VIST test set are not included in this challenge is because that the owners of these photos removed them from Flickr. 


| Parameter (All Required) | Description |
| ------------ | ------------- |
| **testFile** | **Your submission file**, which contains exactly one story for each photo sequence. Please see the following section for format details. |
| **gsFile** | **Gold-standard file**, which contains the stories that were written by human workers. Please go to the [VIST website](http://visionandlanguage.net/VIST/dataset.html) to download the test set (~17MB, `test.story-in-sequence.json`) of Images-in-Sequence (SIS) data. For the VIST challenge, we also collected 3 extra new stories for each photo sequence in the test set. This extra test set is not public. |



## Submission Format

```json
{
  "team_name": "example_team_name",
  "evaluation_info": {
    "additional_description": "comments or notes about this submission."
  },
  "output_stories": [
    {
      "album_id": "flickr_album_id",
      "photo_sequence": [
          "flickr_photo_id_1",
          "flickr_photo_id_2",
          "flickr_photo_id_3",
          "flickr_photo_id_4",
          "flickr_photo_id_5"
        ],
      "story_text_normalized": "normalized text of your story"
    },
    {
     "album_id": "flickr_album_id",
      "photo_sequence": [
          "flickr_photo_id_1",
          "flickr_photo_id_2",
          "flickr_photo_id_3",
          "flickr_photo_id_4",
          "flickr_photo_id_5"
        ],
      "story_text_normalized": "normalized text of your story"
    },
    {
      "album_id": "flickr_album_id",
      "photo_sequence": [
          "flickr_photo_id_1",
          "flickr_photo_id_2",
          "flickr_photo_id_3",
          "flickr_photo_id_4",
          "flickr_photo_id_5"
        ],
      "story_text_normalized": "normalized text of your story"
    }...
  ]
}
```

## Contact

This repository is created and maintained by Ting-Hao (Kenneth) Huang (tinghaoh@cs.cmu.edu).

