#!/bin/bash

#npm run test
FILE=$(grep -rl ".only(" /project/sdk/ | head -1)
npm run test $FILE #--runInBand #--verbose