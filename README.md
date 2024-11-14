# ANTITETRIS - Unleashing Competitive Cybersecurity Skills
ANTITETRIS is an interactive cybersecurity game that brings the thrill of competition to learning essential cybersecurity attacks and strategies. In this game, players race to win the Tetris game while using cyberattacks to sabotage opponents and prevent them from winning the game. ANTITETRIS bridges the gap between gamification and education for players of all skill levels by simulating cybersecurity techniques in a controlled gaming environment.

![image](https://github.com/user-attachments/assets/a910f71c-e3d5-4ff3-99d5-5494fe670375)

You can try it out [here](https://antitetris.vercel.app). Note that two players are required!
## Inspiration
Cybersecurity is a critical skill in today's digital world, but learning it often involves vast, theoretical material. We wanted to change this. We thought about an idea where players could learn cybersecurity principles in a way that's as exhilarating as a competitive game. ANTITETRIS was born from this - a competitive game where players could not only learn but also experience various cybersecurity attack simulations.

## What it does
ANTITETRIS is a two-player, cybersecurity game where players aim to stay on the game as long as possible like Tetris while fending off and launching cyberattacks. The game balances offensive and defensive tactics in an intuitive, immersive environment. Players can:

**Launch Cyberattacks:** Perform basic simulated attacks, like DDoS attacks, phishing attempts, to disrupt opponents’ progress.

**Defend Against Attacks:** Implement security measures by initiating attacks at the appropriate time to safeguard their resources and avoid downtime.

**Build & Stack Skill:** As they progress, players learn how to navigate through the attacks without disrupting their game.

## How we built it
### Tech Stack:
**Frontend:** Next.js create a smooth, intuitive interface, keeping players engaged and focused on strategy.

**Backend:** Node.js and WebSockets power real-time interactions, creating a seamless multiplayer experience.

**Game Logic & Data:** For managing game states, player interactions, and cyberattack simulations, we used Javascript as the backend.

### Core Features:
**Real-Time Multiplayer Support:** WebSockets allow players to interact and respond to attacks in real-time.

**Simulated Cyberattack Mechanics:** Each cyberattack simulates different cybersecurity techniques. This adds educational value without sacrificing gameplay quality.

**Player Progress Tracking:** Player stats are stored in the state and real-time updates to the player score.

**Educational Prompts:** Each attack comes with a brief explanation about the type of cyber attack and its effects on the game, helping players learn cybersecurity techniques as they play.

## Challenges we ran into
**Balancing Realism and Playability:** Designing realistic cybersecurity attacks and defenses while maintaining a fast-paced, enjoyable game requires careful tuning. We worked through multiple iterations to simplify complex cyber concepts into simple game elements.

**Real-Time Multiplayer Integration:** Synchronizing attacks, defenses, and real-time responses between players without lag was technically challenging. By leveraging WebSockets and optimizing data handling, we ensured smooth gameplay.

**Making Learning Fun:** We wanted players to come away with real cybersecurity skills, but we didn't want the game to feel like a classroom. Balancing education with entertainment was a difficult process, and we constantly adjusted mechanics to keep the game engaging.

## Accomplishments that we're proud of
**Innovative Game-Based Learning:** ANTITETRIS transforms cybersecurity learning into an enjoyable experience, encouraging players to develop cybersecurity skills in a competitive, memorable way.

**Successful Multiplayer Implementation:** We achieved real-time gameplay with smooth interaction, providing an immersive experience that rivals top multiplayer games.

**Educational Impact:** Our game is already sparking interest in cybersecurity among our early players, with feedback indicating they feel more confident and informed about basic cyber defense and attack strategies.

## What we learned
Through ANTITETRIS, we gained valuable insights into both game design and cybersecurity education:

**Technical Skills:** We deepened our understanding of WebSocket handling, real-time data synchronization, and complex game logic.

**Gameplay Design:** We learned to simplify complex cybersecurity tactics into game actions that are easy for players to grasp yet challenging to master.

**User Engagement:** Player feedback taught us the importance of an intuitive user interface and clear instructional prompts to sustain engagement.

## What's next for ANTITETRIS?
Our vision for ANTITETRIS extends beyond the initial release, with potential future updates including:

**Advanced Attack and Defense Scenarios:** We plan to add more sophisticated attack types and defensive strategies, including simulated phishing, social engineering, and endpoint security.

**Skill-Based Matchmaking:** Using players' experience and game history, we will implement skill-based matchmaking to ensure fair, competitive matches.

**Educational Pathways:** We aim to create a curriculum mode where players can follow structured paths to learn specific cybersecurity concepts before jumping into competitive play.

Leaderboard and Community Features: Adding leaderboards, tournaments, and community forums will foster a stronger community of cybersecurity enthusiasts.

Try It Out!
ANTITETRIS is more than a game - it's an interactive learning platform that lets players master cybersecurity concepts through hands-on practice. If you're ready to test your skills, try ANTITETRIS and see if you can outsmart your opponents while defending your digital territory. Are you prepared to become the ultimate cyber warrior?
