#!/bin/bash
cd /home/kavia/workspace/code-generation/questforge-97559-97565/questforge
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

