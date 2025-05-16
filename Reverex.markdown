---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
bkgrnd: assets/images/ReverexDX.jpg
---
# Reverex
---
Reverex is an asymmetric 2-player cooperative game developed over four months by my group, Tuna Melt Media and ended up taking home third in technical innovation at Toronto's Level Up game showcase.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZynOaqeCD0A?si=RnlVBbKJSs9V6LSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[![Level Up Toronto](https://levelupshowcase.com/wp-content/uploads/2024/01/lus-holder-e1706714997565.png)](https://levelupshowcase.com/ "Level Up Toronto")

Reverex is built on Unity and C#, with additional libraries for file picking and Rendering.

I was mainly working on mechanics for this project. Specifically, I worked on the Gravity systems used during parkour and created the tech behind getting gravity to work correctly during edge cases. Moreover, I worked extensively on UI Programming and implemented most of the on-screen elements describing the player's current state.

**Below are specific examples of work done on Reverex.**

- Mobius Strip (Normals based gravity)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q38htNfhzWY?si=vbIpVmgH10wjhEWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This video shows a player walking around a Mobius strip as the gravity continuously changes depending on the current closest normal to the player. The normals come from the 3d mesh. Then they're transformed before being baked into an array and then are iterated through and, if debugging is enabled, displayed in the editor viewport.

- Cylinder gravity field.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RFu6evkTRYE?si=7cTte2GueDS0G3xG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is another showcase of this gravity technique and displays the versatility and variety of shapes this technique can cover. As can be seen here, this technique can be used on various convex shapes. Using normal-based gravity fields heavily reduced the workload that would have been required to manually place all of the fields necessary with a volume-based approach.

# Reverex: DX 
---
During the original development of Reverex, we had a lot of ideas to polish and expand the game. As a result, we created Reverex DX; which is an official remake of the project intended to fix significant backend limitations the Original had, and implement previously impossible features.

<iframe width="560" height="315" src="https://video.fastly.steamstatic.com/store_trailers/257081151/movie480_vp9.webm?t=1733932481" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- Purpose

Reverex DX was developed with the intention of bringing Reverex a bit further into a polished release that could be published on Steam and played by a larger audience than the original Reverex.

- Online Networking.

This was my main task during Reverex: DX, I had to work on converting much of the original games code base into something that could run between two machines connected in a network setting. Considering we decided to use the minimal SteamNetworking API for this task, a lot of time was dedicated to creating a toolset that could be used by other developers to generate network capable code. 

The toolset would abstract keeping track of variables and remote calls into several different structures. Variables were abstracted with a synchronized template class that would wrap primitives. Whereas remote calls were abstracted into Netroutine, which behaved like actions and would be invoked on both machines (mostly) simultaneously. 

Ultimately, the toolset had some issues because of its short development time, but it was capable of working as our only major networking tool for the project and allowed us to release our game with online multiplayer via Steam. 
## Source
Sadly, as the project is not only my work, I cannot give out the source. As I can not guarantee other developers will be okay with its distribution. There are [some code snippets](https://github.com/Colin12345678910/COSC3P99/tree/main) available. Moreover, the final game may be downloaded [here](https://store.steampowered.com/app/3177380/REVEREX_DX/)