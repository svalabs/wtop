#!/usr/bin/env python
"""
Script to generate test data for wtop
"""

import sys
import asyncio
from dataclasses import dataclass
import websockets
import json
import random
import uuid

@dataclass
class Payload:
   progress: int
   userName: str
   userId: int
   lesson: str
   course: str


async def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print(f"USAGE: {sys.argv[0]} <websocket-url> <entries>")

    uri = args[0]
    count = int(args[1])

    async with websockets.connect(uri) as websocket:
        for i in range(count):
            p = Payload(
                random.randint(0, 100),
                f"user-{i}",
                str(uuid.uuid4()),
                f"seed",
                f"seed"
            )
            p = json.dumps(p.__dict__)
            await websocket.send(p)


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())