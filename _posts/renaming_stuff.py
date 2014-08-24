print('\n\nstarting!\n')

import os
import sys
import fileinput
import re


def replaceAll(file,searchExps, adds):
    with open(file, "r+") as f:
        contents = f.read()
        for key in searchExps:
            if key in contents:
                #print("\n",contents)
                contents = contents.replace(key,searchExps[key])
                print(key,searchExps[key])
        f.seek(0)
        f.truncate()
        f.write(contents)
        f.close()

    with open(file, "r+") as f:
        contents = f.read()
        for key in adds:
            if key not in contents:
                match = re.search(adds[key]+":.*\\n", contents)
                add = key + ": " + str(match.group(0).replace(adds[key]+": ", "")) + "---"
                contents = contents.replace("\n---", add)
                print("added", key)
        f.seek(0)
        f.truncate()
        f.write(contents)
        f.close()

for filename in os.listdir('/home/ubuntu/mr.hyde/_posts'):
    """
    if "PODCAST" in filename:
        print("\n\n"+filename)
        replaceAll('/home/ubuntu/mr.hyde/_posts/'+filename, {
            "air_date":"source_date",
            "show_name":"provider_name",
            "short_url": "source",
            "show_website": "provider_url"
        },
        {"provider_display":"provider_name"})
    """
    if "PODCAST" in filename:
        print("\n\n"+filename)
        replaceAll('/home/ubuntu/mr.hyde/_posts/'+filename, {
            "\n\n":"\n"
        },
        {})

