# Filters kifu files in a directory to remove any matches where
#   - the match doesn't end in forfeit  
#   - the match is longer than 50 moves
#   - the rating of the two players is above 2500 

import argparse
import os
import re
import statistics

parser = argparse.ArgumentParser()
parser.add_argument('dir', type=str)
args = parser.parse_args()

def find_all_files(directory):
  for root, dirs, files in os.walk(directory):
    for file in files:
      yield os.path.join(root, file)

ptn_rate = re.compile(r"^'(black|white)_rate:.*:(.*)$")

kifu_count = 0
rates = []
for filepath in find_all_files(args.dir):
  rate = {}
  move_len = 0
  toryo = False 
  try:
    open(filepath, 'r', encoding='utf-8')
  except Exception:
    continue
  for line in open(filepath, 'r', encoding='utf-8'):
    line = line.strip()
    m = ptn_rate.match(line)
    if m:
      rate[m.group(1)] = float(m.group(2))
    if line[:1] == '+' or line[:1] == '-':
      move_len += 1
    if line == '%TORYO':
      toryo = True 
  if not toryo or move_len <= 50 or len(rate) < 2 or min(rate.values()) < 2500:
    os.remove(filepath)
  else:
    kifu_count += 1
    rates.extend([_ for _ in rate.values()])

print('kifu count :', kifu_count)
print('rate mean : {}'.format(statistics.mean(rates)))
print('rate median : {}'.format(statistics.median(rates)))
print('rate max : {}'.format(max(rates)))
print('rate min : {}'.format(min(rates)))
