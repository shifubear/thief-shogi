import shogi 
import shogi.CSA 
import json

kifu = shogi.CSA.Parser.parse_file('/Users/shionfukuzawa/Downloads/2016/wdoor+floodgate-300-10F+1c_note_test+coduck_pi2_600MHz_1c+20161218120004.csa')

json_kifu = json.dumps(kifu[0])

print(json_kifu)